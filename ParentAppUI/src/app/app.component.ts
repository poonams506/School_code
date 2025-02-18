import { Component, NgZone } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from './services/user-service';
import { SchoolServiceProxy } from './services/school-api-service';
import { environment } from 'src/environments/environment';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  isAppAccessible:boolean=true;
  
  networkListener: PluginListenerHandle;
  status: boolean;
  model = {};

  constructor(
    public translate: TranslateService,
    public userService:UserService,
    public schoolService:SchoolServiceProxy,
    private ngZone: NgZone,
    private storageService:StorageService  ) {

    translate.addLangs(['en', 'mr']);  
    translate.setDefaultLang('en'); 
  }


  switchLang(lang: string) {  
    this.translate.use(lang);  
  
  } 
  
    switchLanguage(language: string) {
      this.translate.use(language);
    }


  redirectToPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.schoolhub360.schoolApp', '_system');
  }

  async ngOnInit() {
    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() => {
        this.changeStatus(status);
      });
    });
    const status = await Network.getStatus();
    console.log('Network status:', status);
    this.changeStatus(status);
    console.log('Network status:', this.status);

    this.storageService.setStorage("APIUrl",environment.API_BASE_URL);
  }

  changeStatus(status) {
    this.status = status?.connected;
    if(!this.status) {
      this.model = { 
        title: 'No Connection', 
        subtitle: 'Your internet connection was', 
        description: "interrupted, Please retry.", 
        titleColor: 'dark', 
        color: 'medium', 
        button: 'RETRY', 
        buttonColor: 'dark' 
      };
      this.ngOnDestroy();
    }
  }

  checkStatus(event) {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    if(this.networkListener) this.networkListener.remove();
  }

}
