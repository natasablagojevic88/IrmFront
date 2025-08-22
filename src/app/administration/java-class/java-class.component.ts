import { Component, ViewChild } from '@angular/core';
import { OpenDialogService } from '../../services/open-dialog.service';
import { SendRequestService } from '../../services/send-request.service';
import { JavaClassDialogComponent } from './java-class-dialog/java-class-dialog.component';
import { TableComponent } from '../../common-components/table/table.component';

@Component({
  selector: 'app-java-class',
  templateUrl: './java-class.component.html',
  styleUrl: './java-class.component.css'
})
export class JavaClassComponent {

  title:string='';

  names:any;

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    public openDialog:OpenDialogService,
    public sendRequest:SendRequestService
  ){

  }

  add(){
    let value:any={};
    value.id=0;

    this.openDialog.openDialog(JavaClassDialogComponent,800,[value,this.names])
    .then((response)=>{
      if(response!=undefined){
        this.table.addRow(response.id);
      }
    }).catch(()=>{})
  }

  edit(value:any){
    this.openDialog.openDialog(JavaClassDialogComponent,800,[value,this.names])
    .then((response)=>{
      if(response!=undefined){
        this.table.editRow(response);
      }
    }).catch(()=>{})
  }

}
