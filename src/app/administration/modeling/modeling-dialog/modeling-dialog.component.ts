import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelDTO } from '../../../model/ModelDTO';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-modeling-dialog',
  templateUrl: './modeling-dialog.component.html',
  styleUrl: './modeling-dialog.component.css'
})
export class ModelingDialogComponent {

  value:ModelDTO=new ModelDTO();
  titleOFDialog:string='';
  names:any='';
  listTypes:ComboboxDTO[]=[];
  listIcons:ComboboxDTO[]=[];
  listRoles:ComboboxDTO[]=[];

  disableType:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<ModelingDialogComponent>,
    public checkModel:CheckMobileService,
    public sendRequest:SendRequestService
  ){
    this.listRoles=data[5];
    this.value=data[0];
    if(this.value.type=='TABLE'){this.disableType=true};
    this.titleOFDialog=data[1];
    this.names=data[2];
    this.listTypes=data[3];
    this.listIcons=data[4];

  }

  submit(){
    this.sendRequest.post('/api/model',this.value)
    .then((response)=>{this.dialogRef.close(response)})
    .catch(()=>{})
  }

}
