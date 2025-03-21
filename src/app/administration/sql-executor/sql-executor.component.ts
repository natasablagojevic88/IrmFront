import { Component, inject, Injectable, ViewChild } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CheckMobileService } from '../../services/check-mobile.service';
import { TextAreaComponent } from '../../common-components/text-area/text-area.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { SqlResultDTO } from '../../model/SqlResultDTO';
import { MatSort, Sort } from '@angular/material/sort';
import { DownloadFileService } from '../../services/download-file.service';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';
import { Platform } from '@angular/cdk/platform';
import { environment } from '../../../environments/environment';

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
  selector: 'app-sql-executor',
  templateUrl: './sql-executor.component.html',
  styleUrl: './sql-executor.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class SqlExecutorComponent {

  title: string = '';
  sqlQuery: string = '';
  sqlQueryLabel: string = '';
  platform = inject(Platform);

  tables: any[] = [];

  columns: any[] = [];

  clickedTable: Set<string> = new Set();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  yesNoQuery: string = '';

  length = 0;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 50, 100, 200, 500];

  sqlResult: SqlResultDTO = new SqlResultDTO();

  clickedRow: Set<any> = new Set();

  showSum: Set<number> = new Set();

  @ViewChild(MatTable) matTable!: MatTable<any>;


  dateFormat:string=environment.dateFormat;
  dateTimeFormat:string=environment.dateTimeFormat;

  lang = 'en-US';

  constructor(
    public sendRequest: SendRequestService,
    public translate: TranslatePipe,
    public checkMobile: CheckMobileService,
    public downdloadService: DownloadFileService,
    public yesNoSevice: YesNoService,
    public sendInfo: SendInfoService
  ) {

    this.sendRequest.get('/api/sqlexecutor/tables')
      .then((response) => {
        this.tables = response;
      }).catch(() => { })

    this.sendRequest.resource('sqlExecutor')
      .then((response) => {
        this.title = response;
      }).catch(() => { })

    this.sendRequest.resource('sqlQuery')
      .then((response) => {
        this.sqlQueryLabel = response;
      }).catch(() => { })

    this.sendRequest.resource('yesNoExecuteQuery')
      .then((response) => {
        this.yesNoQuery = response;
      }).catch(() => { })


  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  ngOnInit() {

    if (sessionStorage.getItem("lang") != null) {
      if (sessionStorage.getItem("lang") != 'enUS') {
        this.lang = 'sr-Latn';
      }
    }

  }

  clickTable(tableItem: any) {

    this.clickedTable.clear();
    this.clickedTable.add(tableItem.code);
    this.columns = tableItem.columns;

  }


  focus() {

    var textarea = document.getElementsByTagName('textarea')[0];

    setTimeout(() => {
      textarea.focus();
    }, 1);
  }

  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.executePreview(this.pageIndex, false);
  }

  executeParameter: any = {};

  sortColumns:any[]=[];

  executePreview(pageNumber: number, readQuery: boolean) {

    this.executeParameter.pageNumber = pageNumber;
    this.executeParameter.pageSize = this.pageSize;
    this.executeParameter.totals = [];
    this.showSum.forEach(s => {
      this.executeParameter.totals.push(s);
    })

    this.executeParameter.sorts = this.sortColumns;


    if (readQuery) {
      this.executeParameter.sqlQuery = this.sqlQuery;
      this.showSum.clear();
      this.executeParameter.totals = [];
      this.pageSizeOptions = [20, 50, 100, 200, 500];
      this.pageSize = 20;
      this.pageIndex = 0;
      this.executeParameter.pageNumber = pageNumber;
      this.executeParameter.pageSize = this.pageSize;
      this.sortColumns=[];
      this.executeParameter.sorts = [];

      this.sort.sort({
        id: '-1',
        start: '',
        disableClear: true
      })

    }
    this.sqlResult = new SqlResultDTO();
    this.displayedColumns = [];
    this.sendRequest.post('/api/sqlexecutor/sqlquery', this.executeParameter)
      .then((response) => {



        this.clickedRow.clear();
        this.sqlResult = response;
        this.displayedColumns = [];
        for (let i = 0; i < this.sqlResult.columns.length; i++) {
          this.displayedColumns.push(this.sqlResult.columns[i].orderNumber.toString());
        }


        if (this.sqlResult.queryWithFetch) {
          this.pageSize = this.sqlResult.totalItems;
          this.pageSizeOptions = [this.sqlResult.totalItems];
        }

        this.dataSource = new MatTableDataSource<any>(this.sqlResult.list);

        this.length = this.sqlResult.totalItems;

        var table = this.matTable as any;
        var parentDiv: any;

        if (table != undefined) {

          var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
          parentDiv = tableHtml.parentElement as HTMLDivElement;

          if (parentDiv != undefined) {

            (parentDiv as HTMLDivElement).scrollTop = 0;
          }

        }



        if (this.sqlResult.numberOfPages == 0) {
          this.length = 0;
          this.pageIndex = 0;
        } else {
          if (this.pageIndex >= this.sqlResult.numberOfPages) {

            this.pageIndex = this.sqlResult.numberOfPages - 1;
            this.executePreview(this.pageIndex, readQuery);
          }
        }

      }

      ).catch(() => {

      })
  }



  focusRow(row: any) {
    this.clickedRow.clear();
    this.clickedRow.add(row);
  }

  showSumInTable(columnNumber: number) {
    this.showSum.add(columnNumber);
    this.executePreview(this.pageIndex, false);
  }

  hideSumInTable(columnNumber: number) {
    this.showSum.delete(columnNumber);
    this.executePreview(this.pageIndex, false);
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

  announceSortChange(sortState: Sort) {

    this.sortColumns=[];

    if (sortState.direction.length > 0 && sortState.active!='-1') {
      let sort: any = {};
      sort.orderNumber = sortState.active;
      sort.sortDirection = sortState.direction.toUpperCase();

      this.sortColumns.push(sort);
      this.executePreview(0, false);
    } 

  }

  exportExcel() {
    let parameters: any = {}
    parameters.sqlQuery = this.sqlQuery;

    if(!this.platform.ANDROID){
      this.sendRequest.postBlob('/api/sqlexecutor/excel', parameters)
      .then((response) => {
        this.downdloadService.download(response);
      }).catch(() => { })
    }else{
      this.sendRequest.post('/api/sqlexecutor/excel/base64', parameters)
      .then((response) => {
        this.downdloadService.downloadFileInAndroid(response);
      }).catch(() => { })
    }

  }

  executeUpdate() {
    let parameters: any = {}
    parameters.sqlQuery = this.sqlQuery;
    this.yesNoSevice.yesNo(this.yesNoQuery).then(() => {
      this.sendRequest.post('/api/sqlexecutor/execute', parameters)
        .then((response) => {
          this.sendInfo.open(response.message, false);
        }).catch(() => { })
    }).catch(() => { })
  }

}
