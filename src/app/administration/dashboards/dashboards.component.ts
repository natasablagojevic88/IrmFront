import { Component, ViewChild } from '@angular/core';
import { OpenDialogService } from '../../services/open-dialog.service';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { TableComponent } from '../../common-components/table/table.component';
import { TableButton } from '../../model/TableButton';
import { SendRequestService } from '../../services/send-request.service';
import { ExportTableAction } from '../../model/ExportTableAction';
import { UserRolesListDialogComponent } from '../app-users/user-roles-list-dialog/user-roles-list-dialog.component';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { CheckMobileService } from '../../services/check-mobile.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {

  titles: string[] = ['',''];
  paths: ComboboxDTO[] = [];
  selectedRow:any;
  names: any = '';

  activeLayer:number=0;

  @ViewChild(TableComponent) table!: TableComponent;

  reports: TableButton = {
    code: 'reports',
    icon: 'fa fa-sitemap',
    name: 'reports',
    color: 'purple'
  }

  rolesButton: TableButton = {
    code: 'roles',
    icon: 'fa fa-user-circle',
    name: '',
    color: '#ff4081'
  }

  roleTitle: string = '';

  listReportBox:ComboboxDTO[]=[];

  constructor(
    public openDialog: OpenDialogService,
    public sendRequest: SendRequestService,
    public checkMobile:CheckMobileService
  ) {
    this.titles[1]='reports';
    this.sendRequest.resource('roles')
      .then(
        (response) => { this.rolesButton.name = response }
      ).catch(() => { })

    this.sendRequest.resource('AppUserRoleDTO.title')
      .then((response) => { this.roleTitle = response })
      .catch(() => { })

    this.sendRequest.get('/api/dashboard/reports/combobox')
    .then((response)=>{
      this.listReportBox=response;
    }).catch(()=>{})

  }


  add() {

    let value: any = {};
    value.id = 0;
    value.rownumber = 1;
    value.columnnumber = 1;

    this.openDialog.openDialog(DashboardDialogComponent, 400, [value, this.names])
      .then((response) => {
        this.table.addRow(response.id);
      }).catch(() => { })
  }

  edit(row: any) {
    this.openDialog.openDialog(DashboardDialogComponent, 400, [row, this.names])
      .then((response) => {
        this.table.editRow(response);
      }).catch(() => { })
  }

  addTableClicked(exportTableAction: ExportTableAction) {

    if (exportTableAction.action == 'roles') {
      this.openDialog.openDialog(UserRolesListDialogComponent, 600, [exportTableAction.row, '/api/dashboard/roles/', (this.roleTitle + " - " + exportTableAction.row.name)], false)
      .then(()=>{}).catch(()=>{})
    }else if (exportTableAction.action=='reports'){
      this.showReport(exportTableAction);
    }
  }

  mapReport:any[]=[];

  showReport(exportTableAction: ExportTableAction){

    this.sendRequest.get('/api/dashboard/reports/'+exportTableAction.row.id)
    .then((response)=>{
        this.mapReport=response;
        this.selectedRow=exportTableAction.row;

        let title:string=this.titles[0];

        if(this.checkMobile.isMobile()){
          title=title.substring(0,1);
        }
        let path:any={
          value: 0,
          name: title+': '+exportTableAction.row.name
        }
        this.paths.push(path);

        this.activeLayer=1;
    }).catch(()=>{

    })
    
  }

  pathClicked(){
    this.paths.splice(0,1);
    this.activeLayer=0;
  }

  saveClicked(){
    this.pathClicked();
  }
}
