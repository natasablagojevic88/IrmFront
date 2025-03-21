import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendRequestService } from '../../../services/send-request.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { CreateGridService } from '../../../services/create-grid.service';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { PreviewInfoCodebookService } from '../../../services/preview-info-codebook.service';

@Component({
  selector: 'app-create-data-dialog',
  templateUrl: './create-data-dialog.component.html',
  styleUrl: './create-data-dialog.component.css'
})
export class CreateDataDialogComponent {

  mapFields:any[][]=[];
  value:any={};
  columnsNumber:number=0;
  codebooks:any;
  modelId:number=0;
  parentId:number=0;
  disabledItems:boolean=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<CreateDataDialogComponent>,
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService,
    public previewInfo:PreviewInfoCodebookService
  ){
    this.mapFields=data[0];
    this.value=data[1];
    this.columnsNumber=data[2];
    this.codebooks=JSON.parse(JSON.stringify(data[3]));
    this.modelId=data[4];
    this.parentId=data[5];
    this.disabledItems=data[6];

    


  }

  submit(){
    this.sendRequest.post('/api/preview/model/'+this.modelId+'/'+this.parentId,this.value)
    .then((response)=>{
      this.dialogRef.close(response);
    }).catch(()=>{})
  }

  changeCodebook(codebook:string,value:any){
    let codebookValue=value==undefined?-1:value;

    this.sendRequest.get('/api/preview/model/subcodebooks/'+this.modelId+'/'+codebook+'/'+codebookValue)
    .then((response)=>{
      if(response.codebook!=undefined){
        this.codebooks[response.codebook]=response.list;

        let comboboxList:ComboboxDTO[]=response.list;
        comboboxList.forEach(c=>{
          c.value=c.value.toString();
        });
        
        if(this.value[response.codebook]!=undefined){
         
          if(comboboxList.findIndex(a=>a.value==this.value[response.codebook].toString())==-1){
            this.value[response.codebook]=undefined;
          }
        }
      }
    }).catch(()=>{})
  }

  hasListOfValues(column:any):boolean{
    if(this.codebooks[column]!=undefined){
      return true;
    }else{
      return false;
    }
  }


  infoClicked(idCodebook:any,codebook:string){

    this.previewInfo.preview(this.modelId,codebook,idCodebook);

  }

  inputChange(column:any){
    if(column.eventFunction!=undefined){
      this.sendRequest.post('/api/preview/model/changeevent/'+this.modelId+'/'+this.parentId+'/'+column.eventFunction,this.value)
      .then((response)=>{
        let inValue:any=response['value'];

        for(let i =0;i<Object.keys(inValue).length;i++){
          let key=Object.keys(inValue)[i];
          if(key==column.code){
            continue;
          }
          this.value[key]=inValue[key];
        }

        if(response['codebook']!=undefined){
          
          let codebooks:any=response['codebook'];
          let keysCodebook:string[]= Object.keys(codebooks);
          
          for(let i=0;i<keysCodebook.length;i++){
            this.codebooks[keysCodebook[i]]=codebooks[keysCodebook[i]];
          }
        }
      }).catch(()=>{})
    }
  }

}
