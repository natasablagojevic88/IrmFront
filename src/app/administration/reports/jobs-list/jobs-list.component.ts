import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../../services/send-request.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { TableComponent } from '../../../common-components/table/table.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { JobLogListDialogComponent } from '../../job-preview/job-log-list-dialog/job-log-list-dialog.component';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css'
})
export class JobsListComponent {

  reportDTO:any={};
  modelDTO:any={};
  javaClassDTO:any={};
  api:string='';
  isModel:boolean=false;
  isJavaClass:boolean=false;
  names:any={};
  title:string='';

  reportJobTypeList:ComboboxDTO[]=[]
  reportJobFileTypeList:ComboboxDTO[]=[]
  reportJobMailType:ComboboxDTO[]=[]
  listSmtp:ComboboxDTO[]=[]

  translate:TranslatePipe=new TranslatePipe();

  @ViewChild(TableComponent) table!:TableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<JobsListComponent>,
    public sendRequest:SendRequestService,
    public openDialog:OpenDialogService
  ){
    this.reportDTO=data[0];
    this.modelDTO=data[1];
    this.isModel=data[2];
    this.isJavaClass=data[3];
    this.javaClassDTO=data[4];

    this.api=this.isModel?'/api/model/jobs/'+this.modelDTO.id
    :
    (
      this.isJavaClass ? '/api/java-class/job-list/'+this.javaClassDTO.id 
      :
      '/api/report/jobs/table/'+this.reportDTO.id
    )
    ;

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ReportJobType')
    .then((response)=>{this.reportJobTypeList=response}).catch(()=>{})

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ReportJobFileType')
    .then((response)=>{this.reportJobFileTypeList=response}).catch(()=>{})

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ReportJobMailType')
    .then((response)=>{this.reportJobMailType=response}).catch(()=>{})

    this.sendRequest.get('/api/report/jobs/smtpbox')
    .then((response)=>{this.listSmtp=response}).catch(()=>{})
  }

  add(){
    let value:any={}
    value.id=0;
    value.active=true;
    value.reportId=this.isModel?undefined:this.reportDTO.id;
    value.modelId=this.isModel?this.modelDTO.id:undefined;
    if(this.isModel){
      value.type='IMPORT';
    }else if(this.javaClassDTO){
      value.type='JAVACLASS';
      value.javaClassId=this.javaClassDTO.id;
    }
    else{
      if(this.reportDTO.type!='EXECUTE'){
        value.type='MAIL';
        
        value.mailType='ATTACHMENT';
  
        if(this.reportDTO.type=='JASPER'){
          value.fileType='PDF';
        }else{
          value.fileType='EXCEL';
        }
  
        if(this.listSmtp.length>0){
          value.smtpServerId=this.listSmtp[0].value;
        }
      }else{
        value.type='EXECUTE';
      }
    }
    
    value.addTimeStamp=false;
    value.csvHasHeader=true;
    value.conditional=false;

    this.openDialog.openDialog(JobDialogComponent,1100,[value,this.isModel?'MODEL': (this.isJavaClass?'JAVACLASS': this.reportDTO.type),this.names,
      this.reportJobTypeList,this.reportJobFileTypeList,this.listSmtp,this.reportJobMailType])
    .then((response)=>{
      this.table.addRow(response.id);
    }).catch(()=>{})


  }

  edit(row:any){
    this.openDialog.openDialog(JobDialogComponent,1100,[row,this.isModel?'MODEL': (this.isJavaClass?'JAVACLASS': this.reportDTO.type),this.names,
      this.reportJobTypeList,this.reportJobFileTypeList,this.listSmtp,this.reportJobMailType])
    .then((response)=>{
      this.table.editRow(response);
    }).catch(()=>{})
  }

}
