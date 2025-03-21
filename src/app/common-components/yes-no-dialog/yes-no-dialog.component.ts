import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.css'
})
export class YesNoDialogComponent {

  translate:TranslatePipe=new TranslatePipe();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:string
  ){

  }

}
