import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy, HomeworkUpsertDto, HomeworkDto, HomeworkFileDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';


@Component({
  selector: 'view-notice-file-detail',
  templateUrl: './view-teacher-homework-file-detail.page.html',
  styleUrls: ['./view-teacher-homework-file-detail.page.scss'],
})
export class ViewTeacherHomeworkFileDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController,
  private teacherProfileService:TeacherProfileServiceProxy  ) { }
  ngOnInit() {
    this.teacherProfileService.homeworkSelect(this.homework.homeworkId).subscribe(result => {
      this.homeworkDetails = result;
      this.homeworkDetails.subjectName=this.homework.subjectName;
   
    });
   
  }

  homework:HomeworkDto;
  homeworkDetails: HomeworkUpsertDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:HomeworkFileDto ) {
    window.open(file.fullPath, '_blank');
  }

  hasNonEmptyVideoLinks(): boolean {
    if (!this.homeworkDetails.mediaVideoText) {
      return false;
    }

    for (const item of this.homeworkDetails.mediaVideoText) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }

  }

  openVideoLink(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }
}
