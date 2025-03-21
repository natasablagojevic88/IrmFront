import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginDTO } from '../../../model/LoginDTO';
import { SendRequestService } from '../../../services/send-request.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { CheckMobileService } from '../../../services/check-mobile.service';

@Component({
  selector: 'app-app-users-dialog',
  templateUrl: './app-users-dialog.component.html',
  styleUrl: './app-users-dialog.component.css'
})
export class AppUsersDialogComponent {

  value:any;
  names:any;

  enumList:ComboboxDTO[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputValue:any[],
    public dialogRef:MatDialogRef<AppUsersDialogComponent>,
    public sendRequest:SendRequestService,
    public checkMobile:CheckMobileService
  ){
   this.value=inputValue[0];
   this.names=inputValue[1];

  
  }

  submit(){

    this.sendRequest.post('/api/appuser',this.value)
    .then(
      (response)=>{
        this.dialogRef.close(response);
      }
    ).catch(error=>{})

  }

}
