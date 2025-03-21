import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';

@Component({
  selector: 'app-choose-report-type-dialog',
  templateUrl: './choose-report-type-dialog.component.html',
  styleUrl: './choose-report-type-dialog.component.css'
})
export class ChooseReportTypeDialogComponent {

  selectedValue:any;
  names:any;
  list:ComboboxDTO[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public sendRequest:SendRequestService,
    public dialogRef:MatDialogRef<ChooseReportTypeDialogComponent>
  ){
    this.names=data[0];

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ReportType')
    .then((response)=>{
      this.list=response;

      if(this.list.length>0){
        this.selectedValue=this.list[0].value;
      }
    }).catch(()=>{})
  }

  submit(){
    this.dialogRef.close(this.selectedValue);
  }

}
