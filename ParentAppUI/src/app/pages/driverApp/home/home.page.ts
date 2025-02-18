import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { CabDriverAppServiceProxy, SchoolServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  canDismiss = false;
  presentingElement = null;
  title = "Home"
  isAppAccessible:boolean=true;
  content_loaded: boolean = false;
  toastButtons = [
    {
      text: 'Dismiss',
    },
  ];

  constructor(public translate: TranslateService, public commonMethod :CommonMethodService,
    private platform: Platform, public schoolService:SchoolServiceProxy,
    private userService:UserService,private cabDriverService:CabDriverAppServiceProxy,
    private router:Router,
    private fcmService:FcmService
    ) {
     
    }

    
     ionViewDidEnter() {


      this.commonMethod.setHeaderTitle('Home');
      this.userService.getUser().subscribe(result=>{
        this.cabDriverService.getCurrentActiveTripId(result.userId).subscribe(activeTripResult=>{
          if(activeTripResult && activeTripResult.tripId>0)
          {
            if(activeTripResult.tripType == 'PickUp')
            {
              this.router.navigate(['driver-app/cabdriverTab/pickup',activeTripResult.tripId,activeTripResult.routeId]);
            }
            else if(activeTripResult.tripType == 'Drop')
            {
              this.router.navigate(['driver-app/cabdriverTab/drop',activeTripResult.tripId,activeTripResult.routeId]);
            }
          }
        });
      });
      this.initializeApp();
    }

    handleRefresh(event) {
      setTimeout(() => {
      this.ionViewDidEnter();
        event.target.complete();
      }, 2000);
    }

  ngOnInit() {
  }

   initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('android') || this.platform.is('ios'))
      {
        await  this.checkForUpdate();
      }
      
    });
  }

  async checkForUpdate() {
    this.isAppAccessible=true;
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

  refreshPage(){
    window.location.reload();
  }

}
