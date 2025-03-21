import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrl: './sort-dialog.component.css'
})
export class SortDialogComponent {

  title:string='';
  value:any='';
  listSortDirection:ComboboxDTO[]=[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<SortDialogComponent>
  ){

    this.title=data[0];
    this.value=data[1];
    this.listSortDirection=data[2];
  }

  submit(){
    this.dialogRef.close(this.value);

  }

}
