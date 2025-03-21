import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableButton } from '../../../model/TableButton';
import { ExportTableAction } from '../../../model/ExportTableAction';

@Component({
  selector: 'app-find-dialog',
  templateUrl: './find-dialog.component.html',
  styleUrl: './find-dialog.component.css'
})
export class FindDialogComponent {

  checkButton:TableButton={
    code: 'check',
    icon: 'fa fa-check',
    name: 'choose',
    color: 'green'
  }

  api:string='';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<FindDialogComponent>
  ){

    this.api=data;

  }

  checkRow(exportTableAction:ExportTableAction){
    this.selectRow(exportTableAction.row);
  }

  selectRow(row:any){
    
    this.dialogRef.close(row.id.toString());
  }

}
