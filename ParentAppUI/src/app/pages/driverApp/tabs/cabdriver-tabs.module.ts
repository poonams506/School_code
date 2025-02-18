import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabDriverTabsRoutingModule } from './cabdriver-tabs-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CabDriverTabsPage } from './cabdriver-tabs.page';
import {  CabdriverHeaderComponent } from './header/cabdriver-header.component';


@NgModule({
  //declarations: [],
  imports: [
    IonicModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    CabDriverTabsRoutingModule
  ],
   declarations: [CabDriverTabsPage,CabdriverHeaderComponent],
  exports:[CabDriverTabsPage]
})
export class CabDriverTabsModule { }
