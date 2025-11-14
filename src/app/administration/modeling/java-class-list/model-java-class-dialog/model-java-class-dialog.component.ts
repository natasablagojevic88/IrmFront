import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';
import { SendRequestService } from '../../../../services/send-request.service';

@Component({
  selector: 'app-model-java-class-dialog',
  templateUrl: './model-java-class-dialog.component.html',
  styleUrl: './model-java-class-dialog.component.css'
})
export class ModelJavaClassDialogComponent {

  value:any;
  names:any;
  listJavaClasses:ComboboxDTO[]=[];
  listActions:ComboboxDTO[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data:any[],
    public  dialogRef:MatDialogRef<ModelJavaClassDialogComponent>,
    public sendRequest:SendRequestService
  ){

    this.value=data[0];
    this.names=data[1];
    this.listJavaClasses=data[2];
    this.listActions=data[3];

  }

  submit(){
    this.sendRequest.post('/api/model/java-class',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }
}
