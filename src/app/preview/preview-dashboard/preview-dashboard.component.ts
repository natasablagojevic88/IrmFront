import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CheckMobileService } from '../../services/check-mobile.service';
import { SendRequestService } from '../../services/send-request.service';
import { TableButton } from '../../model/TableButton';
import { SendInfoService } from '../../services/send-info.service';
import { DashboardDefaultData } from './../../model/DashboardDefaultData';

@Component({
  selector: 'app-preview-dashboard',
  templateUrl: './preview-dashboard.component.html',
  styleUrl: './preview-dashboard.component.css'
})
export class PreviewDashboardComponent {

  @Input() inDashboardData:any|undefined;

  title:string='';
  dashboardId:number=0;

  translate:TranslatePipe=new TranslatePipe();
  height:number=0;

  dashboardInfo:any;
  columns:number=0;
  rows:number=1;
  items:any[]=[]

  setDefaultBehaviour:boolean=true;
  dashobardIsDefaultLabel:string='';
  dashobardIsNotDefaultLabel:string='';

  addButtonList:TableButton[]=[]

  setDefaultButton:TableButton={
    code: 'setDefault',
    icon: 'fa fa-check-square-o',
    name: '',
    color: 'green'
  }

  removeDefaultButton:TableButton={
    code: 'removeDefault',
    icon: 'fa fa-ban',
    name: '',
    color: 'red'
  }

  constructor(
    public activeRoute:ActivatedRoute,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService,
    public sendInfo:SendInfoService
  ){

    this.activeRoute.queryParams.subscribe((s)=>{
      if(s['id']!=undefined){
        this.dashboardId=s['id'];
        this.columns=0;
        this.rows=1;
        this.items=[];
        this.dashboardInfo={};
        this.addButtonList=[];
        this.refreshDashboard();
      }
      
    });

    this.setDefaultButton.name=this.translate.transform('setDefaultDashboard');
    this.removeDefaultButton.name=this.translate.transform('removeDefaultDashboard');
    this.dashobardIsDefaultLabel=this.translate.transform('dashobardIsDefault');
    this.dashobardIsNotDefaultLabel=this.translate.transform('dashboardIsNotDefault');

  }
  ngOnInit(){

    if(this.inDashboardData!=undefined){
      this.dashboardInfo=this.inDashboardData;
      this.dashboardId=this.inDashboardData.id;
      this.reload();
    }
  }

  ngAfterContentInit(){
    var previewDiv=document.getElementsByClassName('previewDashboardDiv')[0] as HTMLElement;
    this.height=previewDiv.offsetHeight;

  }

  refreshDashboard(){
    this.addButtonList=[];
    this.sendRequest.get('/api/preview/previewdashboard/'+this.dashboardId)
    .then((response)=>{
      this.dashboardInfo=response;
      this.reload();
      if(this.inDashboardData!=undefined){
        DashboardDefaultData.dashbordInfo=response;
      }
      this.setDefaultBehaviour=this.dashboardInfo.setDefault;
      if(this.inDashboardData==undefined){
        if(this.setDefaultBehaviour){
          this.addButtonList.push(this.setDefaultButton);
        }else{
          this.addButtonList.push(this.removeDefaultButton);
        }
      }
      
    }).catch(()=>{})
  }

  reload(){
    this.title=this.dashboardInfo.title;
    this.columns=this.dashboardInfo.numberOfColumns;
    this.rows=this.dashboardInfo.numberOfRows;
    this.items=this.dashboardInfo.items;
  }

  addButtonClick(event:string){

    if(event=='setDefault'){
      this.sendRequest.get('/api/preview/previewdashboard/setdefault/'+this.dashboardId)
      .then(()=>{
        this.sendInfo.open(this.dashobardIsDefaultLabel,false);
        this.refreshDashboard()
      }).catch(()=>{})
    }else{
      this.sendRequest.get('/api/preview/previewdashboard/removedefault/'+this.dashboardId)
      .then(()=>{
        this.sendInfo.open(this.dashobardIsNotDefaultLabel,false);
        this.refreshDashboard()
      }).catch(()=>{})
    }
  }
}
