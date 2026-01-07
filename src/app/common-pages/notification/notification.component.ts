import { Component, ViewChild } from '@angular/core';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { SendRequestService } from '../../services/send-request.service';
import { OpenDialogService } from '../../services/open-dialog.service';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatTable } from '@angular/material/table';
import { TableComponent } from '../../common-components/table/table.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  title:string='';
  names:any={};

  @ViewChild(TableComponent) table!:TableComponent

  previewButton:TableButton={
    code: 'preview',
    icon: 'fa fa-eye',
    name: 'detail',
    color: '#2e3c64'
  }

  unreadButton:TableButton={
    code: 'setunread',
    icon: 'fa fa-eye-slash',
    name: 'setunread',
    color: 'red'
  }

  constructor(
    public sendRequest:SendRequestService,
    public openDialog:OpenDialogService
  ){

  }

  addClick(event:ExportTableAction){
    if(event.action=='preview'){
      this.previewRow(event.row);
    }else if(event.action=='setunread'){
      this.markAsUnread(event.row);
    }
  }

  previewRow(row:any){

    this.sendRequest.get('/api/notification/'+row.id)
    .then((response)=>{
      this.table.editRow(response);
      this.openDialog.openDialog(NotificationDialogComponent,400,[response,this.names])
      .then(()=>{}).catch(()=>{})
    }).catch((error)=>{})
  }

  markAsUnread(row:any){
    this.sendRequest.get('/api/notification/markunread/'+row.id)
    .then((response)=>{
      this.table.editRow(response);
    }).catch((error)=>{})
  }

}
