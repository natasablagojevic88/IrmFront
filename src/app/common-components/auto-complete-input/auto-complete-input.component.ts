import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrl: './auto-complete-input.component.css'
})
export class AutoCompleteInputComponent {

  @Input() label: string = '';
  @Input() comboboxes: any[] = [];
  @Input() value: string ='';

  selectedValue:string='';

  @Output() exportValue:EventEmitter<string>=new EventEmitter<string>();

  myControl = new FormControl('');
  filteredOptions: Observable<any[]> = new Observable();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    
    const filterValue = value.toLowerCase();

    return this.comboboxes.filter(item => item.option.toLowerCase().includes(filterValue));
  }

  change(value: any) {
    this.exportValue.emit(value==undefined?'':value.option.value);
  }

  ngOnChanges(){
    if(this.selectedValue!=this.value){
      this.selectedValue=this.value;
       this.myControl.setValue(this.selectedValue);
    }
    
  }

  displayFn = (val: any): string => {
    if(val==undefined){
      return '';
    }else{
      return this.comboboxes.filter(item => item.value==val)[0].option;
    }
   
  }
}
