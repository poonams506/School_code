import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy, ParentAppNoticeDetailDto, ParentAppNoticeDto, OneMonthEventParentAppDto, OneMonthEventFileDetailsParentAppDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';


@Component({
  selector: 'view-parent-notice-file-detail',
  templateUrl: './view-parent-school-event-detail.page.html',
  styleUrls: ['./view-parent-school-event-detail.page.scss'],
})
export class ViewParentSchoolEventDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController ) { }
  ngOnInit() {
  }

  selectedEvent: OneMonthEventParentAppDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:OneMonthEventFileDetailsParentAppDto ) {
    window.open(file.fullPath, '_blank');
  }

}
