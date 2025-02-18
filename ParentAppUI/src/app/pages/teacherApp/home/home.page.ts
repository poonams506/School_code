import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { SchoolServiceProxy } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { FcmService } from 'src/app/services/fcm/fcm.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  canDismiss = false;
  presentingElement = null;
  title = "Home"

  content_loaded: boolean = false;
  isAppAccessible:boolean=true;
  toastButtons = [
    {
      text: 'Dismiss',
    },
  ];

  constructor(    public translate: TranslateService, public commonMethod :CommonMethodService,
    private platform: Platform, public schoolService:SchoolServiceProxy,
    private fcmService:FcmService
    ) {}

    
     ionViewDidEnter() {
      this.commonMethod.setHeaderTitle('Home');
      this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(async () => {
        if (this.platform.is('android') || this.platform.is('ios')){
        await  this.checkForUpdate();
     }
        
      });
    }
  
    async checkForUpdate() {
      if(Capacitor.getPlatform() !== 'web') {
        await this.fcmService.clearFCMTokenAndRemoveListener();
        await this.fcmService.registerPush();
      }
      this.schoolService.getCurrentSchoolAppVersion().subscribe(result=>{
        if(environment.APP_VERSION===result.configurationValue && result.isUpdateCheck == true)
          {
            this.isAppAccessible=true;
          }
          else if(result.isUpdateCheck == true)
          {
            this.isAppAccessible=false;
          }
          else{
            this.isAppAccessible=true;
          }
      });
     }
  
     redirectToPlayStore() {
      //App.exitApp();
      setTimeout(() => {
      window.open('https://play.google.com/store/apps/details?id=com.schoolhub360.schoolApp', '_system');
      }, 500);
    }

    handleRefresh(event) {
      setTimeout(() => {
      this.ionViewDidEnter();
        event.target.complete();
      }, 2000);
    }

  ngOnInit() {
  }

  refreshPage(){
    window.location.reload();
  }

}
