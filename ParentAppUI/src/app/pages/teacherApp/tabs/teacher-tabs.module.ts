import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TeacherTabsPage } from './teacher-tabs.page';
import { TeacherTabsPageRoutingModule } from './teacher-tabs-routing.module';
import { TeacherHeaderComponent } from './header/teacher-header.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    TeacherTabsPageRoutingModule
  ],
  declarations: [TeacherTabsPage,TeacherHeaderComponent],
  exports:[TeacherTabsPage]
})
export class TeacherTabsPageModule {}
