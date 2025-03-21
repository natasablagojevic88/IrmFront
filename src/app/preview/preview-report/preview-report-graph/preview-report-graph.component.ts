import { Component, Input } from '@angular/core';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-preview-report-graph',
  templateUrl: './preview-report-graph.component.html',
  styleUrl: './preview-report-graph.component.css'
})
export class PreviewReportGraphComponent {

  chartOptions:any={};

  @Input() reportId:number=0;
  @Input() inHeight:number=0;
  @Input() inData: any | undefined = undefined;

  tableParameters:any = {};

  showChart:boolean=false;

  constructor(
    public sendRequest:SendRequestService
  ){

  }

  currentReportId:number=0;
  ngOnChanges(){

    if(this.currentReportId!=this.reportId){
      this.currentReportId=this.reportId;
      this.tableParameters = {};
      this.showChart=false;
      
    }

    if(this.inData!=undefined){
      this.showChart=false;
      this.chartOptions=JSON.parse(JSON.stringify(this.inData.chartOptions));
      setTimeout(() => {
        this.showChart=true;
      }, 2);
    }
  }


  refreshData(){
    this.showChart=false;
    this.sendRequest.post('/api/preview/report/' + this.currentReportId, this.tableParameters)
    .then((response)=>{
        this.chartOptions=JSON.parse(JSON.stringify(response.chartOptions));
        this.showChart=true;
      }
    ).catch(()=>{})
  }

  submit(parameters:any,){

    this.tableParameters = {};
    this.tableParameters.parameters = parameters;

    this.refreshData()
  }

}
