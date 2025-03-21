import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SendRequestService } from './services/send-request.service';
import { MenuDTO } from './model/MenuDTO';
import { TranslatePipe } from './pipes/translate.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Capacitor, CapacitorCookies } from '@capacitor/core';
import { environment } from '../environments/environment';
import { OpenDialogService } from './services/open-dialog.service';
import { ChangePassowrdDialogComponent } from './common-components/change-passowrd-dialog/change-passowrd-dialog.component';
import { SendInfoService } from './services/send-info.service';
import { UserDetailComponent } from './common-components/user-detail/user-detail.component';
import { DashboardDefaultData } from './model/DashboardDefaultData';
import { Platform } from '@angular/cdk/platform';
import { Preferences } from '@capacitor/preferences';
import { PushNotificationServiceService } from './services/push-notification-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Browser } from '@capacitor/browser';
import { DefaultSystemBrowserOptions, DefaultWebViewOptions, InAppBrowser } from '@capacitor/inappbrowser';
import { ReadCookieService } from './services/read-cookie.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Irm';

  loginPage: boolean = true;
  showMenu: boolean = true;
  menuLoad: boolean = true;

  listMenu: MenuDTO[] = [];

  translate: TranslatePipe = new TranslatePipe();
  exitLabel: string = '';
  changePasswordLabel:string='';
  userDetailLabel:string='';
  rootPage: boolean = false;
  isMobile: boolean = false;

  platform = inject(Platform);

  unreadMessages:number=0;

  hasDash:boolean=false;

  constructor(
    public router: Router,
    public activeRouter: ActivatedRoute,
    public sendRequest: SendRequestService,
    public deviceService: DeviceDetectorService,
    public openDialog:OpenDialogService,
    public sendInfo:SendInfoService,
    public pushNotification:PushNotificationServiceService,
    public http: HttpClient,
    public readCookie:ReadCookieService
  ) {
    this.isMobile = deviceService.isMobile();
    if (this.isMobile) {
      this.showMenu = false;
    }

    setInterval(()=>{
         if(!this.loginPage){
          this.checkNotification();
      }
    },5000);

    router.events.subscribe(r => {
      if (r instanceof NavigationEnd) {

        if (deviceService.isMobile()) {
          sessionStorage.setItem("mobile", "Y")
        } else {
          sessionStorage.setItem("mobile", "N");
        }

        sessionStorage.setItem('lang',this.readCookie.getCookie('lang'));

        this.exitLabel = this.translate.transform('exit');
        this.changePasswordLabel=this.translate.transform('changePassword');
        this.userDetailLabel=this.translate.transform('detail');
        this.loginPage = r.url == '/login';
        this.rootPage = r.url == '/';
        if(r.url == '/noright'){
          this.menuLoad=true;
        }

        this.checkPage();


      }
    })



  }

  checkNotification(){
    let url:string='';
          if (environment.production) {
            url= document.baseURI.substring(0, document.baseURI.toString().length - 1);
          } else {
            url= environment.api;
          }
          let header = {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }

          if(!this.loginPage){
            this.http.get(url + '/api/notification/count', { headers:header,withCredentials:true })
            .subscribe({
              next: ((response) => {
              let responseBody:any=response as any;
              this.unreadMessages=responseBody.count;
              }),
              error: (error => {
                let status: number = error.status;

                switch(status){
                  case 401:{
                    this.sendRequest.get('/api/login/logout')
                    .then(()=>{
                      this.router.navigate(['login'])
                    }).catch(()=>{})
                    break;
                  }
                  default:{
                    this.sendInfo.open(error);
                    break;
                  }
                }
               
              })
            });
          }

          
  }
         

  checkPage(){
    
    if(!this.loginPage){
      this.sendRequest.get('/api/session')
          .then(
            () => {
              if (this.menuLoad) {
                this.checkNotification();
                this.sendRequest.get('/api/menu')
                  .then(
                    (response) => {
                      this.listMenu = response;
                      this.menuLoad=false;

                      this.sendRequest.get('/api/menu/dashboard')
                      .then((responseDash)=>{
                        if(responseDash!=null){
                          DashboardDefaultData.hasDefault=true;
                          DashboardDefaultData.dashbordInfo=responseDash;
                          this.hasDash=true;
                        }else{
                          DashboardDefaultData.hasDefault=false;
                          DashboardDefaultData.dashbordInfo=undefined;
                          this.hasDash=false;
                        }
                      }).catch(()=>{})
                     
                    }
                  ).catch((error) => { })
              }
            }
          )
          .catch((error) => { })
    }
    
  }

  goToHome() {
    this.router.navigate(['']);
    this.menuClicked();
  }

  exit() {
    this.menuLoad = true;
   
    this.sendRequest.get('/api/login/logout')
    .then(()=>{
      this.router.navigate(['login'])
    }).catch(()=>{})


  }

  menuClicked() {
    if (this.isMobile) {
      this.showMenu = false;
    }
  }

  changePassword(){
    this.openDialog.openDialog(ChangePassowrdDialogComponent,400,[])
    .then(()=>{
      this.sendInfo.open('passwordIsChanged',false);
    }).catch(()=>{});

  }

  userDetail(){
    this.sendRequest.get('/api/appuser/userinfo')
    .then((response)=>{
      this.openDialog.openDialog(UserDetailComponent,400,[response])
      .then(()=>{}).catch(()=>{});
    }).catch(()=>{})


  }

}
