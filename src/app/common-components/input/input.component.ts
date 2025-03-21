import { Component, EventEmitter, Input, Output, ɵgetEnsureDirtyViewsAreAlwaysReachable } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  
  @Input() width=0;
  @Input() type:string='text';
  @Input() value:any='';
  @Input() label:string='';
  @Input() required:boolean=false;
  @Input() disabled:boolean=false;

  @Output() exportValue:EventEmitter<any>=new EventEmitter<any>();
  @Output() valueInput:EventEmitter<boolean>=new EventEmitter<boolean>();

  datePipe:DatePipe=new DatePipe('en-US');

  currentValue:any;
  lang:any;

  public translate: TranslatePipe=new TranslatePipe();
  constructor() {


  }

  formatData(inValue:any):string{
    if(this.type=='datetime-local'){
      
      if(inValue instanceof Date){
        
        return this.datePipe.transform(inValue,"yyyy-MM-dd'T'HH:mm")!;
      }else{
        let valueString:string=inValue.toString();

        if(valueString.length>0){
          let date=Date.parse(valueString);
          valueString=this.datePipe.transform(date,"yyyy-MM-dd'T'HH:mm")!;
        }
      
        let value=valueString.length==0?null:valueString;
      
        return value!;
      }
      
    }else if(this.type=='text'||this.type=='password'){
      let valueString:string=inValue.toString();
      
      let value=valueString.length==0?'':valueString;
      
      return value!;
    }
    else{
      let valueString:string=inValue.toString();
      
      let value=valueString.length==0?null:valueString;
      
      return value!;
    }

  }

  formatUndefinedData(){
    if(this.type=='text'||this.type=='password'){
      return '';
    }else{
      
      return undefined;
    }
  }

  ngOnInit(){
    if(this.type=='number'){
      this.lang='en-US';

      if(sessionStorage.getItem("lang")!='enUS'){
        this.lang='sr-Latn'
      }
    }
  }

  ngOnChanges(){

    
    
    let changedValue=this.value==undefined? this.formatUndefinedData():this.formatData(this.value);
    if(changedValue!=this.currentValue){

      this.currentValue=changedValue;
      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
  
      }, 1);
      
    }

    
  }


  changeValue(changevalue:any){
    let value=changevalue.target.value==undefined?this.formatUndefinedData():this.formatData(changevalue.target.value);
    
    setTimeout(() => {
      if(value!=this.currentValue){
        
        this.currentValue=value;
        this.exportValue.emit(this.currentValue); 
        this.valueInput.emit(true);

      }
    }, 1);
  }
  
}
