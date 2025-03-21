import { Component, inject, Input } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { SendRequestService } from '../../../services/send-request.service';
import { Platform } from '@angular/cdk/platform';
import { DownloadFileService } from '../../../services/download-file.service';

@Component({
  selector: 'app-preview-report-kpi',
  templateUrl: './preview-report-kpi.component.html',
  styleUrl: './preview-report-kpi.component.css'
})
export class PreviewReportKpiComponent {

  @Input() reportId: number = 0;
  @Input() inHeight: number = 0;
  @Input() reportName: string = '';
  @Input() inData: any | undefined = undefined;

  platform = inject(Platform);

  currentReportId: number = 0;
  currentinHeight:number=0;
  color:string='';
  rowHeight:number=0;
  colorFont:string='';
  icon:string='';
  value:string='';

  public translate: TranslatePipe = new TranslatePipe();
  tableParameters: any = {};

  constructor(public sendRequest: SendRequestService
  ) {

  }

  ngOnChanges() {

    if (this.currentReportId != this.reportId) {
      this.currentReportId = this.reportId;

      this.color='';
      this.colorFont='';
      this.icon='';
      this.value='';
    }

    if (this.currentinHeight != this.inHeight) {
      this.currentinHeight=this.inHeight;
      this.rowHeight=this.currentinHeight/3;
    }

    if(this.inData!=undefined){
        setTimeout(() => {
          let item=this.inData.list[0];
          this.color=item['2'];
          this.colorFont=item['3'];
          this.icon=item['4'];
          this.value=item[1];
        }, 2);

    }

  }

  refreshData() {

    this.sendRequest.post('/api/preview/report/' + this.currentReportId, this.tableParameters)
      .then((response) => {

        let item=response.list[0];
        this.color=item['2'];
        this.colorFont=item['3'];
        this.icon=item['4'];
        this.value=item[1];

      }).catch(() => { })
  }

  submit(parameters:any,){

    this.tableParameters = {};
    this.tableParameters.parameters = parameters;

    this.refreshData()
  }
}
