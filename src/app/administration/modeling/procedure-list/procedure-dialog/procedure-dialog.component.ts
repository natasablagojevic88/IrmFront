import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';
import { SendRequestService } from '../../../../services/send-request.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrl: './procedure-dialog.component.css'
})
export class ProcedureDialogComponent {

  value:any={};
  procedureInfo:string='';
  names:any={};
  listProcedure:ComboboxDTO[]=[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public sendRequest:SendRequestService,
    public dialogRef:MatDialogRef<ProcedureDialogComponent> 
  ){
    this.value=data[0];
    this.procedureInfo=data[1];
    this.names=data[2];
    this.listProcedure=data[3];
  }

  submit(){

    this.sendRequest.post('/api/model/procedure/update',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }
}
