import { Component, Inject, ViewChild } from '@angular/core';
import { ModelDTO } from '../../../model/ModelDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { JasperDialogComponent } from './jasper-dialog/jasper-dialog.component';
import { TableComponent } from '../../../common-components/table/table.component';

@Component({
  selector: 'app-list-jasper-reports',
  templateUrl: './list-jasper-reports.component.html',
  styleUrl: './list-jasper-reports.component.css'
})

export class ListJasperReportsComponent {


  model: ModelDTO = new ModelDTO();
  jasperReportsTitle: string = '';

  jasperInfo:string='';

  names:any;

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public sendRequest:SendRequestService,
    public openDialog:OpenDialogService
  ){
    this.model=data[0];
    this.jasperReportsTitle=data[1];

    this.sendRequest.resource('jasperInfo')
    .then((response)=>{this.jasperInfo=response}).catch(()=>{})
  }

  add(){

    let value:any={};
    value.id=0;
    value.modelId=this.model.id;

    this.openDialog.openDialog(JasperDialogComponent,550,[value,this.names,this.jasperInfo],true)
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch(()=>{})

  }

  edit(row:any){

    this.openDialog.openDialog(JasperDialogComponent,550,[row,this.names,this.jasperInfo],true)
    .then((response)=>{
      this.table.editRow(response);
    }).catch(()=>{})

  }

}
