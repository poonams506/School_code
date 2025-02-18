import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy } from 'src/app/services/school-api-service';
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
  selector: 'view-notice-file-detail',
  templateUrl: './view-teacher-notice-file-detail.page.html',
  styleUrls: ['./view-teacher-notice-file-detail.page.scss'],
})
export class ViewTeacherNoticeFileDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController,
  private teacherProfileService:TeacherProfileServiceProxy  ) { }
  ngOnInit() {
    this.teacherProfileService.noticeSelect(this.noticeId).subscribe(result => {
      this.noticeDetails = result;
   
    });
   
  }

  noticeId:number;
  noticeDetails: NoticeUpsertDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:NoticeFileDto ) {
    window.open(file.fullPath, '_blank');
  }

  hasNonEmptyVideoLinks(): boolean {
    if (!this.noticeDetails.videoText) {
      return false;
    }

    for (const item of this.noticeDetails.videoText) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }

  }

  openVideoLink(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }
}
