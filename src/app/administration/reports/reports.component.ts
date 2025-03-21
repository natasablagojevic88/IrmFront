import { Component, ViewChild, ViewChildren } from '@angular/core';
import { TableComponent } from '../../common-components/table/table.component';
import { OpenDialogService } from '../../services/open-dialog.service';
import { ReportGroupDialogComponent } from './report-group-dialog/report-group-dialog.component';
import { SendRequestService } from '../../services/send-request.service';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { UserRolesListDialogComponent } from '../app-users/user-roles-list-dialog/user-roles-list-dialog.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CheckMobileService } from '../../services/check-mobile.service';
import { ChooseReportTypeDialogComponent } from './choose-report-type-dialog/choose-report-type-dialog.component';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { ReportColumnInfoDTO } from '../../model/ReportColumnInfoDTO';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';
import { JobsListComponent } from './jobs-list/jobs-list.component';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  names: any;
  namesReport:any;

  @ViewChildren(TableComponent) table!: any;

  reportDTO:any;

  activeLayer = -1;
  titles: string[] = [];
  paths: any[] = [];

  activeGroup: number = -1;
  activeGroupType:string='';
  listModels:ComboboxDTO[]=[];
  listMetrics:ComboboxDTO[]=[];
  listGraphTypes:ComboboxDTO[]=[];
  listSortDirection:ComboboxDTO[]=[];
  listColumnType:ComboboxDTO[]=[];

  reportButton: TableButton = {
    code: 'reports',
    icon: 'fa fa-sitemap ',
    name: '',
    color: 'purple'
  }

  jobs: TableButton = {
    code: 'jobs',
    icon: 'fa fa-clock-o',
    name: 'jobs',
    color: 'blue'
  }


  roleButton: TableButton = {
    code: 'roles',
    icon: 'fa fa-user-circle ',
    name: '',
    color: '#ff4081'
  }

  refreshJasperButton:TableButton={
    code: 'refreshJasperFiles',
    icon: 'fa fa-refresh',
    name: 'refreshJasperFiles',
    color: 'red'
  }


  public translate: TranslatePipe = new TranslatePipe();

  constructor(
    public openDialog: OpenDialogService,
    public sendRequest: SendRequestService,
    public checkMobile: CheckMobileService,
    public sendYesNo:YesNoService,
    public sendInfo:SendInfoService
  ) {
    this.sendRequest.resource('roles')
      .then((response) => {
        this.roleButton.name = response;
      }).catch(() => { })

    this.sendRequest.resource('reports')
      .then((response) => {
        this.reportButton.name = response;
      }).catch(() => { })

    this.titles.push('reportgroups');
    this.activeLayer = 0;

    this.sendRequest.get('/api/model/codebook/list')
    .then((response)=>{
      this.listModels=response;
    }).catch(()=>{})

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.SqlMetric')
    .then((response)=>{
      this.listMetrics=response;
    }).catch(()=>{})

    this.sendRequest.get('/api/session/enumbox/rs.irm.database.enums.SortDirection')
    .then((response)=>{
      this.listSortDirection=response;
    }).catch(()=>{})

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.GraphType')
    .then((response)=>{
      this.listGraphTypes=response;
    }).catch(()=>{})
    this.sendRequest.get('/api/session/enumbox/rs.irm.database.enums.ColumnType')
    .then((response)=>{
      this.listColumnType=response;
    }).catch(()=>{})

    this.jobs.name=this.translate.transform('jobScheduling');
  }

  addRow(id: any,index:number) {
    let tableLast: TableComponent = this.table._results[index];
    tableLast.addRow(id);
  }

  editRow(row: any,index:number) {
    let tableLast: TableComponent = this.table._results[index];
    tableLast.editRow(row);
  }

  add() {

    if (this.activeLayer == 0) {

      let value: any = {};
      value.id = 0;

      this.openDialog.openDialog(ReportGroupDialogComponent, 550, [value, this.names])
        .then((response) => {
          this.addRow(response.id,0);
        }).catch(() => { });
    } else if (this.activeLayer == 1) {

      this.openDialog.openDialog(ChooseReportTypeDialogComponent,300,[this.namesReport],false)
      .then((response)=>{
        let pathValue: any = {};
        pathValue.value = this.activeLayer;
        let pathName = this.translate.transform('reports');
        if (this.checkMobile.isMobile()) {
          pathName = pathName.substring(0, 1).toUpperCase();
        }
        pathValue.name =pathName;
        this.paths.push(pathValue);
        this.titles.push('report');
        this.activeGroupType=response;

        this.reportDTO={};
        this.reportDTO.id=0;
        this.reportDTO.reportGroupId=this.activeGroup;
        this.reportDTO.type=this.activeGroupType;
        this.reportDTO.columns=[];
        this.reportDTO.filters=[];



        this.activeLayer=2;
      }).catch(()=>{})
    }


  }

  editReportGroup(row: any) {
    this.openDialog.openDialog(ReportGroupDialogComponent, 550, [row, this.names])
      .then((responseRow) => {
        this.editRow(responseRow,0);
      }).catch(() => { });


  }

  editReport(row:any){
    this.sendRequest.get('/api/report/info/'+row.id)
    .then((response)=>{
      let pathValue: any = {};
      pathValue.value = this.activeLayer;
      let pathName = this.translate.transform('reports');
      if (this.checkMobile.isMobile()) {
        pathName = pathName.substring(0, 1).toUpperCase();
      }
      pathValue.name =pathName;
      this.paths.push(pathValue);
      this.titles.push('report');
      this.activeGroupType=row.type;
      this.reportDTO=response;
  
      this.activeLayer=2;
  
    }).catch(()=>{})


  }

  exportTableActionGroupRole(exportAction: ExportTableAction) {

    if (exportAction.action == 'roles') {
      let title = this.roleButton.name + " - " + exportAction.row.code;
      let api: string = '/api/reportgroup/roles/';

      this.openDialog.openDialog(UserRolesListDialogComponent, 700, [exportAction.row, api, title], false)
        .then(() => { }).catch(() => { })
    } else if (exportAction.action == 'reports') {

      let pathValue: any = {};
      pathValue.value = this.activeLayer;
      let pathName = this.translate.transform('reports');
      if (this.checkMobile.isMobile()) {
        pathName = pathName.substring(0, 1).toUpperCase();
      }
      pathValue.name = pathName + ': ' + exportAction.row.name;
      this.paths.push(pathValue);
      this.titles.push('reports');

      this.activeGroup = exportAction.row.id;

      this.activeLayer = 1;
    }
  }

  pathClicked(event: number) {
    for (let i = this.titles.length - 1; i > event; i--) {
      this.titles.splice(i, 1);
      this.paths.splice(i - 1, 1);
    }

    this.activeLayer = event;
  }

  saveReport(response:any[]){
    let insert:boolean=response[0];
    let item:any=response[1];

    if(insert){
      this.addRow(item.id,1);
    }else{
      this.editRow(item,1);
    }

    this.pathClicked(1);
  }

  exportJasperReport(){
    this.sendYesNo.yesNo('refreshJasperFilesYesNo')
    .then(()=>{
      this.sendRequest.get('/api/report/jasperrefresh')
      .then(()=>{
        this.sendInfo.open('refreshJasperFilesFinished',false);
      }).catch(()=>{})
    }).catch(()=>{})
  }

  showJobList(event:ExportTableAction){
    this.openDialog.openDialog(JobsListComponent,1000,[event.row,{},false],false)
    .then(()=>{}).catch(()=>{})
  }
}
