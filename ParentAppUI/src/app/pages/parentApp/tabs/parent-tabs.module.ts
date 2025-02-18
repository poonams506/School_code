import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ParentTabsPage } from './parent-tabs.page';
import { TeacherTabsPageRoutingModule } from './parent-tabs-routing.module';
import { ParentHeaderComponent } from './header/parent-header.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    TeacherTabsPageRoutingModule
  ],
  declarations: [ParentTabsPage,ParentHeaderComponent],
  exports:[ParentTabsPage]
})
export class ParentTabsPageModule {}
