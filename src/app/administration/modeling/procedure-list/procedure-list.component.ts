import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDTO } from '../../../model/ModelDTO';
import { SendRequestService } from '../../../services/send-request.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { TableComponent } from '../../../common-components/table/table.component';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { ProcedureDialogComponent } from './procedure-dialog/procedure-dialog.component';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrl: './procedure-list.component.css'
})
export class ProcedureListComponent {

  model:ModelDTO=new ModelDTO();
  listProcedures:ComboboxDTO[]=[];
  procedureInfo:string='';
  names:any={};

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public sendRequest:SendRequestService,
    public dialog:OpenDialogService
  ){
    this.model=data[0];

    this.sendRequest.get('/api/model/procedures')
    .then((response)=>{
      this.listProcedures=response;
    }).catch(()=>{})

    this.sendRequest.resource('procedureIdRequired')
    .then((response)=>{
      this.procedureInfo=response;
    }).catch(()=>{})

  }


  add(){
    let value:any={};
    value.id=0;
    value.modelId=this.model.id;
    if(this.listProcedures.length>0){
      value.sqlProcedure=this.listProcedures[0].value;
    }

    this.dialog.openDialog(ProcedureDialogComponent,500,[value,this.procedureInfo,this.names,this.listProcedures])
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch(()=>{})
  }

  edit(value:any){
    this.dialog.openDialog(ProcedureDialogComponent,500,[value,this.procedureInfo,this.names,this.listProcedures])
    .then((response)=>{
      this.table.editRow(response);
    }).catch(()=>{})
    
  }

}
