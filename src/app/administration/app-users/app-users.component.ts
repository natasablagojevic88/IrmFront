import { Component, ViewChild } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { OpenDialogService } from '../../services/open-dialog.service';
import { AppUsersDialogComponent } from './app-users-dialog/app-users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDTO } from '../../model/LoginDTO';
import { TableComponent } from '../../common-components/table/table.component';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { UserRolesListDialogComponent } from './user-roles-list-dialog/user-roles-list-dialog.component';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.css'
})
export class AppUsersComponent {

  title:string='';
  names:any;
  roleTitle:string='';

  rolesButton:TableButton={
    code: 'roles',
    icon: 'fa fa-user-circle',
    name: '',
    color: '#ff4081'
  }

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    public openDialog:OpenDialogService,
    public sendRequest:SendRequestService
  ){
   
    this.sendRequest.resource('roles')
    .then(
      (response)=>{this.rolesButton.name=response}
    ).catch((error)=>{})

    this.sendRequest.resource('AppUserRoleDTO.title')
    .then((response)=>{this.roleTitle=response})
    .catch(()=>{})
  }


  add(){

    let value:any={};
    value.id=0;
    value.active=true;

    this.openDialog.openDialog(AppUsersDialogComponent,700,[value,this.names])
    .then(
      (response)=>{
        this.table.addRow(response.id);
      }
    ).catch((error)=>{})

  }

  edit(row:any){
   
    this.openDialog.openDialog(AppUsersDialogComponent,700,[row,this.names])
    .then(
      (response)=>{
        this.table.editRow(response);
      }
    ).catch((error)=>{})
  }

  exportTableAction(actionTable:ExportTableAction){

    if(actionTable.action=='roles'){
      this.openDialog.openDialog(UserRolesListDialogComponent,600,[actionTable.row,'/api/appuser/roles/',(this.roleTitle+" - "+actionTable.row.username)],false)
      .then(()=>{}).catch(()=>{})
    }

  }
}
