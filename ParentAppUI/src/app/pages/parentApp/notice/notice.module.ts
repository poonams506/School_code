import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { ViewParentNoticeFileDetailPage } from './view-parent-notice-file-detail/view-parent-notice-file-detail.page';


@NgModule({
  imports: [
    CommonModule,
    NoticeRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
  ],
  declarations: [NoticeComponent,ViewParentNoticeFileDetailPage],

})
export class NoticeModule { }
