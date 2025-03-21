import { Component, Injectable, Input, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { SendRequestService } from '../../../services/send-request.service';
import { environment } from '../../../../environments/environment';
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

  clickedRow: Set<any> = new Set();

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
  selector: 'app-preview-report-table',
  templateUrl: './preview-report-table.component.html',
  styleUrl: './preview-report-table.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class PreviewReportTableComponent {
  dateFormat: string = environment.dateFormat;
  dateTimeFormat: string = environment.dateTimeFormat;

  @Input() reportId: number = 0;
  @Input() tableHeight: number = 0;
  @Input() inParameter: any | undefined = undefined;
  @Input() inData: any | undefined = undefined;

  currentReportId: number = 0;

  dataSource = new MatTableDataSource();
  lang = 'en-US';

  displayedColumns: string[] = [];

  public translate: TranslatePipe = new TranslatePipe();

  length = 0;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 50, 100, 200, 500];

  clickedRow: Set<any> = new Set();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<any>;
  tableParameters: any = {};

  totalColumn: number[] = [];

  resultOfQuery: any = {};

  constructor(
    public sendRequest: SendRequestService
  ) {

  }

  ngOnInit() {


    if (sessionStorage.getItem("lang") != null) {
      if (sessionStorage.getItem("lang") != 'enUS') {
        this.lang = 'sr-Latn';
      }
    }

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {

    if (this.currentReportId != this.reportId) {
      this.currentReportId = this.reportId;

      this.length = 0;
      this.pageSize = 20;
      this.pageIndex = 0;
      this.pageSizeOptions = [20, 50, 100, 200, 500];
      this.tableParameters = {};
      this.tableParameters.pageNumber = this.pageIndex;
      this.tableParameters.pageSize = this.pageSize;
      this.tableParameters.totals = [];
      this.dataSource = new MatTableDataSource();
      this.displayedColumns = [];
      this.totalColumn = [];
      this.resultOfQuery = {}
      this.resultOfQuery.hasTotal = false;

    }


    if (this.inData != undefined) {
      this.length = 0;
      this.pageSize = 20;
      this.pageIndex = 0;
      this.pageSizeOptions = [20, 50, 100, 200, 500];
      this.tableParameters = {};
      this.tableParameters.pageNumber = this.pageIndex;
      this.tableParameters.pageSize = this.pageSize;
      this.tableParameters.totals = [];

      if (this.inParameter != undefined) {
        this.tableParameters.parameters = this.inParameter;
      }
      this.dataSource = new MatTableDataSource();
      this.displayedColumns = [];
      this.totalColumn = [];
      this.resultOfQuery = this.inData;

      setTimeout(() => {
        this.changeTableAfrerData();
      }, 1);
    }
  }

  refreshData() {
    this.displayedColumns = [];

    this.sendRequest.post('/api/preview/report/' + this.currentReportId, this.tableParameters)
      .then((response) => {
        this.resultOfQuery = response;
        this.changeTableAfrerData();

      }).catch(() => { })
  }

  changeTableAfrerData() {
    this.dataSource = new MatTableDataSource(this.resultOfQuery.list);

    for (let i = 0; i < this.resultOfQuery.columns.length; i++) {
      let columns: any = this.resultOfQuery.columns[i];

      this.displayedColumns.push(columns.orderNumber.toString());
    }

    this.length = this.resultOfQuery.totalItems;

    if (this.length == 0) {
      this.pageIndex = 0;
    } else {
      if (this.pageIndex >= this.length) {
        this.pageIndex = this.length - 1;
        this.tableParameters.pageNumber = this.pageIndex;
        this.refreshData();
      }
    }

    if (this.resultOfQuery.queryWithFetch) {
      this.pageSize = this.resultOfQuery.totalItems;
      this.pageSizeOptions = [this.resultOfQuery.totalItems];
    }

    var table = this.matTable as any;
    var parentDiv: any;

    if (table != undefined) {

      var tableHtml: HTMLTableElement = table._elementRef.nativeElement as HTMLTableElement;
      parentDiv = tableHtml.parentElement as HTMLDivElement;

      if (parentDiv != undefined) {

        (parentDiv as HTMLDivElement).scrollTop = 0;
      }

    }
  }

  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.tableParameters.pageNumber = this.pageIndex;
    this.tableParameters.pageSize = this.pageSize;
    this.refreshData();

  }

  announceSortChange(sortState: Sort) {
    if (sortState.active != undefined) {
      if (sortState.active != "-1") {
        if (sortState.direction.length > 0) {
          let sort: any = {};
          sort.field = sortState.active;
          sort.sortDirection = sortState.direction.toUpperCase();
          this.tableParameters.sorts = []
          this.tableParameters.sorts.push(sort);
          this.pageIndex = 0;
          this.tableParameters.pageNumber = this.pageIndex;

          this.refreshData();

        }
      }
    }
  }

  focusRow(row: any) {
    this.clickedRow.clear();
    this.clickedRow.add(row);
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

  addTotal(orderNumber: number) {
    this.totalColumn.push(orderNumber);
    this.tableParameters.totals = this.totalColumn;
    this.refreshData();
  }

  removeTotal(orderNumber: number) {
    let index = this.totalColumn.findIndex(a => a == orderNumber);
    this.totalColumn.splice(index, 1);
    this.tableParameters.totals = this.totalColumn;
    this.refreshData();
  }

  hasTotal(orderNumber: number): boolean {


    let totalsNumber: number[] = this.tableParameters.totals;

    if (totalsNumber.findIndex(a => a == orderNumber) == -1) {
      return false;
    } else {
      return true;
    }

  }


  public changeParameters(parameters: any) {
    this.pageIndex = 0;
    this.pageSize = 20;
    this.pageSizeOptions = [20, 50, 100, 200, 500];
    this.tableParameters = {};
    this.tableParameters.parameters = parameters;
    this.tableParameters.sorts = [];
    this.tableParameters.pageNumber = this.pageIndex;
    this.tableParameters.pageSize = this.pageSize;
    this.tableParameters.totals = this.totalColumn;

    this.sort.sort({
      id: '-1',
      start: '',
      disableClear: true
    })


    this.refreshData();
  }



}
