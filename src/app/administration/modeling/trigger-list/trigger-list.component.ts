import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { SendRequestService } from '../../../services/send-request.service';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { TriggerDialog } from './trigger-dialog/trigger-dialog.component';
import { TableComponent } from '../../../common-components/table/table.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-trigger-list',
  templateUrl: './trigger-list.component.html',
  styleUrl: './trigger-list.component.css'
})
export class TriggerListComponent {

  model:any;
  title:string='';

  names:any;

  listTriggerTime:ComboboxDTO[]=[];
  listTriggerEvent:ComboboxDTO[]=[];
  listColumns:ComboboxDTO[]=[];
  listFunctions:ComboboxDTO[]=[];

  @ViewChild(TableComponent) table!:TableComponent;

  translate:TranslatePipe=new TranslatePipe();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public sendRequest:SendRequestService,
    public openDialog:OpenDialogService
  ){
    this.model=data[0];

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.TriggerTime')
    .then((response)=>{this.listTriggerTime=response;}).catch(()=>{})
    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.TriggerEvent')
    .then((response)=>{this.listTriggerEvent=response;}).catch(()=>{})
    this.sendRequest.get('/api/model/allcolumns/'+this.model.id)
    .then((response)=>{this.listColumns=response;}).catch(()=>{})
    this.sendRequest.get('/api/model/functions')
    .then((response)=>{this.listFunctions=response;}).catch(()=>{})

  }


  add(){
    let value:any={};
    value.id=0;
    value.modelId=this.model.id;
    if(this.listTriggerTime.length>0){
      value.triggerTime=this.listTriggerTime[0].value;
    }
    if(this.listTriggerEvent.length>0){
      value.triggerEvent=this.listTriggerEvent[0].value;
    }

    if(this.listFunctions.length>0){
      value.triggerFunction=this.listFunctions[0].value;
    }

    this.openDialog.openDialog(TriggerDialog,800,[value,this.names,this.listTriggerTime,this.listTriggerEvent,this.listColumns,this.listFunctions])
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch((error)=>{})

  }

  edit(row:any){

    this.openDialog.openDialog(TriggerDialog,800,[row,this.names,this.listTriggerTime,this.listTriggerEvent,this.listColumns,this.listFunctions])
    .then((response)=>{
      this.table.editRow(response);
    }).catch((error)=>{})

  }
}
