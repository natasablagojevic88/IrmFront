import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrl: './change-name-dialog.component.css'
})
export class ChangeNameDialogComponent {

  value:string='';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<ChangeNameDialogComponent>
  ){

    this.value=data[0];
  }

  submit(){
    this.dialogRef.close(this.value);
  }
}
