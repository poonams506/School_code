import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatatableRequestWrapper, HomeworkDto, HomeworkListDto, HomeworkServiceProxy, HomeworkUpsertDto, PublishUnpublishHomeworkDto, SchoolDetailMobileDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { addIcons } from 'ionicons';
import { add, colorPalette, document, globe } from 'ionicons/icons';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { AddEditHomeworkPage } from './add-edit-homework/add-edit-homework.page';
import { ViewTeacherHomeworkFileDetailPage } from './view-teacher-homework-detail/view-teacher-homework-file-detail.page';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrl: './homework.component.scss'
})
export class HomeworkComponent implements OnInit {
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  homeworkList: HomeworkDto[];
  schoolDetails: SchoolDetailMobileDto;
  months: any[] = [];
  homeworkDetails: any;
  academicYearId;
  userId;
  selectedMonth: any;
  buttonDisabled: boolean = false;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {

      },
    },
  ];
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private teacherProfileService: TeacherProfileServiceProxy,
    private alertController: AlertController,
    private toastService: ToastService,
    private userService: UserService,
    public commonMethod: CommonMethodService
  ) { 
    addIcons({ add, colorPalette, document, globe });
  }

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Homework');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year ;
    this.getUserDetails();
    this.loadMonthHomeworkList();
  }
   

  ngOnInit() {

   
    
  }
  getUserDetails() {
    this.userService.getUser().subscribe((result: UserRoleModulePermissionDto) => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.GetSchoolBasicDetails();
    })
  }
  showFile(file:any ) {
    window.open(file.fullPath, '_blank');
  }
  onMonthChange(e: any) {
    this.loadMonthHomeworkList();
  }
  loadMonthHomeworkList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.loadHomeworkList(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate: Date = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.loadHomeworkList(month, year);
    }
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
  GetSchoolBasicDetails() {
    this.teacherProfileService.getSchoolBasicDetails().subscribe(result => {
      this.schoolDetails = result;
      this.GetMonths();
      this.content_loaded = true;
    });
  }
  loadHomeworkList(month, year) {
    this.teacherProfileService.getHomeworkList(month, year).subscribe(result => {
      this.homeworkList = result.homeworkList;
      this.content_loaded = true;
    });
  }
  Publish(e:Event,homework: HomeworkDto) {
    e.stopPropagation();
    this.openConfirmationDialog(this.publishHomework, homework, homework.isPublished ? 'unpublish' : 'publish');
  }
  openConfirmationDialog(callback: Function, homework: HomeworkDto, action: string) {
    this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to ' + action + ' homework?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            callback(homework, this);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  publishHomework(homework: HomeworkDto, context: HomeworkComponent) {
    let requestWrapper = new PublishUnpublishHomeworkDto();
    requestWrapper.homeworkId = homework.homeworkId;
    requestWrapper.isPublished = !homework.isPublished;

    context.teacherProfileService.publishUnpublishHomeworkParticulars(requestWrapper).subscribe(result => {
      context.content_loaded = true;
      context.loadMonthHomeworkList();
      context.toastService.presentToast('Success', 'Homework changes saved successfully !', 'top', 'success', 2000);
    });
  }
  Delete(e:Event, homework: HomeworkDto) {
    debugger
    e.stopPropagation();
    this.openConfirmationDialog(this.DeleteHomework, homework, 'delete');

  }
  DeleteHomework(homework: HomeworkDto, context: HomeworkComponent) {
    debugger
    context.teacherProfileService.homeWorkDelete(homework.homeworkId).subscribe(result => {
      context.loadMonthHomeworkList();
      context.toastService.presentToast('Success', 'Homework deleted successfully !', 'top', 'success', 2000);
    });
  }

  async openHomeworkDetail(homework: HomeworkDto) {
    const modal = await this.modalController.create({
      component: ViewTeacherHomeworkFileDetailPage,
      componentProps: { homework : homework }
    });

    await modal.present();
    

  }
  async editHomework(e:Event,homework: any) {
    e.stopPropagation();
    this.teacherProfileService.homeworkSelect(homework.homeworkId).subscribe(async result => {
      await  this.openHomeworkDialog(result);
    });


  }
  async openHomeworkDialog(homework: HomeworkUpsertDto) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddEditHomeworkPage,
      componentProps: { homeworkId: homework.homeworkId},
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Homework Detail Saved', 'top', 'success', 2000);
     this.loadMonthHomeworkList();
    }
  }

  async addHomeworkDialog() {
    this.buttonDisabled = true;
    const modal = await this.modalController.create({
      component: AddEditHomeworkPage,
      componentProps: { homeworkId: 0},
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Homework saved successfully !', 'top', 'success', 2000);
      this.loadMonthHomeworkList();
    }
    this.buttonDisabled = false;
  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Edit',
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Publish',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
}
