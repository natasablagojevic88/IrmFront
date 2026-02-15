import { Component, EventEmitter, inject, Injectable, Input, Output, ViewChild } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { TableParameterDTO } from '../../model/TableParameterDTO';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TableDataDTO } from '../../model/TableDataDTO';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ColumnData } from '../../model/ColumnData';
import { environment } from '../../../environments/environment';
import { TableSort } from '../../model/TableSort';
import { MatDialog } from '@angular/material/dialog';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { OpenDialogService } from '../../services/open-dialog.service';
import { TableFilter } from '../../model/TableFilter';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';
import { HistoryComponent } from '../history/history.component';
import { Platform } from '@angular/cdk/platform';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { CheckMobileService } from '../../services/check-mobile.service';
import { ModelDTO } from '../../model/ModelDTO';
import { DownloadFileService } from '../../services/download-file.service';



@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {

  changes = new Subject<void>();

  translate: TranslatePipe = new TranslatePipe();
  constructor(public checkMobile: CheckMobileService) {

  }

  firstPageLabel = this.translate.transform('firstPage');
  itemsPerPageLabel = this.checkMobile.isMobile() ? '' : this.translate.transform('');
  lastPageLabel = this.translate.transform('lastPage');

  nextPageLabel = this.translate.transform('nextPage');
  previousPageLabel = this.translate.transform('previousPage');

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.checkMobile.isMobile() ? '' : this.translate.transform('page0of0');
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.checkMobile.isMobile() ?
      (page + 1) + ' - ' + amountPages :
      (page + 1) + ' - ' + amountPages + ' ' + this.translate.transform('of') + ' ' + length;

  }
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class TableComponent {

  @Input() api: string = '';
  @Input() width: number = 0;
  @Input() buttons: string[] = ['edit', 'delete', 'history'];
  @Input() deleteapi: string = '';
  @Input() height: number = 0;
  @Input() addButtons: TableButton[] = []
  
  @Input() previewTable: boolean =false;
  @Input() reportTable: boolean =false;
  @Input() checkTotalApi: string ='';

  @Output() namesExport: EventEmitter<any> = new EventEmitter<any>();
  @Output() titleExport: EventEmitter<string> = new EventEmitter<string>();
  @Output() editClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() enterClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() f2clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionExport: EventEmitter<ExportTableAction> = new EventEmitter<ExportTableAction>();

  //model exports
  @Output() modelExport: EventEmitter<ModelDTO> = new EventEmitter<ModelDTO>();
  @Output() fieldsExport: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() canChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() infoClicked: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() exportSubtables: EventEmitter<any[]> = new EventEmitter<any[]>();

  currentApi: string = '';

  pageNumber: number = 0;
  pageSize: number = 10;
  length: number = 0;
  pageEvent: PageEvent = new PageEvent();
  tableParameters: TableParameterDTO = new TableParameterDTO();
  tableData: TableDataDTO = new TableDataDTO();
  locale: string = 'en-US';
  dateFormat: string = environment.dateFormat;
  dateTimeFormat: string = environment.dateTimeFormat;
  translate: TranslatePipe = new TranslatePipe();
  platform = inject(Platform);
  hasTotal: boolean = false;

  clickedRows = new Set<any>();

  commonButtons: TableButton[] = [
    { code: 'edit', icon: 'fa fa-pencil', name: 'edit', color: '#2e3c64'},
    { code: 'delete', icon: 'fa fa-trash', name: 'delete', color: 'red'},
    { code: 'history', icon: 'fa fa-history', name: 'history', color: 'orange'}
  ]

  usedButtons: TableButton[] = []

  lang='en-US';

  ngOnInit() {

    if(sessionStorage.getItem("lang")!=null){
      if(sessionStorage.getItem("lang")!='enUS'){
        this.lang='sr-Latn';
      }
    }

  }

  readButtons() {
    this.usedButtons = [];

    for (let i = 0; i < this.buttons.length; i++) {
      let buttonCode: string = this.buttons[i];

      let index = this.commonButtons.findIndex(a => a.code == buttonCode);
      this.usedButtons.push(this.commonButtons[index]);
    }

    for (let i = 0; i < this.addButtons.length; i++) {
      this.usedButtons.push(this.addButtons[i]);
    }

   
  }

  ngOnChanges() {

    if (this.currentApi != this.api) {
      this.currentApi = this.api;
      this.resetPaging();
      this.refreshData();
    }
  }

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) matTable!: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    if (this.height > 0) {
      var table: any = this.matTable;
      var elementRef: any = table._elementRef;
      var nativeElement = elementRef.nativeElement;
      var parentElement: HTMLDivElement = nativeElement.parentElement as HTMLDivElement;
      parentElement.style.maxHeight = this.height + 'px';
      parentElement.style.minHeight = this.height + 'px';
    }

  }




  constructor(
    public sendRequest: SendRequestService,
    public matDialog: MatDialog,
    public openDialog: OpenDialogService,
    public yesNoService: YesNoService,
    public sendInfo: SendInfoService,
    public checkMobile: CheckMobileService,
    public downloadFile:DownloadFileService
  ) {

  }

  private refreshData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.readButtons()
      var table = this.matTable as any;
      var parentDiv: any;

      if (table != undefined) {

        var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
        parentDiv = tableHtml.parentElement as HTMLDivElement;

      }

      if (sessionStorage.getItem("lang") != null) {
        if (sessionStorage.getItem("lang") != 'enUS') {
          this.locale = 'sr-Latn'
        }
      }

      this.displayedColumns = [];
      this.displayedColumns.push('buttons');
      this.tableParameters.pageNumber = this.pageNumber;
      this.tableParameters.pageSize = this.pageSize;
      if (this.currentApi.length > 0) {
        this.sendRequest.post(this.currentApi, this.tableParameters)
          .then(
            (response) => {
              this.clickedRows.clear();
              this.tableData = response as TableDataDTO;
              for (let i = 0; i < this.tableData.columns.length; i++) {
                let columnData: ColumnData = this.tableData.columns[i];
                this.displayedColumns.push(columnData.code);
              }
              this.hasTotal = this.tableData.hasTotal;
              this.length = this.tableData.totalElements;

              if (this.tableData.tableWidth != undefined) {
                this.width = this.tableData.tableWidth;
              }

              if (this.tableData.model != undefined) {
                this.modelExport.emit(this.tableData.model);
              }

              if (this.tableData.fields != undefined) {
                this.fieldsExport.emit(this.tableData.fields);
              }

              if (this.tableData.subtables != undefined) {
                this.exportSubtables.emit(this.tableData.subtables	);
              }

              if (this.tableData.rights != undefined) {

                if (this.tableData.rights.parentLock || (!this.tableData.rights.update)) {
                  this.canChange.emit(false);
                }else{
                  this.canChange.emit(true);
                }
              }

                this.tableData.subtables.forEach(s => {
                  if (this.usedButtons.findIndex(a => a.code == s.code) == -1) {
                    this.usedButtons.push(s);
                  }
                });

                if (this.tableParameters.pageNumber == 0) {
                  this.pageNumber = 0;
                } else {
                  if (this.pageNumber >= this.tableData.totalPages) {
                    this.pageNumber = this.tableData.totalPages - 1;
                    this.refreshData();
                  }
                }


                this.dataSource = new MatTableDataSource(this.tableData.list);
                this.dataSource._updateChangeSubscription();
                if (parentDiv != undefined) {

                  (parentDiv as HTMLDivElement).scrollTop = 0;
                }

                this.namesExport.emit(this.tableData.names);
                this.titleExport.emit(this.tableData.title);

                resolve(true);
              }
          ).catch((error) => { resolve(true) })
      } else {
        resolve(true);
      }
    })

  }

  private resetPaging() {
    this.pageNumber = 0;
  }

  announceSortChange(sortState: Sort) {
    let columnSort: string = sortState.active;
    this.tableParameters.tableSorts = [];
    if (sortState.direction.length != 0) {
      let tableSort: TableSort = new TableSort();
      tableSort.field = columnSort;
      tableSort.sortDirection = sortState.direction.toUpperCase();
      this.tableParameters.tableSorts.push(tableSort);
    }

    this.resetPaging();
    this.refreshData();
  }

  pagination(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.refreshData();
  }

  go(direction: string) {

    var table = this.matTable as any;


    var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
    var parentDiv: HTMLDivElement = tableHtml.parentElement as HTMLDivElement;

    var children: HTMLCollection = tableHtml.children;
    var tBody: any = children[1];
    var rows: HTMLCollection = tBody.rows;
    let index: number = -1;
    for (let i: number = 0; i < rows.length; i++) {
      let row: HTMLTableRowElement = rows[i] as HTMLTableRowElement;
      if (row.classList.contains('demo-row-is-clicked')) {
        index = i;
        break;
      }
    }

    if (direction == 'down') {

      if (index < rows.length - 1) {
        var selRow: HTMLElement = rows[index + 1] as HTMLElement;
        selRow.focus();
        parentDiv.scrollTop -= 40;

      }
    } else {
      if (index > 0) {
        var selRow: HTMLElement = rows[index - 1] as HTMLElement;
        selRow.focus();
        parentDiv.scrollTop += 40;

      }
    }

  }

  focusRow(row: any) {
    this.clickedRows.clear();
    this.clickedRows.add(row)
  }

  filterData(column: ColumnData) {
    let inputData: any[] = [column, this.tableData.enums];
    this.openDialog.openDialog(FilterTableComponent, 700, inputData)
      .then(
        (response) => {
          let tableFilter: TableFilter = response as TableFilter;
          this.tableParameters.tableFilters.push(tableFilter);
          this.resetPaging();
          this.refreshData();

        }
      ).catch((error) => { })
  }


  isFiltered(column: string): boolean {
    let index: number = this.tableParameters.tableFilters.findIndex(a => a.field == column);

    if (index == -1) {
      return false;
    } else {
      return true;
    }
  }

  clearFilter(column: string) {
    let index: number = this.tableParameters.tableFilters.findIndex(a => a.field == column);

    this.tableParameters.tableFilters.splice(index, 1);
    this.resetPaging();
    this.refreshData();
  }

  filterInfo(column: ColumnData): string {
    let index: number = this.tableParameters.tableFilters.findIndex(a => a.field == column.code);
    let tableFilter: TableFilter = this.tableParameters.tableFilters[index];
    return column.name + ' ' + this.translate.transform(tableFilter.searchOperation)
      + ' ' + ((tableFilter.searchOperation == 'isnull' || tableFilter.searchOperation == 'isnotnull') ? '' : tableFilter.parameter1)
      + (tableFilter.parameter2 != undefined ? ' ' + tableFilter.parameter2 : '');
  }

  buttonClicked(action: string, row: any) {
    this.focusRow(row);

    switch (action) {
      case 'edit': {
        this.editClicked.emit(JSON.parse(JSON.stringify(row)));
        break;
      }
      case 'delete': {
        this.deleteRow(row);
        break;
      }
      case 'history': {
        this.historyRow(row);
        break;
      }
      default: {
        let exportAction: ExportTableAction = new ExportTableAction();
        exportAction.action = action;
        exportAction.row = row;

        this.actionExport.emit(exportAction);
        break;
      }
    }

  }

  public isEnum(code: string): boolean {
    let index = this.tableData.enums.findIndex(a => a.code == code);

    if (index > -1) {
      return true;
    }

    return false;
  }

  public findEnum(columncode: string, value: string): string {
    if (value == undefined) {
      return '';
    }

    if (value.length == 0) {
      return '';
    }

    let index = this.tableData.enums.findIndex(a => a.code == columncode);

    if (index > -1) {
      let list: ComboboxDTO[] = this.tableData.enums[index].list;
      let indexList = list.findIndex(a => a.value == value);
      return list[indexList].option;
    } else {
      return '';
    }

  }


  public addRow(id: number) {
    this.resetPaging();
    let tableSort: TableSort = new TableSort();
    tableSort.field = 'id';
    tableSort.sortDirection = 'DESC';
    this.tableParameters.tableSorts = [tableSort];

    this.refreshData().then(
      (response) => {
        setTimeout(() => {

          let index = this.dataSource.data.findIndex(a => a.id == id);
          if (index > -1) {
            var table = this.matTable as any;
            var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
            var children: HTMLCollection = tableHtml.children;
            var tBody: any = children[1];
            var rows: HTMLCollection = tBody.rows;

            let row: HTMLTableRowElement = rows[index] as HTMLTableRowElement
            row.focus();
          }
        }, 1);
      }
    ).then(error => { });
  }

  public editRow(row: any) {

    this.clickedRows.clear();

    let index = this.dataSource.data.findIndex(a => a.id == row.id);
    if (index > -1) {
      this.dataSource.data[index] = row;
      this.dataSource._updateChangeSubscription();

      setTimeout(() => {
        var table = this.matTable as any;
        var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
        var children: HTMLCollection = tableHtml.children;
        var tBody: any = children[1];
        var rows: HTMLCollection = tBody.rows;

        let row: HTMLTableRowElement = rows[index] as HTMLTableRowElement
        row.focus();

        if(this.checkTotalApi.length>0&&this.hasTotal){
          this.sendRequest.post(this.checkTotalApi,this.tableParameters)
          .then((response)=>{
            this.tableData.totals=response.totals;
          }).catch(()=>{})
        }
      }, 1);
    }
  }

  deleteRow(row: any) {

    if (this.deleteapi.length > 0) {
      let index = this.dataSource.data.findIndex(a => a.id == row.id);
      this.yesNoService.yesNo('yesNoDelete')
        .then(
          () => {
            this.sendRequest.delete(this.deleteapi + '/' + row.id)
              .then(
                () => {
                  this.clickedRows.clear();
                  this.sendInfo.open('itemDeleted', false);

                  this.refreshData()
                    .then(
                      () => {

                        setTimeout(() => {
                          var table = this.matTable as any;
                          var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
                          var children: HTMLCollection = tableHtml.children;
                          var tBody: any = children[1];
                          var rows: HTMLCollection = tBody.rows;
                          if (index < rows.length) {
                            var rowElement: HTMLElement = rows[index] as HTMLElement;
                            rowElement.focus();
                          }
                        }, 1);
                      }
                    ).catch(() => { })

                }
              ).catch(error => { })
          }
        ).catch((error) => { })
    }


  }

  historyRow(row: any) {

    this.openDialog.openDialog(HistoryComponent, 700, [this.tableData.table, row.id], false)
      .then(() => { }).catch(() => { })

  }

  excel() {
    let excelTableParameters: TableParameterDTO = new TableParameterDTO();
    excelTableParameters.tableFilters = this.tableParameters.tableFilters;
    excelTableParameters.tableSorts = this.tableParameters.tableSorts;

    this.sendRequest.post(this.currentApi, excelTableParameters)
      .then(
        (response) => {
          let data: TableDataDTO = response as TableDataDTO;

          if (!this.platform.ANDROID) {
            this.sendRequest.postBlob('/api/excel', data)
              .then(
                (response) => {
                  this.downloadFile.download(response);
                }
              ).catch((error) => { })
          } else {
            this.sendRequest.post('/api/excel/base64', data)
              .then(
                (response) => {
                  this.downloadFile.downloadFileInAndroid(response);
                }
              ).catch(error => { })
          }


        }
      ).catch((error) => { })
  }

  getIcon(button:TableButton,row:any):string{

    if(!this.previewTable){
      return button.icon;
    }else{
      if(button.code!='edit'){
        return button.icon;
      }else{
        if(this.tableData.rights==undefined){
          return button.icon;
        }else{
          if(this.tableData.rights.parentLock||(!this.tableData.rights.update)){
            return 'fa fa-eye';
          }else{
            if(row.lock){
              return 'fa fa-eye';
            }else{
              return button.icon;
            }
          }
         
        }
      }
      
    }

    
  }

  getButtonDisplay(button:TableButton,row:any):string{
    if(!this.previewTable){
      if(!this.reportTable){
        return '';
      }else{
        if(button.code=='jobs'){
          if(row.type=='GRAPH'||row.type=='KPI'||row.type=='CARD'){
            return 'none';
          }else{
            return '';
          }
        }else{
          return '';
        }
      }
      
    }else{
      if(this.tableData.rights!=undefined){

        if(button.code=='delete'||button.code.startsWith('/procedure/')){
          if(this.tableData.rights.parentLock||(!this.tableData.rights.update)||row.lock==true){
            return 'none';
          }else{
            return '';
          }
        }

        if(button.code=='lock'){
          if(this.tableData.rights.parentLock||(!this.tableData.rights.lock)||row.lock==true){
            return 'none';
          }else{
            return '';
          }
        }

        if(button.code=='unlock'){
          if(this.tableData.rights.parentLock||(!this.tableData.rights.unlock)||row.lock==false){
            return 'none';
          }else{
            return '';
          }
        }

        return '';
      }else{
        return '';
      }
    }
  }

  checkCodebook(columnData:ColumnData):string{
    if(this.tableData.fields.length==0){
      return 'none';
    }else{
      if(columnData.code.endsWith('Code')){
        if(columnData.code.length>4){
          let columnName=columnData.code.substring(0,columnData.code.length-4);

          let findIndex=this.tableData.fields.findIndex(a=>a.code==columnName&&a.columnType=='CODEBOOK');
          if(findIndex==-1){
            return 'none';
          }else{
            return '';
          }
        }else{
          return 'none';
        }
      }else{
        return 'none';
      }
      
    }
  }

  showInfo(columnData:ColumnData,row:any){
    let columnName=columnData.code.substring(0,columnData.code.length-4);
    let findIndex=this.tableData.fields.findIndex(a=>a.code==columnName&&a.columnType=='CODEBOOK');

    if(findIndex==-1){
      return;
    }

    let id:number=row[columnName];
   

    this.infoClicked.emit([columnName,id]);
  }



}

