import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDTO } from '../model/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(
    public matDialog:MatDialog
  ) { }

  openDialog(component:ComponentType<any>, width:number, data:any, focus:boolean=true):Promise<any>{
    return new Promise<any>((resolve,reject)=>{
      let dialogRef=this.matDialog.open(component,
        {
          width: width+'px',
          data:data,
          autoFocus: focus
        }
      );

      dialogRef.afterClosed().subscribe(
        {
          next:(response:any)=>{
            if(response!=undefined){
              resolve(response);
            }else{
              reject();
            }
          }
        }
      )

      
    });
    
  }
}
