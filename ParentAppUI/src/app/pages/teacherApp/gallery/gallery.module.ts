import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditGalleryPage } from './add-edit-gallery/add-edit-gallery.page';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ViewTeacherGalleryFileDetailPage } from './view-teacher-gallery-file-detail/view-teacher-gallery-file-detail.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GalleryRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    NgChartsModule,
    SharedModule
  ],
  declarations: [GalleryComponent,AddEditGalleryPage,ViewTeacherGalleryFileDetailPage],

})
export class GalleryModule { }
