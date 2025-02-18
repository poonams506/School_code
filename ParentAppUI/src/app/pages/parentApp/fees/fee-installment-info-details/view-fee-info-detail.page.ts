import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, TeacherProfileServiceProxy, ParentAppNoticeDetailDto, ParentAppNoticeDto, OneMonthEventParentAppDto, OneMonthEventFileDetailsParentAppDto, FeeInstallmentDetailDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';


@Component({
  selector: 'view-fee-info-detail',
  templateUrl: './view-fee-info-detail.page.html',
  styleUrls: ['./view-fee-info-detail.page.scss'],
})
export class ViewFeeInfoDetailPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController ) { }
  ngOnInit() {
  }

  installments: FeeInstallmentDetailDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFormattedDate(date: string): string {
    return moment(date).format('DD-MM-YYYY'); // format date using moment.js
  }

}
