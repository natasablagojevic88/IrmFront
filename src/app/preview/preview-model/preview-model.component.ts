import { Component, inject, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModelDTO } from '../../model/ModelDTO';
import { OpenDialogService } from '../../services/open-dialog.service';
import { CreateDataDialogComponent } from './create-data-dialog/create-data-dialog.component';
import { TableComponent } from '../../common-components/table/table.component';
import { SendRequestService } from '../../services/send-request.service';
import { TableButton } from '../../model/TableButton';
import { ExportTableAction } from '../../model/ExportTableAction';
import { YesNoService } from '../../services/yes-no.service';
import { SendInfoService } from '../../services/send-info.service';
import { CheckMobileService } from '../../services/check-mobile.service';
import { DownloadFileService } from '../../services/download-file.service';
import { UploadTemplateDialogComponent } from './upload-template-dialog/upload-template-dialog.component';
import { Platform } from '@angular/cdk/platform';
import { CreateGridService } from '../../services/create-grid.service';
import { PreviewInfoCodebookService } from '../../services/preview-info-codebook.service';

@Component({
  selector: 'app-preview-model',
  templateUrl: './preview-model.component.html',
  styleUrl: './preview-model.component.css'
})
export class PreviewModelComponent {
  idModel: number = 0;

  lockMessage: string = '';
  unlockMessage: string = '';

  platform = inject(Platform);

  api: string[] = [];
  title: string[] = [];
  models: number[] = [];
  modelDTOS: ModelDTO[] = [];
  fields: any[][] = []
  codebooks: any[] = [];
  parents: number[] = [];
  deleteApis: string[] = []
  addButons: TableButton[][] = []
  canChange: boolean[] = [];
  checkTotalApi: string[] = [];
  dialogButtons:TableButton[][]= [];
  subtables: any[][] = [];

  paths: any[] = []

  lockButton: TableButton =
    {
      code: 'lock',
      icon: 'fa fa-lock',
      name: 'itemLock',
      color: 'green'
    };

  unlockButton: TableButton = {
    code: 'unlock',
    icon: 'fa fa-unlock',
    name: 'itemUnlock',
    color: 'red'
  }

  exportTemplate: TableButton = {
    code: 'template',
    icon: 'fa fa-download',
    name: 'importTemplate',
    color: 'orange'
  }

  importTemplate: TableButton = {
    code: 'upload',
    icon: 'fa fa-upload',
    name: 'importFile',
    color: 'green'
  }


  activeLayer = -1;

  @ViewChildren(TableComponent) tables!: TableComponent[];

  constructor(
    public router: ActivatedRoute,
    public openDialog: OpenDialogService,
    public sendRequest: SendRequestService,
    public yesNoService: YesNoService,
    public sendInfo: SendInfoService,
    public checkMobile: CheckMobileService,
    public downloadFile:DownloadFileService,
    public createGrid:CreateGridService,
    public previewInfo:PreviewInfoCodebookService
  ) {

    this.router.queryParamMap.subscribe((r)=>{
          this.api = [];
          this.models = [];
          this.title = [];
          this.modelDTOS = [];
          this.fields = [];
          this.codebooks = [];
          this.parents = [];
          this.deleteApis = [];
          this.addButons = [];
          this.canChange = [];
          this.checkTotalApi = [];
          this.dialogButtons=[];
          this.subtables=[];

          this.paths = [];

          this.activeLayer = -1;


          this.idModel = Number.parseFloat(r.get('id')!);

          this.addLayer(this.idModel, -1);
    })

    this.sendRequest.resource('itemIsLocked').then((response) => { this.lockMessage = response }).catch(() => { })
    this.sendRequest.resource('itemIsUnlocked').then((response) => { this.unlockMessage = response }).catch(() => { })
  }

  addLayer(idModel: any, parentId: any) {
    this.title.push('');
    this.modelDTOS.push(new ModelDTO());
    this.fields.push([]);
    this.parents.push(parentId);
    this.deleteApis.push('/api/preview/model/' + idModel);
    this.api.push('/api/preview/model/table/' + idModel + '/' + parentId);
    let addButtonsModel: TableButton[] = [];
    addButtonsModel.push(this.lockButton);
    addButtonsModel.push(this.unlockButton);
    this.addButons.push(addButtonsModel);
    this.canChange.push(false);
    let dialogButton:TableButton[]=[this.exportTemplate,this.importTemplate];
    this.subtables.push([]);
    if(this.activeLayer!=-1){
      let subtable:TableButton[]=this.subtables[this.activeLayer];
      for(let i=0;i<subtable.length;i++){
        if(subtable[i].code.startsWith('/jasper/')){
          dialogButton.push(subtable[i]);
        }
      }
    }
    this.dialogButtons.push(dialogButton);

    this.checkTotalApi.push('/api/preview/model/checktotal/' + idModel + '/' + parentId);

    this.sendRequest.get('/api/preview/model/codebooks/' + idModel)
      .then((response) => {
        this.codebooks.push(response);
      }).catch(() => { })

    this.activeLayer = this.activeLayer + 1;
    this.models.push(idModel);
  }


  back(backIndex: number) {

    for (let i = this.models.length - 1; i > backIndex; i--) {

      this.models.splice(i, 1);
      this.api.splice(i, 1);
      this.title.splice(i, 1);
      this.modelDTOS.splice(i, 1);
      this.fields.splice(i, 1);
      this.codebooks.splice(i, 1);
      this.parents.splice(i, 1);
      this.deleteApis.splice(i, 1);
      this.addButons.splice(i, 1);
      this.canChange.splice(i, 1);
      this.checkTotalApi.splice(i, 1);
      this.dialogButtons.splice(i,1);
      this.subtables.splice(i, 1);

    }

    for (let i = this.paths.length - 1; i >= backIndex; i--) {
      this.paths.splice(i, 1);
    }

    this.activeLayer = backIndex;

    setTimeout(() => {
      let table: any = this.tables;
      let rowSelected: Set<any> = table.last.clickedRows;

      if (rowSelected.size > 0) {
        let row: any;
        rowSelected.forEach(r => row = r);
        this.sendRequest.get('/api/preview/model/preview/' + this.models[this.activeLayer] + '/' + row.id)
          .then((response) => {
            table.last.editRow(response);
          }).catch(() => { })
      }

    }, 1);

  }


  add() {
    let model: ModelDTO = this.modelDTOS[this.activeLayer];
    let fields: any[] = this.fields[this.activeLayer];
    let mapFields: any[][] = this.createGrid.calculateGrid(model, fields);
    let codebook: any = this.codebooks[this.activeLayer];
    let parentId: number = this.parents[this.activeLayer];

    let value: any = {};
    value.id = 0;
    value.lock = false;

    this.sendRequest.get('/api/preview/model/defaultvalues/' + model.id + '/' + parentId)
      .then((response) => {
        let columns: string[] = Object.keys(response);
        for (let i = 0; i < columns.length; i++) {
          let columnName = columns[i];
          value[columnName] = response[columnName]

        }
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].columnType == 'BOOLEAN') {
            if (value[fields[i].code] == undefined) {
              value[fields[i].code] = true;
            }

          }
        }

        this.openDialog.openDialog(CreateDataDialogComponent, model.dialogWidth, [mapFields, value, model.columnsNumber, codebook, model.id, parentId, false])
          .then((response) => {
            let table: any = this.tables;
            table.last.addRow(response.id);
          }).catch(() => { })

      }).catch((error) => { })



  }

  edit(row: any) {
    let model: ModelDTO = this.modelDTOS[this.activeLayer];
    let fields: any[] = this.fields[this.activeLayer];
    let mapFields: any[][] = this.createGrid.calculateGrid(model, fields);
    let codebook: any = this.codebooks[this.activeLayer];
    let parentId: number = this.parents[this.activeLayer];
    let disabledItems: boolean = this.canChange[this.activeLayer] ? (row.lock ? true : false) : true;

    this.sendRequest.post('/api/preview/model/codebookdisabled/'+model.id,row)
    .then((response)=>{

      let codebookItem:any=JSON.parse(JSON.stringify(codebook));

      let codebookStrings:string[]=Object.keys(response);

      for(let i=0;i<codebookStrings.length;i++){
        let codebookString=codebookStrings[i];

        codebookItem[codebookString]=response[codebookString];
      }

      this.openDialog.openDialog(CreateDataDialogComponent, model.dialogWidth, [mapFields, row, model.columnsNumber, codebookItem, model.id, parentId, disabledItems])
      .then((response) => {
        let table: any = this.tables;
        table.last.editRow(response);
      }).catch(() => { })
    }).catch(()=>{})




  }

  exportAction(action: ExportTableAction) {

    if (action.action == 'lock') {
      this.lock(action.row);
    } else if (action.action == 'unlock') {
      this.unlock(action.row);
    } else if (action.action.startsWith('/jasper/')) {
      if(!this.platform.ANDROID){
        this.sendRequest.getBlob('/api/preview/model'+action.action+'/'+action.row.id)
        .then((response)=>{
          this.downloadFile.download(response);
        }).catch(()=>{})
      }else{
        this.sendRequest.get('/api/preview/model'+action.action+'/'+action.row.id+'/base64')
        .then((response)=>{
          this.downloadFile.downloadFileInAndroid(response);
        }).catch(()=>{})
      }

    } else {
      let path: any = {};
      path.value = this.activeLayer;
      let title = this.title[this.activeLayer];
      if (this.checkMobile.isMobile()) {
        title = title.substring(0, 1);
      }
      path.name = title + ": " + action.row.code;
      this.paths.push(path);
      this.addLayer(Number.parseFloat(action.action), action.row.id);
    }
  }

  lock(row: any) {

    let modelId = this.models[this.activeLayer];

    this.yesNoService.yesNo('lockYesNo')
      .then(() => {
        this.sendRequest.get('/api/preview/model/lock/' + modelId + '/' + row.id)
          .then((response) => {
            let table: any = this.tables;
            table.last.editRow(response);
            this.sendInfo.open(this.lockMessage, false);
          }).catch(() => { })
      }).catch(() => { })

  }

  unlock(row: any) {

    let modelId = this.models[this.activeLayer];

    this.yesNoService.yesNo('unlockYesNo')
      .then(() => {
        this.sendRequest.get('/api/preview/model/unlock/' + modelId + '/' + row.id)
          .then((response) => {
            let table: any = this.tables;
            table.last.editRow(response);
            this.sendInfo.open(this.unlockMessage, false);
          }).catch(() => { })
      }).catch(() => { })

  }

  previewCodebookInfo(data: any[]) {
    let modelId: number = this.models[this.activeLayer];
    let codebook:string=data[0];
    let selectedId:number=data[1];

    this.previewInfo.preview(
      modelId,
      codebook,
      selectedId
    )

  }

  pageTitleClicked(action:string){

    if(action=='template'){
      if(!this.platform.ANDROID){
        this.sendRequest.getBlob('/api/preview/model/excel/template/'+this.models[this.activeLayer])
        .then((response)=>{
        
          this.downloadFile.download(response);
        }).catch(()=>{})
      }else{
        this.sendRequest.get('/api/preview/model/excel/template/'+this.models[this.activeLayer]+"/base64")
        .then((response)=>{
        
          this.downloadFile.downloadFileInAndroid(response);
        }).catch(()=>{})
      }
      
    }else if (action=='upload'){
      let model: ModelDTO = this.modelDTOS[this.activeLayer];
      let parentId:number=this.parents[this.activeLayer];
      this.openDialog.openDialog(UploadTemplateDialogComponent,300,[model,parentId],false)
      .then(
        (response)=>{
          let table: any = this.tables;
          table.last.addRow(response.id);
          this.sendInfo.open('importFinished',false);
        }
      ).catch((error)=>{})
    }else if (action.startsWith('/jasper/')){
      if(!this.platform.ANDROID){
        this.sendRequest.getBlob('/api/preview/model'+action+'/'+this.parents[this.activeLayer])
        .then((response)=>{
          this.downloadFile.download(response);
        }).catch(()=>{})
      }else{
        this.sendRequest.get('/api/preview/model'+action+'/'+this.parents[this.activeLayer]+'/base64')
        .then((response)=>{
          this.downloadFile.downloadFileInAndroid(response);
        }).catch(()=>{})
      }
    }
  }


}
