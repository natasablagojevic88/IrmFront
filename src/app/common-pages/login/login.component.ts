import { Component, inject } from '@angular/core';
import { LoginDTO } from '../../model/LoginDTO';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SendRequestService } from '../../services/send-request.service';
import { ComboboxDTO } from '../../model/ComboboxDTO';
import { Router } from '@angular/router';
import { CapacitorCookies } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@angular/cdk/platform';
import { PushNotificationServiceService } from '../../services/push-notification-service.service';
import { JSEncrypt } from 'jsencrypt';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  value:LoginDTO=new LoginDTO();
  translate:TranslatePipe=new TranslatePipe();

  lang:ComboboxDTO[]=[]

  publicKey:string='';

  platform = inject(Platform);

  constructor(
    public sendRequest:SendRequestService,
    public router:Router,
    public pushNot:PushNotificationServiceService
  ){

  }

  ngOnInit(){

    this.sendRequest.get('/api/login/addsession')
    .then((response)=>{

      this.publicKey='-----BEGIN PUBLIC KEY-----'+response.publicKey+'-----END PUBLIC KEY-----';


      this.sendRequest.get('/api/login')
    .then(
      (response)=>{
        this.lang=response;
        

        if(this.lang.length>0){
          this.value.language=this.lang[0].value;
        }
        
    }
    ).catch(()=>{})
    }).catch(()=>{})
   
    
  }

  enter(){

  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(this.publicKey);
  this.value.encyptPassword=encryptor.encrypt(this.value.password) as string;
  this.sendRequest.post('/api/login',this.value)
    .then(
      ()=>{

        if(this.platform.ANDROID&&environment.pushNotification){
          this.pushNot.register();
        }


        this.router.navigate([""]);
      }
    ).catch((error)=>{})
   
  }

}
