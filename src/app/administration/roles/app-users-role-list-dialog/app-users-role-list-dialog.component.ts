import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SendInfoService } from '../../../services/send-info.service';

@Component({
  selector: 'app-app-users-role-list-dialog',
  templateUrl: './app-users-role-list-dialog.component.html',
  styleUrl: './app-users-role-list-dialog.component.css'
})
export class AppUsersRoleListDialogComponent {


  listUsers:any[]=[]

  roleAdded:string='';
  roleDelete:string='';
  title:string='';

  translate:TranslatePipe=new TranslatePipe;

  displayedColumns: string[] = ['hasRight', 'username', 'name'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource();

  names:any={
    'hasRight':'hasRight',
    'username':'username',
    'name':'name'
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public sendRequest:SendRequestService,
    public checkMobile:CheckMobileService,
    public sendInfo:SendInfoService
  ){

    this.sendRequest.get('/api/roles/users/'+data.id)
    .then((response)=>{
      this.listUsers=response;
      this.dataSource=new MatTableDataSource(this.listUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch((error)=>{})

    this.sendRequest.resource('roleIsAdded')
    .then((response)=>{this.roleAdded=response}).catch(()=>{})

    this.sendRequest.resource('roleIsDeleted')
    .then((response)=>{this.roleDelete=response}).catch(()=>{})

    this.sendRequest.resource('RoleAppUserDTO.title')
    .then((response)=>{this.title=response+" - "+data.code}).catch(()=>{})

    this.sendRequest.get('/api/session/names/rs.irm.administration.dto.RoleAppUserDTO')
    .then((response)=>{this.names=response}).catch(()=>{})
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  changeSelecton(event:any,row:any){

    let selectedRole:any={};
    selectedRole.hasRight=event.checked;
    selectedRole.id=this.data.id;

    this.sendRequest.post('/api/appuser/roles/'+row.id,selectedRole)
    .then(()=>{
      row.hasRight=event.checked;
      this.dataSource._updateChangeSubscription();

      if(event.checked){
        this.sendInfo.open(this.roleAdded,false);
      }else{
        this.sendInfo.open(this.roleDelete,false);
      }

    }).catch(()=>{
      row.hasRight=event.checked;
      this.dataSource._updateChangeSubscription();
    })
  }

  clickRow(row:any){

    let selectedRole:any={};
    selectedRole.hasRight=!row.hasRight;
    selectedRole.id=this.data.id;

    this.sendRequest.post('/api/appuser/roles/'+row.id,selectedRole)
    .then(()=>{
      row.hasRight=!row.hasRight;
      this.dataSource._updateChangeSubscription();

      if(selectedRole.hasRight){
        this.sendInfo.open(this.roleAdded,false);
      }else{
        this.sendInfo.open(this.roleDelete,false);
      }

    }).catch(()=>{
      row.hasRight=!row.hasRight;
      this.dataSource._updateChangeSubscription();
    })
  }
}
