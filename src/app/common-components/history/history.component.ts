import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  @ViewChild(TableComponent) tableComponent!:TableComponent;

  title:string='';

  table:string='';
  dataid:number=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[]
  ){
    this.table=data[0];
    this.dataid=data[1];

  }


}
