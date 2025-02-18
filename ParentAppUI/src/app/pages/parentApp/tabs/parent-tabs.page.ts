import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonTabs } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from 'src/app/services/user-service';
import { TranslateConfigService } from 'src/app/translate-config.service';

@Component({
  selector: 'parent-app-tabs',
  templateUrl: 'parent-tabs.page.html',
  styleUrls: ['parent-tabs.page.scss']
})
export class ParentTabsPage {

  @ViewChild(IonTabs, { static: true }) private ionTabs: IonTabs;
  language: any;

  constructor( private actionSheetController: ActionSheetController,
    public translate: TranslateService, private translateConfigService: TranslateConfigService, 
    public userService:UserService,
    private router:Router
    ) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }
  show:boolean = true
  ngOnInit()
  {
    
  }

  ionViewDidEnter() {
    
   
   
  }

  // Select action

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Languages',
      cssClass: 'custom-action-sheet',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');
        }
      }, {
        text: 'Marathi',
        icon: 'language-outline',
        handler: () => {
          this.language = 'mr';
          this.translateConfigService.setLanguage('mr');
        }
      }, {
        text: 'Hindi',
        icon: 'language-outline',
        handler: () => {
          this.language = 'hn';
          this.translateConfigService.setLanguage('hn');
        }
      }, {
        text: 'Cancel',
        //icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  async selectAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Add something',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Change something',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Set something',
          icon: 'calculator',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  GoToDashboard(){
    
  }

 
}
