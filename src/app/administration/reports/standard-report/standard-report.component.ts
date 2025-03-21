import { ChangeDetectionStrategy, Component, EventEmitter, inject, Injectable, Input, Output } from '@angular/core';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { ReportColumnInfoDTO } from '../../../model/ReportColumnInfoDTO';
import { SendRequestService } from '../../../services/send-request.service';
import { BehaviorSubject } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';
import { YesNoService } from '../../../services/yes-no.service';
import { DefaultParametersDialogComponent } from './default-parameters-dialog/default-parameters-dialog.component';
import { ChangeNameDialogComponent } from './change-name-dialog/change-name-dialog.component';

interface ReportColumnInfoNode{
  code:string;
  name:string;
  customName:string;
  modelColumnId:number;
  columnType:string;
  icon:string;
  sqlMetric:string;
  ordernum:number;
  sortDirection:string;
  searchOperation:string;
  columnFieldInfoDTO:any;
  defaultValue1:string;
  defaultValue2:string;
  level:number;
  expandable:boolean;
  children:ReportColumnInfoDTO[];
}

let map:Map<ReportColumnInfoNode,ReportColumnInfoDTO>=new Map();

@Injectable()
export class LoadmoreDatabase {

  dataChange = new BehaviorSubject<ReportColumnInfoDTO[]>([]);


  initialize(data:ReportColumnInfoDTO[]) {
    this.dataChange.next(data);
  }

  
}

@Component({
  selector: 'app-standard-report',
  templateUrl: './standard-report.component.html',
  styleUrl: './standard-report.component.css',
  providers: [LoadmoreDatabase]
})
export class StandardReportComponent {
  private _database = inject(LoadmoreDatabase);

  @Input() value:any;
  @Input() names:any;
  @Input() listModels:ComboboxDTO[]=[];
  @Input() listMetrics:ComboboxDTO[]=[];
  @Input() listSortDirection:ComboboxDTO[]=[];

  @Output() save:EventEmitter<any[]>=new EventEmitter();

  heightTree!:number;

  ngAfterContentInit(){
    var standardDiv:HTMLElement=document.getElementsByClassName('standardReportDiv')[0] as HTMLElement;
    this.heightTree=standardDiv.offsetHeight;
  }

  matricNames(sqlAction:any):string{
    let index=this.listMetrics.findIndex(a=>a.value==sqlAction);
    return this.listMetrics[index].option;
  }

  private _transformer = (node: ReportColumnInfoDTO, level: number) => {
    let nodeReport:ReportColumnInfoNode={
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      customName:node.customName,
      code: node.code,
      modelColumnId:node.modelColumnId,
      columnType:node.columnType,
      columnFieldInfoDTO:node.columnFieldInfoDTO,
      icon:node.icon,
      sqlMetric:node.sqlMetric,
      ordernum:node.ordernum,
      searchOperation:node.searchOperation,
      defaultValue1:node.defaultValue1,
      defaultValue2:node.defaultValue2,
      sortDirection:node.sortDirection,
      children:node.children,
      level: level
    }
    map.set(nodeReport,node);
    return nodeReport;
  };

  treeControl = new FlatTreeControl<ReportColumnInfoNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ReportColumnInfoNode) => node.expandable;
  translate:TranslatePipe=new TranslatePipe();

  stringList:ComboboxDTO[]=[];
  booleanList:ComboboxDTO[]=[];
  otherList:ComboboxDTO[]=[];
  insert:boolean=true;

  constructor(
    public checkMobile:CheckMobileService,
    public sendRequest:SendRequestService,
    public openDialog:OpenDialogService,
    public yesNoDialog:YesNoService
  ){

    let equals:ComboboxDTO=new ComboboxDTO();
    equals.value='equals';
    equals.option=this.translate.transform(equals.value);

    let contains:ComboboxDTO=new ComboboxDTO();
    contains.value='contains';
    contains.option=this.translate.transform(contains.value);

    let startswith:ComboboxDTO=new ComboboxDTO();
    startswith.value='startswith';
    startswith.option=this.translate.transform(startswith.value);

    let endswith:ComboboxDTO=new ComboboxDTO();
    endswith.value='endswith';
    endswith.option=this.translate.transform(endswith.value);

    let less:ComboboxDTO=new ComboboxDTO();
    less.value='less';
    less.option=this.translate.transform(less.value);

    let lessOrEquals:ComboboxDTO=new ComboboxDTO();
    lessOrEquals.value='lessOrEquals';
    lessOrEquals.option=this.translate.transform(lessOrEquals.value);

    let greater:ComboboxDTO=new ComboboxDTO();
    greater.value='greater';
    greater.option=this.translate.transform(greater.value);

    let greaterOrEquals:ComboboxDTO=new ComboboxDTO();
    greaterOrEquals.value='greaterOrEquals';
    greaterOrEquals.option=this.translate.transform(greaterOrEquals.value);

    let between:ComboboxDTO=new ComboboxDTO();
    between.value='between';
    between.option=this.translate.transform(between.value);

    this.stringList=[equals,contains,startswith,endswith];
    this.booleanList=[equals];
    this.otherList=[equals,less,lessOrEquals,greater,greaterOrEquals,between];

  }

  ngOnInit(){

    if(this.value.modelId==undefined){
      if(this.listModels.length>0){
        this.value.modelId=this.listModels[0].value;
        this.refreshModel(this.value.modelId);
      }
    }

    this.insert=this.value.id==0;

  }

  initchange:boolean=true;

  refreshModel(modelId:number){
    if(!this.initchange){
      this.value.columns=[];
      this.value.filters=[];
    }
   
    this.sendRequest.get('/api/report/tree/'+modelId).then
    ((response)=>{
      
      this._database.dataChange.subscribe(data => {
       
        map=new Map();
        this.dataSource.data = data;
        this.initchange=false;
        
      });
      this._database.initialize(response);
      
    }) .catch(()=>{})
  }

  deleteColumn(index:number){
    this.yesNoDialog.yesNo('yesNoDelete')
    .then(()=>{
      this.value.columns.splice(index,1);
    }).catch(()=>{})
    
  }

  addColumn(node:ReportColumnInfoNode){
    let column=JSON.parse(JSON.stringify(map.get(node)));
    this.value.columns.push(column);
  }

  addMetric(node:ReportColumnInfoNode,metric:string){
    let column=JSON.parse(JSON.stringify(map.get(node)));
    column!.sqlMetric=metric;
    this.value.columns.push(column);
  }


  openSort(index:number){

    let hasSort:boolean=this.hasSort(index);
    
    let sortValue:any={};
    let columncurrent:ReportColumnInfoDTO=this.value.columns[index];

    if(!hasSort){
      let columns:ReportColumnInfoDTO[]=this.value.columns;
      let list:any=columns.filter(a=>a.ordernum!=undefined).sort(a=>a.ordernum);

      if(list.length==0){
        sortValue.ordernum=1;
      }else{
        let column=list[list.length-1];
        sortValue.ordernum=(Number.parseInt(column.ordernum)+1);
      }
      
      sortValue.sortDirection='ASC';
    }else{
      

      sortValue.ordernum=columncurrent.ordernum;
      sortValue.sortDirection=columncurrent.sortDirection;
    }

    let titleSort=this.translate.transform('sort')+' - '+columncurrent.name;
    this.openDialog.openDialog(SortDialogComponent,300,[titleSort,sortValue,this.listSortDirection],true)
    .then((response)=>{
      
      columncurrent.ordernum=response.ordernum;
      columncurrent.sortDirection=response.sortDirection;
      
    }).catch(()=>{})

  }

  hasSort(index:number):boolean{
    let item:any=this.value.columns[index];

    if(item.ordernum==undefined){
      return false;
    }else{
      return true;
    }
  }

  matSortLabel(index:number){
    if(this.hasSort(index)){
      let columncurrent:ReportColumnInfoDTO=this.value.columns[index];
      return columncurrent.ordernum+' - '+columncurrent.sortDirection;
    }else{
      return this.translate.transform('sort');
    }
  }


  addFilter(node:ReportColumnInfoNode,searchOperation:string,sqlMetric:string|undefined){
    let column=JSON.parse(JSON.stringify(map.get(node)));
    column.searchOperation=searchOperation;
    column.sqlMetric=sqlMetric;

    this.value.filters.push(column);
  }

  deleteFilter(index:number){
    this.yesNoDialog.yesNo('yesNoDelete')
    .then(()=>{
      this.value.filters.splice(index,1);
    }).catch(()=>{})
    
  }

  hasDefaultValueFilter(index:number):boolean{
    let column:ReportColumnInfoDTO=this.value.filters[index];

    if(column.defaultValue1!=undefined){
      return true;
    }else{
      return false;
    }
  }

  createDefaultParameters(index:number){
    let column:ReportColumnInfoDTO=this.value.filters[index];

    let title=this.translate.transform('defaultParameter')+' - '+column.name;

    let value:any={};
    value.defaultValue1=column.defaultValue1==undefined?'':column.defaultValue1;
    value.defaultValue2=column.defaultValue2==undefined?'':column.defaultValue2;

    this.openDialog.openDialog(DefaultParametersDialogComponent,400,[title,value,column.searchOperation])
    .then((response)=>{
      column.defaultValue1=response.defaultValue1.length==0?undefined:response.defaultValue1;
      column.defaultValue2=response.defaultValue2.length==0?undefined:response.defaultValue2;
    }).catch(()=>{})
  }

  submit(){
    this.sendRequest.post('/api/report',this.value)
    .then((response)=>{
      this.save.emit([this.insert,response]);
    }).catch(()=>{})
  }

  changeName(type:string,index:number){
    let columncurrent:ReportColumnInfoDTO=new ReportColumnInfoDTO();

    if(type=='columns'){
      columncurrent=this.value.columns[index];
    }else{
      columncurrent=this.value.filters[index];
    }

    let currentName:string|undefined=columncurrent.customName==undefined?'':columncurrent.customName;

    this.openDialog.openDialog(ChangeNameDialogComponent,500,[currentName])
    .then((response)=>{
      if(response==undefined){
        currentName=undefined;
      }else{
        if(response.length==0){
          currentName=undefined;
        }else{
          currentName=response;
        }
      }

      columncurrent.customName=currentName!;
    }).catch(()=>{})

  }

}
