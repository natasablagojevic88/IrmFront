import { Injectable } from '@angular/core';
import { TableParameterDTO } from '../model/TableParameterDTO';
import { TableFilter } from '../model/TableFilter';
import { SendRequestService } from './send-request.service';
import { ModelDTO } from '../model/ModelDTO';
import { CreateGridService } from './create-grid.service';
import { CreateDataDialogComponent } from '../preview/preview-model/create-data-dialog/create-data-dialog.component';
import { OpenDialogService } from './open-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewInfoCodebookService {

  constructor(
    public sendRequest:SendRequestService,
    public createGrid:CreateGridService,
    public openDialog:OpenDialogService
  ) { }

  public preview(modelId:number,codebook:string,id:number){
    let tableParameters: TableParameterDTO = new TableParameterDTO();

    let tableFilter: TableFilter = new TableFilter();
    tableFilter.field = "id";
    tableFilter.parameter1 = id;
    tableFilter.searchOperation = 'equals';
    tableParameters.tableFilters.push(tableFilter);

    this.sendRequest.post('/api/preview/model/codebooks/table/' + modelId + '/' + codebook + '/-1', tableParameters)
      .then((response) => {

        let model: ModelDTO = response.model;
        let fields: any[] = response.fields;
        let mapFields: any[][] = this.createGrid.calculateGrid(model, fields);
        let parentId: number = -1;
        let disabledItems: boolean = true;

        this.sendRequest.get('/api/preview/model/codebooks/' + model.id)
          .then((responseCodebook) => {

            let codebook: any = responseCodebook;

            this.sendRequest.post('/api/preview/model/codebookdisabled/'+model.id,response.list[0])
            .then((responseDisabledCodebook)=>{
        
              let codebookItem:any=JSON.parse(JSON.stringify(codebook));
        
              let codebookStrings:string[]=Object.keys(responseDisabledCodebook);
        
              for(let i=0;i<codebookStrings.length;i++){
                let codebookString=codebookStrings[i];
        
                codebookItem[codebookString]=responseDisabledCodebook[codebookString];
              }
        
              this.openDialog.openDialog(CreateDataDialogComponent, model.dialogWidth, [mapFields, response.list[0], model.columnsNumber, codebookItem, model.id, parentId, disabledItems])
              .then(() => {
              }).catch(() => { })
          }).catch(() => { })
            }).catch(()=>{})

            

      }).catch(() => { })
  }
}
