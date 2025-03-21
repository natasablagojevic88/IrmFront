import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-report-group-dialog',
  templateUrl: './report-group-dialog.component.html',
  styleUrl: './report-group-dialog.component.css'
})
export class ReportGroupDialogComponent {

  value:any;
  names:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<ReportGroupDialogComponent>,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService
  ){
    this.value=data[0];
    this.names=data[1];

  }

  submit(){
    this.sendRequest.post('/api/reportgroup',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    })
  }

}
