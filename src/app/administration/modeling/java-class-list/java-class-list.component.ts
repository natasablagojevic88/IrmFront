import { Component, Inject, ViewChild } from '@angular/core';
import { ModelDTO } from '../../../model/ModelDTO';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../../../common-components/table/table.component';
import { SendRequestService } from '../../../services/send-request.service';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { ModelJavaClassDialogComponent } from './model-java-class-dialog/model-java-class-dialog.component';

@Component({
  selector: 'app-java-class-list',
  templateUrl: './java-class-list.component.html',
  styleUrl: './java-class-list.component.css'
})
export class JavaClassListComponent {

    model:ModelDTO=new ModelDTO();
    listJavaClasses:ComboboxDTO[]=[];
    listActions:ComboboxDTO[]=[];
    names:any={};
  
    @ViewChild(TableComponent) table!:TableComponent;
  
    constructor(
      @Inject(MAT_DIALOG_DATA) public data:any[],
      public sendRequest:SendRequestService,
      public dialog:OpenDialogService
    ){
      this.model=data[0];
  
      this.sendRequest.get('/api/model/java-classes')
      .then((response)=>{
        this.listJavaClasses=response;
      }).catch(()=>{})

       this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.TriggerEvent')
      .then((response)=>{
        this.listActions=response;
      }).catch(()=>{})

  
    }

    add(){

      let value:any={};
      value.id=0;
      value.modelId=this.model.id;
      value.event='INSERT';

      this.dialog.openDialog(ModelJavaClassDialogComponent,400,[value,this.names,this.listJavaClasses,this.listActions])
      .then((response:any)=>{
        if(response!=undefined){
          this.table.addRow(response.id);
        }
      }).catch();


    }

    edit(row:any){
       this.dialog.openDialog(ModelJavaClassDialogComponent,400,[row,this.names,this.listJavaClasses,this.listActions])
      .then((response:any)=>{
        if(response!=undefined){
          this.table.addRow(response.id);
        }
      }).catch();
    }
}
