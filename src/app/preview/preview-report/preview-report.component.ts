import { Component, inject, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendRequestService } from '../../services/send-request.service';
import { CheckMobileService } from '../../services/check-mobile.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { PreviewReportTableComponent } from './preview-report-table/preview-report-table.component';
import { DownloadFileService } from '../../services/download-file.service';
import { Platform } from '@angular/cdk/platform';
import { PreviewReportGraphComponent } from './preview-report-graph/preview-report-graph.component';
import { PreviewReportKpiComponent } from './preview-report-kpi/preview-report-kpi.component';
import { PreviewReportJasperComponent } from './preview-report-jasper/preview-report-jasper.component';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';


@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrl: './preview-report.component.css',

})
export class PreviewReportComponent {

  reportInfo: any = {};
  platform = inject(Platform);
  heightGrid: number = 0;

  reportId: number = 0;

  parameters: any = {};

  yesNoQuery: string = '';

  public translate: TranslatePipe = new TranslatePipe();

  @ViewChild(PreviewReportTableComponent) previewReportTable!: PreviewReportTableComponent;
  @ViewChild(PreviewReportGraphComponent) previewReportGraphComponent!: PreviewReportGraphComponent;
  @ViewChild(PreviewReportKpiComponent) previewReportKpiComponent!: PreviewReportKpiComponent;
  @ViewChild(PreviewReportJasperComponent) previewReportJasperComponent!: PreviewReportJasperComponent;

  constructor(
    activeRoute: ActivatedRoute,
    public sendRequest: SendRequestService,
    public checkMobile: CheckMobileService,
    public downloadFile: DownloadFileService,
    public yesNoService: YesNoService,
    public sendInfo: SendInfoService
  ) {

    this.reportInfo.name = '';
    activeRoute.queryParams.subscribe((r) => {
      let idRoute: any = r;
      this.reportId = idRoute.id;


      this.parameters = {};
      this.sendRequest.get('/api/preview/report/parameters/' + idRoute.id)
        .then((response) => {

          this.reportInfo = response;

          for (let i = 0; i < this.reportInfo.parameters.length; i++) {
            let parameter: any = this.reportInfo.parameters[i];

            this.parameters[parameter.id] = [null, null];


            if (parameter.defaultValue1 != undefined) {
              this.parameters[parameter.id][0] = parameter.defaultValue1;
            }

            if (parameter.defaultValue2 != undefined) {
              this.parameters[parameter.id][1] = parameter.defaultValue2;
            }
          }

        }).catch(() => { })
    });

    this.sendRequest.resource('yesNoExecuteQuery')
      .then((response) => {
        this.yesNoQuery = response;
      }).catch(() => { })
  }

  ngAfterContentInit() {
    let previewReportDiv: HTMLElement = document.getElementsByClassName('previewReportDiv')[0] as HTMLElement;

    this.heightGrid = previewReportDiv.offsetHeight;
  }

  submit() {

    if (this.reportInfo.reportType == 'STANDARD' || this.reportInfo.reportType == 'SQL') {
      this.previewReportTable.changeParameters(this.parameters);
    } else if (this.reportInfo.reportType == 'GRAPH') {
      this.previewReportGraphComponent.submit(this.parameters);
    } else if (this.reportInfo.reportType == 'KPI') {
      this.previewReportKpiComponent.submit(this.parameters);
    } else if (this.reportInfo.reportType == 'JASPER') {
      this.previewReportJasperComponent.submit(this.parameters);
    }else if (this.reportInfo.reportType == 'EXECUTE') {
      this.executeQuery();
    }

  }

  executeQuery() {
    this.yesNoService.yesNo(this.yesNoQuery)
      .then(() => {
        let tableParameters: any = {};
        tableParameters.parameters = this.parameters;

        this.sendRequest.post('/api/preview/report/execute/' + this.reportId, tableParameters)
          .then((response) => {
            this.sendInfo.open(response['message'], false);
          }).catch(() => { })
      }).catch(() => { })
  }

  excel() {
    let tableParameters: any = {};
    tableParameters.parameters = this.parameters;

    if (!this.platform.ANDROID) {
      this.sendRequest.postBlob('/api/preview/report/excel/' + this.reportId, tableParameters)
        .then((response) => {
          this.downloadFile.download(response);
        }).catch(() => { })
    } else {
      this.sendRequest.post('/api/preview/report/excel/base64/' + this.reportId, tableParameters)
        .then((response) => {
          this.downloadFile.downloadFileInAndroid(response);
        }).catch(() => { })
    }

  }

  findSearchOperationName(searchOperation: any): string {

    if (searchOperation == undefined) {
      return '';
    } else {
      return this.translate.transform(searchOperation);
    }
  }

}
