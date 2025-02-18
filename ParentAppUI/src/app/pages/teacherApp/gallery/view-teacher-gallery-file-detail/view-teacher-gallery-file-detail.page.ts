import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy, GalleryUpsertDto, GalleryFileDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';

export interface ISelectListItem
{
    id:number;
    value:string;
}

@Component({
  selector: 'view-gallery-file-detail',
  templateUrl: './view-teacher-gallery-file-detail.page.html',
  styleUrls: ['./view-teacher-gallery-file-detail.page.scss'],
})
export class ViewTeacherGalleryFileDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController,
  private teacherProfileService:TeacherProfileServiceProxy  ) { }
  ngOnInit() {
    this.teacherProfileService.gallerySelect(this.galleryId).subscribe(result => {
      this.galleryDetails = result;
   
    });
   
  }
  galleryId:number;
  galleryDetails: GalleryUpsertDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:GalleryFileDto ) {
    window.open(file.fullPath, '_blank');
  }

  hasNonEmptyVideoLinks(): boolean {
    if (!this.galleryDetails.galleryVideoText) {
      return false;
    }

    for (const item of this.galleryDetails.galleryVideoText) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }

  }

  openVideoLink(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }
}
