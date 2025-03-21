import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageTitleComponent } from '../../../common-components/page-title/page-title.component';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { ColumnDialogComponent } from './column-dialog/column-dialog.component';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { SendRequestService } from '../../../services/send-request.service';
import { TableComponent } from '../../../common-components/table/table.component';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrl: './column-list.component.css'
})
export class ColumnListComponent {

  title:string='';

  model:any;

  names:any;

  listType:ComboboxDTO[]=[]
  listCodebook:ComboboxDTO[]=[]
  listJsonFunction:ComboboxDTO[]=[]

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public openDialog:OpenDialogService,
    public sendRequest:SendRequestService
  ){
    this.model=data[0];

  }

  ngOnInit(){
    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ModelColumnType')
    .then((response)=>{this.listType=response}).catch(()=>{})
    this.sendRequest.get('/api/model/codebook/list')
    .then((response)=>{this.listCodebook=response}).catch(()=>{})
    this.sendRequest.get('/api/model/jsonfunctions')
    .then((response)=>{this.listJsonFunction=response}).catch(()=>{})

  }

  ngAfterViewInit() {
  }

  add(){

    let value:any={};
    value.id=0;
    value.modelId=this.model.id;
    value.columnType='STRING';
    value.nullable=true;
    value.colspan=1;
    value.showInTable=true;
    value.disabled='false';

    this.sendRequest.get('/api/model/nextrowcolumn/'+this.model.id)
    .then((response)=>{
      value.rowNumber=response.row;
      value.columnNumber=response.column;
      
      this.openDialog.openDialog(ColumnDialogComponent,1000,[value,this.names,this.listType,this.listCodebook,this.listJsonFunction])
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch(()=>{})

    }).catch(()=>{})

    
  }

  edit(column:any){

    this.openDialog.openDialog(ColumnDialogComponent,1000,[column,this.names,this.listType,this.listCodebook,this.listJsonFunction])
    .then((response)=>{
      this.table.editRow(response);
    }).catch(()=>{})

  }

}
