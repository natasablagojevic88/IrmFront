import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrl: './roles-dialog.component.css'
})
export class RolesDialogComponent {

  value:any;
  names:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<RolesDialogComponent>,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService
  ){
    const newLocal = this;
    newLocal.value=data[0];
    this.names=data[1];
  }

  submitForm(){
    this.sendRequest.post('/api/roles',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }

}
