import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent {


  @Input() width=0;
  @Input() value:any='';
  @Input() label:string='';
  @Input() required:boolean=false;
  @Input() disabled:boolean=false;
  @Input() rows:number=2;

  @Output() exportValue:EventEmitter<any>=new EventEmitter<any>();
  @Output() valueInput:EventEmitter<boolean>=new EventEmitter<boolean>();

  currentValue:any;

  public translate: TranslatePipe=new TranslatePipe();
  constructor() {


  }

  formatData(inValue:any):string{
    let valueString:string=inValue.toString();
      
    let value=valueString.length==0?'':valueString;
    
    return value!;

  }


  ngOnInit(){
    
  }

  ngOnChanges(){
    
    let changedValue=this.value==undefined? '':this.formatData(this.value);
    if(changedValue!=this.currentValue){
      
      this.currentValue=changedValue;
      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
      }, 1);
      
    }

    
  }

  changeValue(changevalue:any){
    let value=changevalue.target.value==undefined?'':this.formatData(changevalue.target.value);
    
    setTimeout(() => {
      if(value!=this.currentValue){
        
        this.currentValue=value;
        this.exportValue.emit(this.currentValue);
        this.valueInput.emit(true);

      }
    }, 1);
  }
  

}
