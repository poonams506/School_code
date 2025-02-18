import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditNoticePage } from './add-edit-notice/add-edit-notice.page';
import { ViewTeacherNoticeFileDetailPage } from './view-teacher-notice-file-detail/view-teacher-notice-file-detail.page';


@NgModule({
  imports: [
    CommonModule,
    NoticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgChartsModule,
    SharedModule
  ],
  declarations: [NoticeComponent,AddEditNoticePage,ViewTeacherNoticeFileDetailPage],

})
export class NoticeModule { }
