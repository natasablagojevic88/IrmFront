import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  value:any={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[]
  ){
    this.value=data[0];
  }
}
