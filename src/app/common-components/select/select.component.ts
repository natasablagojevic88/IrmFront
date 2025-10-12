import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { OpenDialogService } from '../../services/open-dialog.service';
import { FindDialogComponent } from './find-dialog/find-dialog.component';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

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

  @ViewChild('searchInput') searchField!:ElementRef<HTMLInputElement>;
  @ViewChild('selectInput') selectInput!:MatSelect;

  showSearch:boolean=false;

  translate:TranslatePipe=new TranslatePipe();

  currentValue:any;

  myControl = new FormControl('');
  filteredOptions: Observable<ComboboxDTO[]>=new Observable();

  constructor(
    public openDialog:OpenDialogService
  ){

  }

   ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): ComboboxDTO[] {
    const filterValue = value.toLowerCase();

    return this.list.filter(option => option.option.toLowerCase().includes(filterValue));
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

  selectAutoCompete(event:any){
    this.currentValue=event.option.value.toString();
    this.exportValue.emit(this.currentValue);
    this.valueInput.emit(true);
    this.escapeSearchField();
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

  keyDownPressed(){
    this.myControl.setValue('');
    setTimeout(() => {
      this.searchField.nativeElement.focus();
    }, 1);
  }

  escapeSearchField(){
    this.showSearch=false;

    setTimeout(() => {
      this.selectInput._elementRef.nativeElement.click();
      this.selectInput.close();
    }, 1);
  }

  find(){
    if(this.showSearch){
      this.escapeSearchField();
    }
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

  checkKey(event:Event){
    let eventAny:any=event as any;
    if(eventAny.code=='Tab'){

      return;
    }else{
      event.stopPropagation();
      this.showSearch=!this.showSearch;
      this.keyDownPressed()
    }
  }
}
