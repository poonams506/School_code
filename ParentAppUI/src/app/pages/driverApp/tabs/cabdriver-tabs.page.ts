import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonTabs } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from 'src/app/services/user-service';
import { TranslateConfigService } from 'src/app/translate-config.service';

@Component({
  selector: 'cabdriver-app-tabs',
  templateUrl: 'cabdriver-tabs.page.html',
  styleUrls: ['cabdriver-tabs.page.scss']
})
export class CabDriverTabsPage {

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
    
    this.show = false;

   setTimeout(() => {
      this.show = true
    }, 100);
   
  }
  
  GoToDashboard(){
    
  }


}
