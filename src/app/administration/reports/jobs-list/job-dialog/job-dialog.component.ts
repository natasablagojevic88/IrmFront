import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../../services/check-mobile.service';
import { ComboboxDTO } from '../../../../model/ComboboxDTO';
import { SendRequestService } from '../../../../services/send-request.service';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrl: './job-dialog.component.css'
})
export class JobDialogComponent {

  value:any={};
  reportType:string='';
  names:any={}
  reportJobTypeList:ComboboxDTO[]=[]
  reportJobFileTypeList:ComboboxDTO[]=[]
  listSmtp:ComboboxDTO[]=[];
  reportJobMailType:ComboboxDTO[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<JobDialogComponent>,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService
  ){
    this.value=data[0];
    this.reportType=data[1];
    this.names=data[2];
    this.reportJobTypeList=JSON.parse(JSON.stringify(data[3]));
    this.reportJobFileTypeList=JSON.parse(JSON.stringify(data[4]));
    this.listSmtp=data[5];
    this.reportJobMailType=data[6];

    if(this.reportType!='EXECUTE'){
      let findIndex=this.reportJobTypeList.findIndex(a=>a.value=='EXECUTE');
      this.reportJobTypeList.splice(findIndex,1);
      
    }else{
      let findIndex=this.reportJobTypeList.findIndex(a=>a.value=='EXECUTE');
      let valueItem:ComboboxDTO=this.reportJobTypeList[findIndex];
      this.reportJobTypeList=[valueItem];
    }

    if(this.reportType!='MODEL'){
      let findIndex=this.reportJobTypeList.findIndex(a=>a.value=='IMPORT');
      if(findIndex>-1){
        this.reportJobTypeList.splice(findIndex,1);
      }
     
    }else{
      let findIndex=this.reportJobTypeList.findIndex(a=>a.value=='IMPORT');
      let valueItem:ComboboxDTO=this.reportJobTypeList[findIndex];
      this.reportJobTypeList=[valueItem];
    }

    if(this.reportType!='JASPER'){
      let findIndex=this.reportJobFileTypeList.findIndex(a=>a.value=='PDF');
      this.reportJobFileTypeList.splice(findIndex,1);
    }else{
      let findIndex=this.reportJobFileTypeList.findIndex(a=>a.value=='PDF');
      let valueItem:ComboboxDTO=this.reportJobFileTypeList[findIndex];
      this.reportJobFileTypeList=[valueItem];
    }
  }

  changeType(type:string){
    if(type=='MAIL'){
      if(this.value.mailType==undefined){
        this.value.mailType='ATTACHMENT';
      }

      if(this.value.smtpServerId==undefined&&this.listSmtp.length>0){
        this.value.smtpServerId=this.listSmtp[0].value;
      }
    }
  }

  changeMailType(type:string){
    if(type=='ATTACHMENT'){
      if(this.value.fileType==undefined){
        this.value.fileType=this.reportJobFileTypeList[0].value;
      }
    }
  }

  isErrorMailActive():boolean{

    if (this.value.mailError==undefined){
      return false;
    }

    if (this.value.mailError.length==0){
      return false;
    }

    return true;
  }

  submit(){
    this.sendRequest.post('/api/report/job',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }
}
