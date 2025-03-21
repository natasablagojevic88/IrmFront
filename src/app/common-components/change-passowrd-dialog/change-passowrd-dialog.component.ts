import { Component } from '@angular/core';
import { SendInfoService } from '../../services/send-info.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SendRequestService } from '../../services/send-request.service';

@Component({
  selector: 'app-change-passowrd-dialog',
  templateUrl: './change-passowrd-dialog.component.html',
  styleUrl: './change-passowrd-dialog.component.css'
})
export class ChangePassowrdDialogComponent {

  password1:string='';
  password2:string='';

  constructor(
    public sendInfo:SendInfoService,
    public matDialog:MatDialogRef<ChangePassowrdDialogComponent>,
    public sendRequest:SendRequestService
  ){

  }

  submit(){

    if(this.password1.length==0){
      return;
    }

    if(this.password2.length==0){
      return;
    }

    if(this.password1!=this.password2){
      this.sendInfo.open('passwordNotMatching');
      return;
    }

    let changePasswordDTO:any={};
    changePasswordDTO.password=this.password1;

    this.sendRequest.post('/api/appuser/changepassword',changePasswordDTO)
    .then(()=>{
      this.matDialog.close(true);
    }).catch(()=>{});
   
  }
}
