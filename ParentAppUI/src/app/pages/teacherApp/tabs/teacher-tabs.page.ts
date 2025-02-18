import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from 'src/app/services/user-service';
import { TranslateConfigService } from 'src/app/translate-config.service';

@Component({
  selector: 'teacher-app-tabs',
  templateUrl: 'teacher-tabs.page.html',
  styleUrls: ['teacher-tabs.page.scss']
})
export class TeacherTabsPage {
  language: any;

  constructor( private actionSheetController: ActionSheetController,
    public translate: TranslateService, private translateConfigService: TranslateConfigService, 
    public userService:UserService
    ) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  show:boolean = true
  ngOnInit()
  {
    
  }
  
  ionViewDidEnter() {
    
    this.show = false;

   setTimeout(() => {
      this.show = true
    }, 100);
   
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
