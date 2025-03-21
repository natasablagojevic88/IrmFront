import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { OpenDialogService } from '../../services/open-dialog.service';
import { FindDialogComponent } from './find-dialog/find-dialog.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() list:ComboboxDTO[]=[]
  @Input() width=0;
  @Input() value:any='';
  @Input() label:string='';
  @Input() required:boolean=false;
  @Input() disabled:boolean=false;
  @Input() icon:boolean=false;
  @Input() searchApi:string='';
  @Input() hasClear:boolean=false;

  @Output() exportValue:EventEmitter<any>=new EventEmitter<any>();
  @Output() valueInput:EventEmitter<boolean>=new EventEmitter<boolean>();


  translate:TranslatePipe=new TranslatePipe();

  currentValue:any;

  constructor(
    public openDialog:OpenDialogService
  ){

  }


  ngOnChanges(){

    this.list.forEach((l)=>{
      l.value=l.value.toString();
    });
   
    let changedValue=(this.value==undefined?null:this.value.toString());
    
    if(changedValue!=this.currentValue){
      this.currentValue=changedValue;
      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
      }, 1);

    }
    
  }

  changeValue(event:any){
   setTimeout(() => {
    let changevalue:any=event==undefined?null:event.toString();
    if(changevalue!=this.currentValue){
      this.currentValue=changevalue;
      this.exportValue.emit(this.currentValue);
      this.valueInput.emit(true);
    }
   }, 1);
  }


  find(){
    this.openDialog.openDialog(FindDialogComponent,1000,this.searchApi,false)
    .then((response)=>{
      setTimeout(() => {
        let changevalue:any=response==undefined?null:response.toString();
        if(changevalue!=this.currentValue){
          this.currentValue=changevalue;
          this.exportValue.emit(this.currentValue);
          this.valueInput.emit(true);
        }
       }, 1);
    })
    .catch(()=>{})
  }

}
