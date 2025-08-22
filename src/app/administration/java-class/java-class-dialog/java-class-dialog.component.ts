import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';
import { CheckMobileService } from '../../../services/check-mobile.service';

@Component({
  selector: 'app-java-class-dialog',
  templateUrl: './java-class-dialog.component.html',
  styleUrl: './java-class-dialog.component.css'
})
export class JavaClassDialogComponent {

  value:any;
  names:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<JavaClassDialogComponent> ,
    public sendRequest:SendRequestService,
    public checkMobile:CheckMobileService
  ){

    this.value=data[0];
    this.names=data[1];
  }

  submit(){

    this.sendRequest.post('/api/java-class',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }

}
