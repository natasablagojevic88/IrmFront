import { Component, EventEmitter, inject, Input, Output, output, ViewChild } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.css'
})
export class DialogHeaderComponent {

  @Input() title:string='';
  @Input() yesNoDialog:boolean=false;
  @Input() showSubmit:boolean=true;
  readonly dialogRef = inject(MatDialogRef<any>);

  @Output() submitExport:EventEmitter<boolean>=new EventEmitter();


  public translate:TranslatePipe=new TranslatePipe();

  constructor(
  ){
    
  }

  ngOnInit(){
  }

  submitForm(){
    this.submitExport.emit(true);
  }

  exit(){
    this.dialogRef.close();
  }

}
