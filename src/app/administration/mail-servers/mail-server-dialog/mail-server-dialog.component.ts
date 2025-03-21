import { Component, Inject } from '@angular/core';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-mail-server-dialog',
  templateUrl: './mail-server-dialog.component.html',
  styleUrl: './mail-server-dialog.component.css'
})
export class MailServerDialogComponent {

  value:any;
  names:any;
  listSecurity:ComboboxDTO[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef: MatDialogRef<MailServerDialogComponent>,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService
  ){

    this.value=data[0];
    this.names=data[1];
    this.listSecurity=data[2];
  }

  submit(){

    this.sendRequest.post('/api/smtpserver',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }
}
