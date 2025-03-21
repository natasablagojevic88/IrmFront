import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-default-parameters-dialog',
  templateUrl: './default-parameters-dialog.component.html',
  styleUrl: './default-parameters-dialog.component.css'
})
export class DefaultParametersDialogComponent {

  title:string='';
  value:any;
  searchOperation:string='';

  translate:TranslatePipe=new TranslatePipe();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any[],
    public dialogRef:MatDialogRef<DefaultParametersDialogComponent>
  ){
    this.title=data[0];
    this.value=data[1];
    this.searchOperation=data[2];
  }

  submit(){
    this.dialogRef.close(this.value);
  }

}
