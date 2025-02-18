import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, 
         PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { AuthServiceProxy } from '../school-api-service';

export const FCM_TOKEN = 'push_notification_token';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private _redirect = new BehaviorSubject<any>(null);

  get redirect() {
    return this._redirect.asObservable();
  }

  constructor(
    private storage: StorageService,
    private AuthService:AuthServiceProxy

  ) { }

  

   async registerPush() {
    try {
      await this.addListeners();
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    } catch(e) {
      console.log(e);
    }
  }

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  addListeners() {
    PushNotifications.addListener(
      'registration',
      async(token: Token) => {
       
        this.AuthService.saveFCMToken(token?.value).subscribe(result=>{
          console.log("saved_token"+token?.value);
        });

      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        const data = notification?.data;
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification:ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        console.log('push data: ', data);
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );
  }

  async removeFcmToken() {
    try {
      const saved_token = JSON.parse((await this.storage.getStorage(FCM_TOKEN)).value);
      this.storage.removeStorage(saved_token);
    } catch(e) {
      console.log(e);
      throw(e);
    }

  }

  async removeAllListener(){
    if(Capacitor.getPlatform() !== 'web') {
      await PushNotifications.removeAllListeners();
    }
    
  }

  async clearFCMTokenAndRemoveListener(){
      await this.removeFcmToken();
      await this.removeAllListener();
  }

}
