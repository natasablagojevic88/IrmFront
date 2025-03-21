import { Component, ViewChild, viewChild } from '@angular/core';
import { OpenDialogService } from '../../services/open-dialog.service';
import { RolesDialogComponent } from './roles-dialog/roles-dialog.component';
import { TableComponent } from '../../common-components/table/table.component';
import { CheckMobileService } from '../../services/check-mobile.service';
import { TableButton } from '../../model/TableButton';
import { SendRequestService } from '../../services/send-request.service';
import { ExportTableAction } from '../../model/ExportTableAction';
import { AppUsersRoleListDialogComponent } from './app-users-role-list-dialog/app-users-role-list-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  @ViewChild(TableComponent) table!:TableComponent;

  title:string='';

  names:any;

  usersButton:TableButton={
    code: 'users',
    icon: 'fa fa-user',
    name: '',
    color: '#ff4081'
  }

  constructor(public openDialog:OpenDialogService,
    public sendRequest:SendRequestService
  ){

    this.sendRequest.resource('RoleAppUserDTO.title')
    .then((response)=>{
      this.usersButton.name=response;
    }).catch((error)=>{})

  }

  add(){

    let value:any={};
    value.id=0;

    this.openDialog.openDialog(RolesDialogComponent,600,[value,this.names],true)
    .then(
      (response)=>{
        this.table.addRow(response.id);
      }
    ).catch(()=>{})

  }

  edit(row:any){


    this.openDialog.openDialog(RolesDialogComponent,600,[row,this.names],true)
    .then(
      (response)=>{
        this.table.editRow(response);
      }
    ).catch(()=>{})
  }

  exportTableAction(exportAction:ExportTableAction){

    if(exportAction.action=='users'){
      this.openDialog.openDialog(AppUsersRoleListDialogComponent,700,exportAction.row,false)
      .then(()=>{}).catch(()=>{})
    }
  }
}
