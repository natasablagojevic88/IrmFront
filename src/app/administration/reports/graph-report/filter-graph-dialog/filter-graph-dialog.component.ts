import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';

@Component({
  selector: 'app-filter-graph-dialog',
  templateUrl: './filter-graph-dialog.component.html',
  styleUrl: './filter-graph-dialog.component.css'
})
export class FilterGraphDialogComponent {

  value:any={};
  listType:ComboboxDTO[]=[]

  names:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<FilterGraphDialogComponent>
  ){
    this.value=data[0];
    this.names=data[1];
    this.listType=data[2];

    if(this.listType.length>0&&this.value.columnType==undefined){
      this.value.columnType=this.listType[0].value;
    }
  }

  submit(){
    if(this.value.code==undefined){
      return;
    }

    if(this.value.code.length==0){
      return;
    }

    if(this.value.name==undefined){
      return;
    }

    if(this.value.name.length==0){
      return;
    }

    if(this.value.columnType==undefined){
      return;
    }

    if(this.value.columnType.length==0){
      return;
    }

    this.dialogRef.close(this.value);
  }
}
