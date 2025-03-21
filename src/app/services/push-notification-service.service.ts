import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationServiceService {

  constructor() { }

  public activate(){

    
    
    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
     
    }

    PushNotifications.createChannel({
      id: 'default_channel_id',
      name: 'default_channel_id'
    }).then(()=>{


 
    })

  }

  public register(){
    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();
    
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
    
      await PushNotifications.register().then(()=>{
        PushNotifications.createChannel({
          id: environment.pushNotifictionChannel,
          name: environment.pushNotifictionChannel
        }).then(()=>{
          
     
        }).catch((error)=>{});
      
      }).catch((error)=>{});
    }
    registerNotifications();

  }
}
