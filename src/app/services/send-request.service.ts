import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SendInfoService } from './send-info.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerComponent } from '../common-components/progress-spinner/progress-spinner.component';
import { CapacitorCookies } from '@capacitor/core';
import { Platform } from '@angular/cdk/platform';
import { ReadCookieService } from './read-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {


  platform = inject(Platform);
  constructor(
    public http: HttpClient,
    public router: Router,
    public sendInfo: SendInfoService,
    public matDialog: MatDialog,
    public readCookie:ReadCookieService
  ) { }

  public get(api: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      let dialogRef = this.progressDialog();

      this.http.get(this.url() + api, { headers: this.httpHeader(),withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }

  public getBlob(api: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      let dialogRef = this.progressDialog();

      this.http.get(this.url() + api, { headers: this.httpHeader(), responseType: 'blob', observe: 'response',withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }

  public post(api: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let dialogRef = this.progressDialog();
      this.http.post(this.url() + api, body, { headers: this.httpHeader(),withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }

  public delete(api: string): Promise<any> {
    let dialogRef = this.progressDialog();
    return new Promise<any>((resolve, reject) => {
      this.http.delete(this.url() + api, { headers: this.httpHeader(),withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }

  public resource(text: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      this.http.get(this.url() + '/api/session/resources/' + text, { headers: this.httpHeader(), responseType: 'text',withCredentials:true })
        .subscribe({
          next: ((response) => {
            resolve(response);
          }),
          error: (error => {
            this.errorHandler(error);
            reject(text);
          })
        }

        )
    });
  }

  public postBlob(api: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let dialogRef = this.progressDialog();
      this.http.post(this.url() + api, body, { headers: this.httpHeader(), responseType: 'blob', observe: 'response',withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }


  private url(): string {
    if (environment.production) {
      return document.baseURI.substring(0, document.baseURI.toString().length - 1);
    } else {
      return environment.api;
    }

  }

  public postFile(api: string, file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let dialogRef = this.progressDialog();
      this.http.post(this.url() + api, file, { headers: this.httpHeader(true,file.name),withCredentials:true })
        .subscribe({
          next: ((response) => {
            dialogRef.close();
            resolve(response);
          }),
          error: (error => {
            dialogRef.close();
            this.errorHandler(error);
            reject(error.error);
          })
        }

        )
    });
  }


  private httpHeader(sendFile:Boolean=false,fileName:string=''): any {
    let header: any = {}

    if(!sendFile){
      header = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    }else{
      header = {
        'Content-Type': 'application/octet-stream',
        'Accept': '*/*'
      }
    }

   


    return header;
  }

  private errorHandler(error: any) {
    let status: number = error.status;

    switch (status) {
      case 401: {
        
        this.get('/api/login/logout')
        .then(()=>{
          this.router.navigate(['login'])
        }).catch(()=>{})
          
        break;
      }
      case 403: {

        this.router.navigate(['noright']);
        break;
      }
      default: {
        this.sendInfo.open(error.error.message, true);
        break;
      }
    }

  }

  private progressDialog(): MatDialogRef<ProgressSpinnerComponent> {

    return this.matDialog.open(ProgressSpinnerComponent, {
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'transparent-dialog-panel',
       backdropClass: 'transparent-backdrop',
    });
  }


}
