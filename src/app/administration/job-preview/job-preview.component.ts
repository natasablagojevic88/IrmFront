import { Component, inject, Injectable, ViewChild } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';
import { DownloadFileService } from '../../services/download-file.service';
import { Platform } from '@angular/cdk/platform';
import { OpenDialogService } from '../../services/open-dialog.service';
import { JobDialogComponent } from '../reports/jobs-list/job-dialog/job-dialog.component';
import { JobLogListDialogComponent } from './job-log-list-dialog/job-log-list-dialog.component';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  translate: TranslatePipe = new TranslatePipe();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = this.translate.transform('firstPage');
  itemsPerPageLabel = '';
  lastPageLabel = this.translate.transform('lastPage');

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = this.translate.transform('nextPage');
  previousPageLabel = this.translate.transform('previousPage');

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.transform('page0of0')
    }
    const amountPages = Math.ceil(length / pageSize);
    return (page + 1) + ' - ' + amountPages + ' ' + this.translate.transform('of') + ' ' + length;
  }
}
@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrl: './job-preview.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class JobPreviewComponent {

  tableData: any = {};
  title: string = '';

  dateTimeFormat = environment.dateTimeFormat;
   platform = inject(Platform);

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<any>;

  clickedRows = new Set<any>();

  executeJobLabel: string = '';

  translate: TranslatePipe = new TranslatePipe();
  constructor(
    public sendRequest: SendRequestService,
    public yesNoService: YesNoService,
    public sendInfo: SendInfoService,
    public downloadFile:DownloadFileService,
    public openDialog:OpenDialogService
  ) {

    this.sendRequest.get('/api/jobs/list')
      .then((response) => {
        this.tableData = response;
        this.title = this.tableData.title;
        this.displayedColumns = [];
        this.displayedColumns.push('buttons');

        let columns: any[] = this.tableData.columns;
        for (let i = 0; i < columns.length; i++) {
          this.displayedColumns.push(columns[i].code);
        }

        this.dataSource = new MatTableDataSource(this.tableData.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.clickedRows.clear();
      }).catch(() => { })

    this.sendRequest.resource('doYouWantToExecuteJob')
      .then((response) => {
        this.executeJobLabel = response;
      }).catch(() => { })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  focusRow(row: any) {
    this.clickedRows.clear();
    this.clickedRows.add(row)
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

  executeJob(row: any) {
    this.focusRow(row);

    this.yesNoService.yesNo(this.executeJobLabel)
      .then(() => {
        this.sendRequest.get('/api/jobs/execute/' + row.id)
          .then(() => {
            this.sendInfo.open('jobStarted', false);
          }).catch(() => { })
      }).catch(() => { })
  }



  download(row: any) {
    this.focusRow(row);

    if(!this.platform.ANDROID){
      this.sendRequest.getBlob('/api/jobs/download/'+row.id)
    .then((response)=>{
      this.downloadFile.download(response);
    }).catch(()=>{})
    }else{
      this.sendRequest.get('/api/jobs/download/'+row.id+'/base64')
    .then((response)=>{
      this.downloadFile.downloadFileInAndroid(response);
    }).catch(()=>{})
    }

    

  }

  refreshRow(row:any){
    this.focusRow(row);
    let table:any=this.matTable as any;
    var tBody:any =table._elementRef.nativeElement.children[1];
    var children:HTMLCollection=tBody.children as HTMLCollection;
    let selectedIndex:number=-1;
    for(let i =0;i<children.length;i++){
      var child:HTMLTableRowElement=children[i] as HTMLTableRowElement;
      if(child.classList.contains('demo-row-is-clicked')){
        selectedIndex=i;
      }
    }

    this.sendRequest.get('/api/jobs/'+row.id)
    .then((response)=>{
      let index=this.dataSource.filteredData.findIndex(a=>a.id==row.id);
      if(index!=-1){
        this.dataSource.filteredData[index]=response;
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          var child:HTMLTableRowElement=children[selectedIndex] as HTMLTableRowElement;
          child.focus();
        }, 1);
      }
    }).catch(()=>{})
    
  }

  editRow(row:any){

    this.sendRequest.get('/api/jobs/jobeditinfo/'+row.id)
    .then((response)=>{
      let editInfo:any=response;

      this.openDialog.openDialog(JobDialogComponent,1100,[
        editInfo.reportJobDTO,editInfo.reportType,editInfo.names,
        editInfo.reportJobTypeList,editInfo.reportJobFileTypeList,editInfo.listSmtp,editInfo.reportJobMailType
      ]).then(()=>{
        this.refreshRow(row);
      }).catch(()=>{})
    }).catch(()=>{})
  }


  logs(row:any){
    this.openDialog.openDialog(JobLogListDialogComponent,900,[row],false)
    .then(()=>{}).catch(()=>{})
  }
}
