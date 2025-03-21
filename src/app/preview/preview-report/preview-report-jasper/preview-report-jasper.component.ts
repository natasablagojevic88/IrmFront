import { Component, inject, Input, ViewChild } from '@angular/core';
import { SendRequestService } from '../../../services/send-request.service';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { Platform } from '@angular/cdk/platform';
import { DownloadFileService } from '../../../services/download-file.service';

@Component({
  selector: 'app-preview-report-jasper',
  templateUrl: './preview-report-jasper.component.html',
  styleUrl: './preview-report-jasper.component.css'
})
export class PreviewReportJasperComponent {

  @Input() reportId: number = 0;
  @Input() inHeight: number = 0;
  @Input() inData: any|undefined=undefined;

  platform = inject(Platform);
  

  currentReportId: number = 0;
  tableParameters: any = {};
  @ViewChild(PdfJsViewerComponent) pdfViewerOnDemand!:PdfJsViewerComponent;

  pdfSource:any;
  constructor(public sendRequest: SendRequestService,
    public downloadFile:DownloadFileService
  ) {

  }

  ngOnChanges() {
    if (this.currentReportId != this.reportId) {
      this.currentReportId = this.reportId;
    }

    if(this.inData!=undefined){
      fetch('data:'+this.inData.base64String)
      .then(res => res.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        this.pdfSource=url;
        setTimeout(() => {
        this.pdfViewerOnDemand.refresh();
        var iframePDF:HTMLElement=this.pdfViewerOnDemand.iframe.nativeElement;
        iframePDF.style.height=this.inHeight+'px';
      }, 1);
      });
    }
  }

  ngAfterContentInit(){
    
  }



  refreshData() {

      this.pdfSource=undefined;
      this.sendRequest.post('/api/preview/report/jasper/base64/' + this.currentReportId, this.tableParameters)
      .then(
        (response) => {
          fetch('data:'+response.base64String)
          .then(res => res.blob())
          .then(blob => {
            var url = window.URL.createObjectURL(blob);
            this.pdfSource=url;
            setTimeout(() => {
            this.pdfViewerOnDemand.refresh();
            var iframePDF:HTMLElement=this.pdfViewerOnDemand.iframe.nativeElement;
            iframePDF.style.height=this.inHeight+'px';
          }, 1);
          });

          if(this.platform.ANDROID){
            this.downloadFile.downloadFileInAndroid(response);
          }
          
          
        }
      ).catch(error => { })
    
  }

  submit(parameters: any) {

    this.tableParameters = {};
    this.tableParameters.parameters = parameters;

    this.pdfViewerOnDemand.refresh();
    this.refreshData()
  }
}
