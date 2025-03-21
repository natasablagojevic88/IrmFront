import { Component, Inject, ViewChild } from '@angular/core';
import { SendRequestService } from '../../../services/send-request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendInfoService } from '../../../services/send-info.service';

@Component({
  selector: 'app-user-roles-list-dialog',
  templateUrl: './user-roles-list-dialog.component.html',
  styleUrl: './user-roles-list-dialog.component.css'
})
export class UserRolesListDialogComponent {

  title: string = '';
  roleAdded:string='';
  roleDeleted:string='';
  value:any;
  api:string='';

  names: any={
    hasRight:'',
    code:'',
    description:''
  }


  roleList:any[]=[]

  displayedColumns: string[] = ['hasRight','code','description'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource();

  translate:TranslatePipe=new TranslatePipe();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public sendRequest: SendRequestService,
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public checkMobile:CheckMobileService,
    public sendInfo:SendInfoService
  ) {

    this.value=data[0];
    this.api=data[1];
    this.title=data[2];

    this.sendRequest.get('/api/session/names/rs.irm.administration.dto.AppUserRoleDTO')
      .then(
        (response) => { this.names = response }
      ).catch(() => { })

     

    this.sendRequest.resource('roleIsAdded')
    .then((response)=>{this.roleAdded=response})
    .catch(()=>{})

    this.sendRequest.resource('roleIsDeleted')
    .then((response)=>{this.roleDeleted=response})
    .catch(()=>{})

    this.sendRequest.get(this.api+this.value.id)
    .then((response)=>{
      this.roleList=response;
      this.dataSource = new MatTableDataSource(this.roleList);
      this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    }).catch((error)=>{})

    
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

  changeSelection(event:any, row:any){
    let rowSelected=JSON.parse(JSON.stringify(row));
    rowSelected.hasRight=event.checked;
    this.sendRequest.post(this.api+this.value.id,rowSelected)
    .then(
      ()=>{
        row.hasRight=event.checked;
      this.dataSource._updateChangeSubscription();

      if(event.checked){
        this.sendInfo.open(this.roleAdded,false);
      }else{
        this.sendInfo.open(this.roleDeleted,false);
      }

      }
    ).catch(()=>{
    })
  }

  clickRow(row:any){
    let rowSelected=JSON.parse(JSON.stringify(row));
    rowSelected.hasRight=!row.hasRight;
    this.sendRequest.post(this.api+this.value.id,rowSelected)
    .then(
      ()=>{
        row.hasRight=rowSelected.hasRight;
      this.dataSource._updateChangeSubscription();

      if(rowSelected.hasRight){
        this.sendInfo.open(this.roleAdded,false);
      }else{
        this.sendInfo.open(this.roleDeleted,false);
      }

      }
    ).catch(()=>{
      row.hasRight=rowSelected.hasRight;
      this.dataSource._updateChangeSubscription();
    })

  }

}
