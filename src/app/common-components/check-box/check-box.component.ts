import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.css'
})
export class CheckBoxComponent {

  @Input() width=0;
  @Input() value:any=true;
  @Input() label:string='';
  @Input() disabled:boolean=false;

  @Output() exportValue:EventEmitter<any>=new EventEmitter<any>();
  @Output() valueInput:EventEmitter<boolean>=new EventEmitter<boolean>();

  public translate:TranslatePipe=new TranslatePipe();

  currentValue:any;

  ngOnChanges(){

    let changedValue=this.value==undefined?null:this.value.toString();

    if(this.currentValue!=changedValue){
      this.currentValue=changedValue;

      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
      }, 1);
    }
  }

  changeValue(event:any){
    let changeValue=event==undefined?null:event.checked.toString();
    if(this.currentValue!=changeValue){
      this.currentValue=changeValue;

      setTimeout(() => {
        this.exportValue.emit(this.currentValue);
        this.valueInput.emit(true);
      }, 1);
    }
  }

}
