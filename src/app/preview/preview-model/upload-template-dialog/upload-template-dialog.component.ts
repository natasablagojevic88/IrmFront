import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelDTO } from '../../../model/ModelDTO';
import { SendRequestService } from '../../../services/send-request.service';

@Component({
  selector: 'app-upload-template-dialog',
  templateUrl: './upload-template-dialog.component.html',
  styleUrl: './upload-template-dialog.component.css'
})
export class UploadTemplateDialogComponent {

  model: ModelDTO=new ModelDTO();
  parentId:number=-1;

  file:File|undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<UploadTemplateDialogComponent>,
    public sendRequest:SendRequestService
  ){
    this.model=data[0];
    this.parentId=data[1];

  }

  changeFile(event:any){
    var target:any=event.target;
    var files:FileList=target.files;
    if(files.length>0){
      this.file=files[0];
    }


  }

  submit(){

    if(this.file!=undefined){

      this.sendRequest.postFile('/api/preview/model/excel/import/'+this.model.id+'/'+this.parentId,this.file)
      .then((response)=>{
        this.dialogRef.close(response);
      }).catch(()=>{})

    }

  }

}
