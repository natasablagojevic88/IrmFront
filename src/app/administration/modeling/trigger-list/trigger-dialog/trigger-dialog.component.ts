import { Component, Inject } from '@angular/core';
import { CheckMobileService } from '../../../../services/check-mobile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';
import { SendRequestService } from '../../../../services/send-request.service';

@Component({
  selector: 'app-trigger-dialog',
  templateUrl: './trigger-dialog.component.html',
  styleUrl: './trigger-dialog.component.css'
})
export class TriggerDialog {

  value:any;
  names:any;

  listTriggerTime:ComboboxDTO[]=[];
  listTriggerEvent:ComboboxDTO[]=[];
  listColumns:ComboboxDTO[]=[];
  listFunctions:ComboboxDTO[]=[];

  constructor(
    public checkMobile:CheckMobileService,
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<TriggerDialog>,
    public sendRequest:SendRequestService
  ){

    this.value=data[0];
    this.names=data[1];
    this.listTriggerTime=data[2];
    this.listTriggerEvent=data[3];
    this.listColumns=data[4];
    this.listFunctions=data[5];

  }

  submit(){

    this.sendRequest.post('/api/model/trigger',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})

  }

  changeEvent(){
    if(this.value.triggerEvent!='UPDATE'){
      this.value.updateColumn=undefined;
    }
  }

}
