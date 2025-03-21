import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-log-list-dialog',
  templateUrl: './job-log-list-dialog.component.html',
  styleUrl: './job-log-list-dialog.component.css'
})
export class JobLogListDialogComponent {

  value:any={}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[]
  ){
    this.value=data[0];
  }
}
