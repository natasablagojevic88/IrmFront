import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

  @Input() width=0;
  @Input() type:string='text';
  @Input() value:Date=new Date();
  @Input() label:string='';
  @Input() required:boolean=false;
  @Input() disabled:boolean=false;

  public translate:TranslatePipe=new TranslatePipe();
  public dateFormater:DatePipe=new DatePipe('en-US');

  @Output() exportValue:EventEmitter<any>=new EventEmitter<any>();
  @Output() valueInput:EventEmitter<boolean>=new EventEmitter<boolean>();

  currentValue:any;

  dateFormat:string='yyyy-MM-dd';

  ngOnChanges(){
    
    let changedValue=this.value==undefined?null: this.dateFormater.transform(this.value,this.dateFormat);
    if(changedValue!=this.currentValue){
      this.currentValue=changedValue;
      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
      }, 1);
    }

    
  }

  changed(event:any){
    
    let chageValue:Date=event.value==undefined?null:event.value;

    let currentValueString=chageValue==undefined?null:this.dateFormater.transform(chageValue,this.dateFormat);

    setTimeout(() => {

      if(currentValueString!=this.currentValue){
        this.currentValue=currentValueString;
        this.exportValue.emit(this.currentValue);
        this.valueInput.emit(true);
      }

      
    }, 1);

  }

}
