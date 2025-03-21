import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../../../services/send-request.service';

@Component({
  selector: 'app-jasper-dialog',
  templateUrl: './jasper-dialog.component.html',
  styleUrl: './jasper-dialog.component.css'
})
export class JasperDialogComponent {

  value:any;
  names:any;
  jasperInfo:string='';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<JasperDialogComponent>,
    public sendRequest:SendRequestService
  ){
    this.value=data[0];
    this.names=data[1];
    this.jasperInfo=data[2];
  }

  changeFile(fileEvent:any){

    var fileList:FileList=fileEvent.target.files;

    var file:File=fileList[0];

    this.sendRequest.postFile('/api/model/uploadfile',file)
    .then((response)=>{
      this.value.filePath=response.path;
      this.value.jasperFileName=file.name;
    }).catch(()=>{})
  }

  submit(){
    this.sendRequest.post('/api/model/jasper',this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }
}

