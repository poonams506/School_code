import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { GalleryComponent } from './gallery.component';
import { ViewParentGalleryFileDetailPage } from './view-parent-gallery-file-detail/view-parent-gallery-file-detail.page';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    SwiperModule
  ],
  declarations: [
    GalleryComponent,
    ViewParentGalleryFileDetailPage
  ]
})
export class GalleryModule { }
