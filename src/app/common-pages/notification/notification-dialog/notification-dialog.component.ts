import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {

  value:any={};
  names:any={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[]
  ){
    this.value=data[0];
    this.names=data[1];

  }
}
