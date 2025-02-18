import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SwiperComponent } from 'swiper/angular';
import { ParentAppGalleryDto, ParentAppGalleryDetailDto } from 'src/app/services/school-api-service';
import { SwiperOptions } from 'swiper';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'view-parent-gallery-file-detail',
  templateUrl: './view-parent-gallery-file-detail.page.html',
  styleUrls: ['./view-parent-gallery-file-detail.page.scss'],
})
export class ViewParentGalleryFileDetailPage implements OnInit {
  @Input() currentGalleryOnPopup: ParentAppGalleryDto;
  @ViewChild('swiper') swiper: SwiperComponent;

  galleryItems: Array<{ url: string, title: string, type: string }> = [];
  imageSize = { width: '100%', height: 'auto', space: 1 };
  imageVideoSize = { width: '100%', height: '50vh', space: 1 };
  contentType: 'Images' | 'Videos' = 'Images';
  currentIndex: number = 0;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true },
    allowTouchMove: true,
    loop: false
  };

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  ngOnInit() {
    this.setupGallery();
  }
  ionViewDidEnter() {
   // this.setupGallery();
  }

  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  isImage(fileName: string): boolean {
    const extension = this.getFileExtension(fileName);
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  }

  isVideo(fileName: string) {
    const extension = this.getFileExtension(fileName);
    // return ['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(extension);
  }

  getProjectVideoFullPath(filename: string) {
    const video = this.currentGalleryOnPopup.lstGalleryMediaDetail
      .find(file => file.contentUrl.includes(filename));
    return video ? video.contentUrl : undefined;
  }

  processImage(file: ParentAppGalleryDetailDto): { url: string, title: string, type: string } | null {
    if (this.isImage(file.fileName)) {
      return { url: file.fullPath, title: file.fileName, type: 'image' };
    }
    return null;
  }

  setupGallery() {
    if (this.currentGalleryOnPopup) {
      const imageItems = this.currentGalleryOnPopup.lstGalleryDetail
        .map(file => this.processImage(file))
        .filter(item => item) as { url: string, title: string, type: string }[];
  
      const videoUrls = this.currentGalleryOnPopup.lstGalleryMediaDetail
        .map(file => this.getProjectVideoFullPath(file.contentUrl))
        .filter(url => url) as string[];
  
      this.galleryItems = [
        ...imageItems,
        ...videoUrls.map(url => ({
          url: url,
          title: 'Video',
          type: 'video'
        }))
      ];
    }
}

  goToSlide(index: number) {
    if (this.swiper) {
      this.swiper.swiperRef.slideTo(index);
    }
  }

  onSlideChange() {
    if (this.swiper) {
      this.currentIndex = this.swiper.swiperRef.activeIndex;
    }
  }
}
