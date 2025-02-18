import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import {  CommonDropdownSelectListItemDto, CommonDropdownSelectListItemResponseDto, GradeDivisionMasterDto, MasterServiceProxy, NoticeDto, NoticeUpsertDto, PublishUnpublishNoticeDto, SchoolDetailMobileDto, SchoolGradeDivisionMatrixDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { AddEditNoticePage } from './add-edit-notice/add-edit-notice.page';
import { ViewTeacherNoticeFileDetailPage } from './view-teacher-notice-file-detail/view-teacher-notice-file-detail.page';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent implements OnInit {
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  noticeList: any[] = [];
  academicYearId: number;
  teacherId: number;
  userId: number;
  noticeDetails: NoticeUpsertDto;
  noticeTypeId = '1';
  classTeacherGradeDivisionList: SchoolGradeDivisionMatrixDto[] = [];
  studentList :CommonDropdownSelectListItemDto[] = [];
  selectedClassTeacherGradeDivision: SchoolGradeDivisionMatrixDto;
  teacherName;
  schoolDetails: SchoolDetailMobileDto;
  months: any[] = [];
  selectedMonth: any;
  buttonDisabled: boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private teacherProfileService: TeacherProfileServiceProxy,
    private masterService: MasterServiceProxy,
    private userService: UserService,
    private alertController: AlertController,
    private toastService: ToastService,
    public commonMethod: CommonMethodService

  ) {}

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Notice');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year ;
    this.getUserDetails();
    this. loadMonthNoticeList();
  }

  ngOnInit() {
   
  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getUserDetails() {
    this.userService.getUser().subscribe((result: UserRoleModulePermissionDto) => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.teacherId = result.userIdByRole;
      this.teacherName = result.uname;
      this.getClassTeacherGradeDivisionList();
      this.getStudentList();
      this.GetSchoolBasicDetails();
    })
  }
  onSentReceiveChange(e: any) {
    let value = e.detail.value;
    this.noticeTypeId = value;
    this.noticeList = [];
    this.loadMonthNoticeList();
  }
  onMonthChange(e: any) {
    this.getUserDetails();
    this.loadMonthNoticeList();
  }
  loadMonthNoticeList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
       this.loadNoticeList(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate: Date = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.loadNoticeList(month, year);
    }
  }
  
  GetSchoolBasicDetails() {
    this.teacherProfileService.getSchoolBasicDetails().subscribe(result => {
      this.schoolDetails = result;
      this.GetMonths();
      this.content_loaded = true;
    });
  }
  GetMonths(): any[] {
    this.months = [];
    let fromDate: Date = new Date('2023-01-01');
    if (this.schoolDetails.academicYearStartMonth) {
      fromDate = new Date(this.schoolDetails.academicYearStartMonth.toString());
    }
    let toDate: Date = new Date();

    // set last day of current month
    toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);

    const currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      this.months.push({ text: `${month}-${year}`, value: currentDate.getMonth() + 1 + ":" + year });
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }
    return this.months;
  }
  loadNoticeList( month:number, year:number) {
    this.teacherProfileService.getNoticeList( parseInt(this.noticeTypeId), parseInt(this.noticeTypeId) == 1 ? this.userId : this.teacherId,month,year).subscribe(result => {
      this.noticeList = result.noticeList;
      this.content_loaded = true;
    });
  }
  getClassTeacherGradeDivisionList() {
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((result: GradeDivisionMasterDto) => {
      this.classTeacherGradeDivisionList = result.schoolGradeDivisionMatrixCascadeList;
    })
  }
  getStudentList() {
    this.masterService.getStudentDropdownData(this.academicYearId).subscribe((result: CommonDropdownSelectListItemResponseDto) => {
      this.studentList = result.lstDropdownValues;
    })
  }


  getFilePath(fileName: string, isTextFile: boolean) {
    if (isTextFile) {
      return
    }
  }


  async openNoticeDetail( noticeId: number) {
       const modal = await this.modalController.create({
        component: ViewTeacherNoticeFileDetailPage,
        componentProps: { noticeId: noticeId }
      });
  
      await modal.present();
  

     
  }
  openDialog(callback: Function, notice: NoticeDto, action: string) {
    this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure? you want to ' + action + ' notice?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            callback(notice, this);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  Delete(e: Event, notice: NoticeDto) {
    e.stopPropagation();
    this.openDialog(this.DeleteNotice, notice, 'delete');
  }
  DeleteNotice(notice: NoticeDto, context: NoticeComponent) {
    debugger
    context.teacherProfileService.noticeDelete(notice.noticeId).subscribe(result => {
      context.content_loaded = true;
      context.loadMonthNoticeList();
      context.toastService.presentToast('Success', 'Notice deleted successfully !', 'top', 'success', 2000);
    });
  }
  Publish(e: Event, notice: NoticeDto) {
    e.stopPropagation();
    this.openDialog(this.publishNotice, notice, notice.isPublished ? 'unpublish' : 'publish');
  }
  publishNotice(notice: NoticeDto, context: NoticeComponent) {
    let requestWrapper = new PublishUnpublishNoticeDto();
    requestWrapper.noticeId = notice.noticeId;
    requestWrapper.isPublished = !notice.isPublished;

    context.teacherProfileService.publishUnpublishNoticeParticulars(requestWrapper).subscribe(result => {
      context.content_loaded = true;
      context.loadMonthNoticeList();
      context.toastService.presentToast('Success', 'Notice changes saved successfully !', 'top', 'success', 2000);
    });
  }

  // Filter
  async filter() {
    this.buttonDisabled = true;
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddEditNoticePage,
      componentProps: { noticeId: 0},
      //swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Notice saved successfully !', 'top', 'success', 2000);
      this.loadMonthNoticeList();
    }
    this.buttonDisabled = false;

  }
  async editNotice(e: Event, notice: NoticeDto) {
    e.stopPropagation();
    this.teacherProfileService.noticeSelect(notice.noticeId).subscribe(result => {
      this.noticeDetails = result;
      this.openNoticeDialog(this.noticeDetails);
      this.content_loaded = true;
    });

  }
  async openNoticeDialog(notice: NoticeUpsertDto) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddEditNoticePage,
      componentProps: { noticeId: notice.noticeId },
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Notice saved successfully !', 'top', 'success', 2000);
      this.loadMonthNoticeList();
    }
  }

}
