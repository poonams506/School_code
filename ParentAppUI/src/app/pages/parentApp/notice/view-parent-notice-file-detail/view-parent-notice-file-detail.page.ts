import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy, ParentAppNoticeDetailDto, ParentAppNoticeDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';


@Component({
  selector: 'view-parent-notice-file-detail',
  templateUrl: './view-parent-notice-file-detail.page.html',
  styleUrls: ['./view-parent-notice-file-detail.page.scss'],
})
export class ViewParentNoticeFileDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController ) { }
  ngOnInit() {
  }

  currentNoticeOnPopup: ParentAppNoticeDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }
  
  showFile(file: ParentAppNoticeDetailDto) {
    window.open(file.fullPath, '_blank');
  }

  hasNonEmptyVideoLinks(): boolean {
    if (!this.currentNoticeOnPopup.lstNoticeMediaDetail) {
      return false;
    }

    for (const item of this.currentNoticeOnPopup.lstNoticeMediaDetail) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }

    return false;
  }

  openVideoLink(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }

}
