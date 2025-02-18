
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeworkRoutingModule } from './homework-routing.module';
import { HomeworkComponent } from './homework.component';
import { AddEditHomeworkPage } from './add-edit-homework/add-edit-homework.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewTeacherHomeworkFileDetailPage } from './view-teacher-homework-detail/view-teacher-homework-file-detail.page';


@NgModule({
  imports: [
    CommonModule,
    HomeworkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,SharedModule  ],
  declarations: [HomeworkComponent,AddEditHomeworkPage,ViewTeacherHomeworkFileDetailPage],

})
export class HomeworkModule { }
