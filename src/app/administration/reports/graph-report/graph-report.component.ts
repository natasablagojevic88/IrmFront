import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckMobileService } from '../../../services/check-mobile.service';
import { SendRequestService } from '../../../services/send-request.service';
import { OpenDialogService } from '../../../services/open-dialog.service';
import { YesNoService } from '../../../services/yes-no.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ComboboxDTO } from '../../../model/ComboboxDTO';
import { FilterGraphDialogComponent } from './filter-graph-dialog/filter-graph-dialog.component';

@Component({
  selector: 'app-graph-report',
  templateUrl: './graph-report.component.html',
  styleUrl: './graph-report.component.css'
})
export class GraphReportComponent {
  @Input() value: any;
  @Input() names: any;
  @Input() graphTypes: ComboboxDTO[]=[];
  @Input() columnTypes: ComboboxDTO[]=[];

  @Output() save: EventEmitter<any[]> = new EventEmitter();
  translate: TranslatePipe = new TranslatePipe();
  insert:boolean=true;

  heightTree!:number;

  filterNames:any={}

  graphInstractions:string='';

  file:File|undefined;

  constructor(public checkMobile: CheckMobileService,
    public sendRequest: SendRequestService,
    public openDialog: OpenDialogService,
    public yesNoDialog: YesNoService) {

      this.sendRequest.get('/api/session/names/rs.irm.administration.dto.ReportColumnInfoDTO')
      .then((response)=>{
        this.filterNames=response;
      }).catch(()=>{})

     

  }

  ngAfterContentInit(){
    var standardDiv:HTMLElement=document.getElementsByClassName('standardReportDiv')[0] as HTMLElement;
    this.heightTree=standardDiv.offsetHeight;
  }

  ngOnInit(){

    let infoString:string='';
    if(this.value.type=='GRAPH'){
      infoString='graphInfo';
    }else if(this.value.type=='SQL'){
      infoString='sqlInfo';
    }else if(this.value.type=='KPI'){
      infoString='kpiInfo';
    }else if(this.value.type=='JASPER'){
      infoString='sqlInfo';
    }else if(this.value.type=='EXECUTE'){
      infoString='sqlInfo';
    }

    this.sendRequest.resource(infoString)
    .then((response)=>{
      this.graphInstractions=response;
    }).catch(()=>{})

    this.insert=this.value.id==0;

    if(this.value.graphType==undefined&&this.value.type=='GRAPH'){
      if(this.graphTypes.length>0){
        this.value.graphType=this.graphTypes[0].value;
      }
    }
  }

  addFilter(){
    let value:any={};
    this.openDialog.openDialog(FilterGraphDialogComponent,500,[value,this.filterNames,this.columnTypes])
    .then(response=>{
      this.value.filters.push(response);
    }).catch(()=>{})  
  }

  editFilter(index:number){
    let value=this.value.filters[index];
    value=JSON.parse(JSON.stringify(value));
    this.openDialog.openDialog(FilterGraphDialogComponent,500,[value,this.filterNames,this.columnTypes])
    .then(response=>{
      this.value.filters[index]=response;
    }).catch(()=>{})  
  }

  deleteFilter(index:number){
    this.yesNoDialog.yesNo('yesNoDelete')
    .then(()=>{
      this.value.filters.splice(index,1);
    }).catch(()=>{})
  }

  submit(){

    this.sendRequest.post('/api/report',this.value)
    .then((response)=>{
      this.save.emit([this.insert,response]);
    }).catch(()=>{})

  }



  uploadFile(event:any){
    let inFile:File=event.target.files[0];

    this.sendRequest.postFile('/api/model/uploadfile',inFile)
    .then((response)=>{
      this.file=inFile;
      this.value.fileName=this.file.name;
      this.value.filePath=response.path;
    }).catch(()=>{})
    

  }
}
