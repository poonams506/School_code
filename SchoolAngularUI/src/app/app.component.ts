import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './services/theme-service.service';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from './services/user-service';
import { LocationService } from './services/location-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as CryptoJS from 'crypto-js/';
import { environment } from 'src/environments/environment';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lazy loading feature modules';



  constructor(
    private themeService: ThemeService, 
    public translate: TranslateService,
    public userService:UserService,
    private modalService: NgbModal,
    private geolocationService:LocationService,
    private swUpdate: SwUpdate) {  
    translate.addLangs(['en', 'hn', 'mr']);  
    translate.setDefaultLang('en');  

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((evt:VersionEvent) => {
        if(evt.type=='VERSION_DETECTED'){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('NEW_VERSION_AVAILABLE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      window.location.reload();
     }
     
    });
  }
       
      });   
    }
} 



switchLang(lang: string) {  
  this.translate.use(lang);  
} 

  switchLanguage(language: string) {
    this.translate.use(language);
    //this.translateService = JSON.parse(localStorage.getItem('language')!);
  }
  defaultTheme() {
    this.themeService.setDefaultTheme();
  }

  theme1() {
    this.themeService.setLightTheme();
  }

  theme2() {
    this.themeService.setDarkTheme();
  }
  
  ngOnInit() {
    this.defaultTheme();
    this.getLocationAndIpAddress();
    let lang = localStorage.getItem("lang") as string;
    let decryptedString=CryptoJS.AES.decrypt(lang,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
    if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
      this.translate.use(decryptedString!);
      this.translate.setDefaultLang(decryptedString!);
    }
  }

  
async getLocationAndIpAddress(){
  try {
    const ipAddress=await this.geolocationService.fetchIpAddress();
    this.geolocationService.SetClientIPAddress(ipAddress);
    const position = await this.geolocationService.getCurrentLocation();
    this.geolocationService.SetClientLatitude(position);
    this.geolocationService.SetClientLongitude(position);
    
   
  
  } catch (error) {
    console.log(error)
  }
  
}


openThemeSettingModal(themeSettingModal: any) {
  this.modalService.open(themeSettingModal, { size: 'lg',  modalDialogClass: 'theme-modal' });
}

}
