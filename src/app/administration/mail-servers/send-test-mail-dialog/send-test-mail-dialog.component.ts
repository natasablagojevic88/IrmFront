import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-send-test-mail-dialog',
  templateUrl: './send-test-mail-dialog.component.html',
  styleUrl: './send-test-mail-dialog.component.css'
})
export class SendTestMailDialogComponent {

  row:any;
  names:any;
  value:any={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<SendTestMailDialogComponent>,
    public sendRequest:SendRequestService
  ){
    this.row=data[0];
    this.names=data[1];
  }

  submit(){

    this.sendRequest.post('/api/smtpserver/testsmtp/'+this.row.id,this.value)
    .then(()=>{
      this.dialogRef.close(true);
    }).catch(()=>{})
    
  }
}
