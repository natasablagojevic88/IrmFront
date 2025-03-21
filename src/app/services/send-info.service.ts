import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslatePipe } from '../pipes/translate.pipe';

@Injectable({
  providedIn: 'root'
})
export class SendInfoService {
  private _snackBar = inject(MatSnackBar);
  translate:TranslatePipe=new TranslatePipe();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  open(text:string,error:boolean=true){
    this._snackBar.open(this.translate.transform(text), 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:2500,
      panelClass:error?'infoErrorClass':'infoInfoClass'
    });
  }
}
