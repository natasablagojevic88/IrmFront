import { Component, Input } from '@angular/core';
import { SendRequestService } from '../../../services/send-request.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-preview-card-report',
  templateUrl: './preview-card-report.component.html',
  styleUrl: './preview-card-report.component.css'
})
export class PreviewCardReportComponent{

  value:any={};

  @Input() reportId:number=0; 
  @Input() inData:any;
  @Input() inHeight:number=0;
  currentReportId: number = 0;

  

  constructor(
    private sendRequest:SendRequestService
  ){


  }

  ngOnChanges(){

    if(this.inData==undefined){
      if(this.currentReportId!=this.reportId){
      this.currentReportId=this.reportId;
       this.sendRequest.get('/api/preview/report/card-report/'+this.reportId)
    .then((response)=>{
      this.value=response;

    }).catch(()=>{})
    }
    }else {
      this.value=this.inData;
    }

    

  }



  submit(){

     this.currentReportId=this.reportId;
       this.sendRequest.post('/api/preview/report/card-report/'+this.reportId,this.value)
    .then((response)=>{
      this.value=response;

    }).catch(()=>{})
  }
  


}
