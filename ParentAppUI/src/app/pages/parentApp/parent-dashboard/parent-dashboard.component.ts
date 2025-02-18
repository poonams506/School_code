import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as angular from '@ionic/angular';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
import { CommonMethodService } from 'src/app/services/common-method-service';
import { 
  IParentAppNoticeRequestDto,
  MissingAttendanceParentAppDto, 
  OneMonthEventFileDetailsParentAppDto, 
  OneMonthEventParentAppDto, 
  OneMonthEventParentAppResponseDto, 
  ParentAppServiceProxy, 
  SchoolServiceProxy, 
  StudentGradeDivisionParentAppDto, 
  TeacherOneDayLecturesParentAppDto, 
  TeacherOneDayLecturesParentAppResponseDto, 
  UserRoleModulePermissionDto 
} from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalController, Platform } from '@ionic/angular';
import { ViewParentSchoolEventDetailPage } from './view-parent-school-event-detail/view-parent-school-event-detail.page';
import { environment } from 'src/environments/environment';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { FcmService } from 'src/app/services/fcm/fcm.service';
@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit, AfterViewInit {
  canDismiss = false;
  presentingElement = null;
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  @ViewChild(angular.IonModal) modal: angular.IonModal;
  @Input() selectedEventId: number | null = null;

  homeworkList: any[];
  schoolEventList: OneMonthEventParentAppDto[] = [];
  lectureList: TeacherOneDayLecturesParentAppDto[] = [];
  academicYearId: any;
  divisionGradeMapping: any;
  gradeDivisionMaster: any;
  gradeId: number;
  divisionId: number;
  studentId: number;
  parentId;
  attendanceDate: any;
  attendanceStatus: any;
  selectedEvent: OneMonthEventParentAppDto | null = null;

  isAppAccessible:boolean=true;
  constructor(
    public commonMethod: CommonMethodService,
    public ParentAppService: ParentAppServiceProxy,
    private userService: UserService,
    public router: Router,
    private modalController: ModalController,
    private platform: Platform, public schoolService:SchoolServiceProxy,
    private fcmService:FcmService
  ) {}
  ngAfterViewInit(): void {
    this.loadData();
  }

  ionViewDidEnter() {
    this.initializeApp();
    this.commonMethod.setHeaderTitle('Dashboard');
    setTimeout(() => {
     this.loadData();
    }, 2000);
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('android') || this.platform.is('ios')){
       await  this.checkForUpdate();
   }
      
    });
  }

  async checkForUpdate() {
    if(Capacitor.getPlatform() !== 'web') {
      await this.fcmService.clearFCMTokenAndRemoveListener();
      await this.fcmService.registerPush();
    }
    this.schoolService.getCurrentSchoolAppVersion().subscribe(result=>{
      if(environment.APP_VERSION===result.configurationValue && result.isUpdateCheck == true)
        {
          this.isAppAccessible=true;
        }
        else if(result.isUpdateCheck == true)
        {
          this.isAppAccessible=false;
        }
        else{
          this.isAppAccessible=true;
        }
    });
   }
   redirectToPlayStore() {
    //App.exitApp();
    setTimeout(() => {
    window.open('https://play.google.com/store/apps/details?id=com.schoolhub360.schoolApp', '_system');
    }, 500);
  }
  
  ngOnInit() {
    this. loadData();
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }



  loadData() {
    
          this.schoolEvent();
          this.todaysUpcomingLectures();
          this.todaysAttendance();
          this.content_loaded = true;
      }

      schoolEvent() {
        this.ParentAppService.oneMonthEvent(this.userService.CurrentSiblingClassId).subscribe((result: OneMonthEventParentAppResponseDto) => {
          this.schoolEventList = result.oneMonthEventList;
          console.log(result)
        });
      }

  todaysUpcomingLectures() {
    let dayNo = new Date().getDay() + 1;
    this.ParentAppService.oneDayLectureSelect(this.userService.CurrentSiblingClassId, dayNo).subscribe((result: TeacherOneDayLecturesParentAppResponseDto) => {
      this.lectureList = result.teacherOneDayLectureList;
    });
  }

  todaysAttendance() {
    this.ParentAppService.attendanceMissingParent(this.userService.CurrentSiblingId).subscribe((result: MissingAttendanceParentAppDto) => {
    this.attendanceStatus = result;
    });
  }


  
async openSchoolEventDetail(selectedEventId:number) {
  const selectedEvent = this.schoolEventList.find(event => event.schoolEventId === selectedEventId) || null;
    
  const modal = await this.modalController.create({
    component: ViewParentSchoolEventDetailPage,
    componentProps: { selectedEvent : selectedEvent }
  });

  await modal.present();
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:OneMonthEventFileDetailsParentAppDto ) {
    window.open(file.fullPath, '_blank');
  }

  refreshPage(){
    window.location.reload();
  }

}
