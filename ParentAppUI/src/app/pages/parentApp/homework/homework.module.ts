
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeworkRoutingModule } from './homework-routing.module';
import { HomeworkComponent } from './homework.component';
import { ViewParentHomeworkFileDetailPage } from './view-parent-homework-detail/view-parent-homework-file-detail.page';


@NgModule({
  imports: [
    CommonModule,
    HomeworkRoutingModule,
    FormsModule,
    IonicModule,  ],
  declarations: [HomeworkComponent,ViewParentHomeworkFileDetailPage],

})
export class HomeworkModule { }
