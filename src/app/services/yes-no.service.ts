import { Injectable } from '@angular/core';
import { OpenDialogService } from './open-dialog.service';
import { YesNoDialogComponent } from '../common-components/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class YesNoService {

  constructor(
    public openDialog:OpenDialogService
  ) { }

  yesNo(text:string):Promise<Boolean>{
    return new Promise<Boolean>((resolve,reject)=>{
      this.openDialog.openDialog(YesNoDialogComponent,400,text)
      .then(
        (response)=>{
          resolve(true);
        }
      ).catch(error=>{reject(false)})
    }

    )
  }
}
