import { ChangeDetectionStrategy, Component, inject, Injectable, model } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { ModelDTO } from '../../model/ModelDTO';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { SendInfoService } from '../../services/send-info.service';
import { OpenDialogService } from '../../services/open-dialog.service';
import { ModelingDialogComponent } from './modeling-dialog/modeling-dialog.component';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { MatTableDataSource } from '@angular/material/table';
import { YesNoService } from '../../services/yes-no.service';
import { HistoryComponent } from '../../common-components/history/history.component';
import { ColumnListComponent } from './column-list/column-list.component';
import { TriggerListComponent } from './trigger-list/trigger-list.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TableButton } from '../../model/TableButton';
import { ListJasperReportsComponent } from './list-jasper-reports/list-jasper-reports.component';
import { JobsListComponent } from '../reports/jobs-list/jobs-list.component';


class ModelFlatNode {
  expandable!: boolean;
  id!: number;
  code!: string;
  name!: string;
  type!: string;
  numericCode!: boolean;
  icon!: string;
  parentId!: number;
  previewRoleId!: number;
  updateRoleId!: number;
  lockRoleId!: number;
  unlockRoleId!: number;
  dialogWidth!:number;
  columnsNumber!:number;
  tableWidth!:number;
  level!: number;

}

let modelMap: Map<ModelFlatNode, ModelDTO> = new Map();
let dataSource: MatTableDataSource<ModelDTO> = new MatTableDataSource();

@Injectable()
export class LoadmoreDatabase {

  dataChange = new BehaviorSubject<ModelDTO[]>([]);

  initialize() {
    this.dataChange.next(dataSource.data);
  }


  addItem(parent: ModelDTO, child: ModelDTO) {

    parent.children.push(child);
    dataSource._updateChangeSubscription();

    this.dataChange.next(dataSource.data);

  }

  parentFound: ModelDTO = new ModelDTO;

  editItem(item: ModelDTO){
    this.parentFound = new ModelDTO();
    this.findParent(dataSource.data[0],item.id!);
   
    let index=this.parentFound.children.findIndex(a=>a.id==item.id);

    this.parentFound.children[index]=item;
    
    dataSource._updateChangeSubscription();
    this.dataChange.next(dataSource.data);
    
  }

  deleteItem(item: ModelDTO) {


    this.parentFound = new ModelDTO();

    this.findParent(dataSource.data[0], item.id);

    let index = this.parentFound.children.map(a => a.id).findIndex(a => a == item.id);
    this.parentFound.children.splice(index, 1);
    dataSource._updateChangeSubscription();
    this.dataChange.next(dataSource.data);

  }


  findParent(item: ModelDTO, id: number) {
    let found: boolean = false;

    item.children.forEach(C => {
      if (C.id == id) {
        this.parentFound = item;
        found = true;
      }

      if (!found) {
        this.findParent(C, id);
      }
    });


  }

}

@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrl: './modeling.component.css',
  providers: [LoadmoreDatabase],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelingComponent {
  [x: string]: any;

  private _database = inject(LoadmoreDatabase);


  clickedRows = new Set<ModelFlatNode>();
  clickedId = new Set<number>();

  title: string = 'modeling';

  model: ModelDTO = new ModelDTO();

  expanded = new Set<number>();

  refreshModelLabel:string='';
  refreshFinished:string='';


  constructor(
    public sendRequest: SendRequestService,
    public sendInfo: SendInfoService,
    public openDialog: OpenDialogService,
    public yesNoService:YesNoService,
    public translate: TranslatePipe
  ) {
    const _database = this._database;


  }

  clickNode(node:ModelFlatNode){
    this.clickedRows.clear();
    this.clickedRows.add(node);

    this.clickedId.clear();
    this.clickedId.add(node.id);
  }

  titleOFDialog: string = '';
  names: any;
  listTypes: ComboboxDTO[] = []
  listIcons: ComboboxDTO[] = []
  listRoles: ComboboxDTO[] = []

  jasperReportsTitle:string='';


  refreshButton:TableButton={
    code: 'refreshModel',
    icon: 'fa fa-refresh',
    name: this.refreshModelLabel,
    color: 'red'
  }

  refreshJasperButton:TableButton={
    code: 'refreshJasperFiles',
    icon: 'fa fa-refresh',
    name: 'refreshJasperFiles',
    color: 'red'
  }

  ngOnInit() {

    this.sendRequest.get('/api/model/tree')
      .then((response) => {
        this.model = response;
        dataSource = new MatTableDataSource([this.model]);
        this.dataSourceTree.data=dataSource.data;

        this._database.dataChange.subscribe(data => {
          if (data.length > 0) {
            modelMap = new Map();
            this.dataSourceTree.data=data;
            

            let newExpanded: number[] = [];

            this.treeControl.dataNodes.filter(a => this.expanded.has(a.id)).forEach(d => {
              if (d.expandable) {
                this.treeControl.expand(d);
                newExpanded.push(d.id);
              }
            });

            if (this.clickedRows.size > 0) {

              let selectedFlat: ModelFlatNode;

              this.clickedRows.forEach((C) => { selectedFlat = C });

              this.clickedRows.clear();
              this.clickedId.clear();

              this.treeControl.dataNodes.filter(d => d.id == selectedFlat.id).forEach(
                C => {
                  this.clickedRows.add(C);
                  this.clickedId.add(C.id);
                  
                  if (C.expandable) {
                    this.treeControl.expand(C);
                    this.expanded.add(C.id);
                    newExpanded.push(C.id);
                  }
                }
              )
            }

            this.expanded.clear();
            newExpanded.forEach(n => { this.expanded.add(n) });

          }
        });

        this._database.initialize();
      }).catch(() => { })

    this.sendRequest.resource('ModelDTO.title').then(
      (response) => { this.titleOFDialog = response }
    ).catch(() => { })

    this.sendRequest.resource('refreshModel').then(
      (response) => { this.refreshModelLabel = response;this.refreshButton.name=response; }
    ).catch(() => { })

    this.sendRequest.resource('refreshModelFinished').then(
      (response) => { this.refreshFinished=response;}
    ).catch(() => { })

    this.sendRequest.get("/api/session/names/rs.irm.administration.dto.ModelDTO")
      .then((response) => { this.names = response }).catch(() => { })

    this.sendRequest.get('/api/session/enumbox/rs.irm.administration.enums.ModelType')
      .then((response) => { this.listTypes = response }).catch(() => { })

    this.sendRequest.get('/api/model/icons')
      .then((response) => { this.listIcons = response }).catch(() => { })

    this.sendRequest.get('/api/model/roles')
      .then((response) => { this.listRoles = response }).catch(() => { })

      this.sendRequest.resource('ModelJasperReportDTO.title')
      .then((response) => { this.jasperReportsTitle = response }).catch(() => { })
    
  

  }


  private _transformer = (node: ModelDTO, level: number) => {
    let modelFlatNode: ModelFlatNode = {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      code: node.code,
      type: node.type,
      icon: node.icon,
      numericCode: node.numericCode,
      parentId: node.parentId!,
      previewRoleId: node.previewRoleId,
      updateRoleId: node.updateRoleId,
      lockRoleId: node.lockRoleId,
      unlockRoleId: node.unlockRoleId,
      dialogWidth: node.dialogWidth,
      columnsNumber: node.columnsNumber,
      tableWidth: node.tableWidth,
      level: level,

    }
    modelMap.set(modelFlatNode, node);
    return modelFlatNode;
  };


  treeControl = new FlatTreeControl<ModelFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSourceTree= new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ModelFlatNode) => node.expandable;

  checkExpand(event: any) {

    if (this.treeControl.isExpanded(event)) {
      if (!this.expanded.has(event.id)) {
        this.expanded.add(event.id);
      }

    } else {
      if (this.expanded.has(event.id)) {
        this.expanded.delete(event.id);
      }
    }

  }

  add() {

    if (this.clickedRows.size == 0) {
      this.sendInfo.open('itemMustBeSelected');
      return;
    }

    let selectedNode: ModelFlatNode = new ModelFlatNode();

    this.clickedRows.forEach(a => { selectedNode = a; });

    let value: ModelDTO = new ModelDTO();
    value.id = 0;
    value.type = selectedNode.type == 'TABLE' ? 'TABLE' : 'MENU';
    value.numericCode = true;
    value.tableWidth=0;
    
    value.parentId = selectedNode.id == -1 ? undefined : selectedNode.id;
    if(this.listRoles.length>0){
      value.previewRoleId=selectedNode.previewRoleId!=undefined? selectedNode.previewRoleId: this.listRoles[0].value;
      value.updateRoleId=selectedNode.updateRoleId!=undefined? selectedNode.updateRoleId: this.listRoles[0].value;
      value.lockRoleId=selectedNode.lockRoleId!=undefined? selectedNode.lockRoleId: this.listRoles[0].value;
      value.unlockRoleId=selectedNode.unlockRoleId!=undefined? selectedNode.unlockRoleId: this.listRoles[0].value;
    }
    if (this.listIcons.length > 0) {
      value.icon = this.listIcons[0].value;
    }


    this.openDialog.openDialog(ModelingDialogComponent, 700, [value, this.titleOFDialog, this.names, this.listTypes, this.listIcons, this.listRoles])
      .then((response)=>{
        this._database.addItem( modelMap.get(selectedNode)!,response);
      })
      .catch(() => { })

  }

  edit(node: ModelFlatNode) {
    let value=JSON.parse(JSON.stringify(modelMap.get(node)));

    this.openDialog.openDialog(ModelingDialogComponent, 700, [value, this.titleOFDialog, this.names, this.listTypes, this.listIcons, this.listRoles])
      .then((response)=>{
        this._database.editItem(response);
      })
      .catch(() => { })
  }

  delete(node: ModelFlatNode) {

    let model:ModelDTO=modelMap.get(node)!;

    this.yesNoService.yesNo('yesNoDelete')
        .then(
          () => {
            this.sendRequest.delete('/api/model/' + model.id)
              .then(
                () => {
                  this.sendInfo.open('itemDeleted', false);

                  this._database.deleteItem(model);

                }
              ).catch(error => { })
          }
        ).catch((error) => { })



  }

  history(node: ModelFlatNode) {

    let model:ModelDTO=modelMap.get(node)!;

    this.openDialog.openDialog(HistoryComponent, 700, ['model', model.id], false)
      .then(() => { }).catch(() => { })
  }

  columns(node: ModelFlatNode) {

    this.openDialog.openDialog(ColumnListComponent,1000,[node],false)
    .then(()=>{}).catch(()=>{})
  }

  triggers(node: ModelFlatNode) {

    this.openDialog.openDialog(TriggerListComponent,1000,[node],false)
    .then(()=>{}).catch(()=>{})
  }

  addButtonClicked(event:any){
    if (event=='refreshModel'){
      this.refreshModel();
    }else if (event=='refreshJasperFiles'){
      this.refreshJasperFiles();
    }
  }

  refreshModel(){
    this.sendRequest.get('/api/model/refresh')
    .then(()=>{ 
      this.sendInfo.open(this.refreshFinished,false);
    }).catch(()=>{})
  }

  refreshJasperFiles(){
    this.yesNoService.yesNo('refreshJasperFilesYesNo')
    .then(()=>{
      this.sendRequest.get('/api/model/refreshjasperfiles')
      .then(()=>{
        this.sendInfo.open('refreshJasperFilesFinished',false);
      })
      .catch(()=>{})
    }).catch(()=>{})
  }

  showJasperReports(node:ModelFlatNode){
    let model:ModelDTO=modelMap.get(node)!;

    this.openDialog.openDialog(ListJasperReportsComponent,900,[model,this.jasperReportsTitle],false)
    .then(()=>{}).catch(()=>{})

  }

  showJobs(node:ModelFlatNode){
    let model:ModelDTO=modelMap.get(node)!;

    this.openDialog.openDialog(JobsListComponent,1000,[{},model,true],false)
       .then(()=>{}).catch(()=>{})

  }

}
