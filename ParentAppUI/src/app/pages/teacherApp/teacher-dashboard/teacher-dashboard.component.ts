import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HelperService } from 'src/app/services/helper/helper.service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ClassTeacherGradeDivisionListDto, SchoolMonthEventDto, SchoolMonthEventResponseDto, TeacherOneDayLectureResponseDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto, ClassAttendanceMissingReportResponseDto, ClassAttendanceMissingReportDto, TeacherOneDayLectureDto, SchoolServiceProxy, SchoolDetailMobileDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { ViewParentSchoolEventDetailPage } from '../../parentApp/parent-dashboard/view-parent-school-event-detail/view-parent-school-event-detail.page';
import { ModalController, Platform } from '@ionic/angular';
import { ViewTeacherSchoolEventDetailComponent } from './view-teacher-school-event-detail/view-teacher-school-event-detail.component';
import { environment } from 'src/environments/environment';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { FcmService } from 'src/app/services/fcm/fcm.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss'
})
export class TeacherDashboardComponent implements OnInit {
  presentingElement = null;

  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  homeworkList: any[];
  showMissingAttendanceSection: boolean = false;
  academicYearId;
  teacherId:number;
  schoolEventList: SchoolMonthEventDto[] = [];
  teacherLectureList: TeacherOneDayLectureDto[] = [];
  classAttendanceMissingList: ClassAttendanceMissingReportDto[] = [];
  isAppAccessible:boolean=true;
 // monthId:string;
  monthName:string;
  currentMonth:string;
  userId;
  selectedMonth: any;
  schoolDetails: SchoolDetailMobileDto;
  months: any[] = [];
  monthList = [
    { id: "1", name: 'January' },
    { id: "2", name: 'February' },
    { id: "3", name: 'March' },
    { id: "4", name: 'April' },
    { id: "5", name: 'May' },
    { id: "6", name: 'June' },
    { id: "7", name: 'July' },
    { id: "8", name: 'August' },
    { id: "9", name: 'September' },
    { id: "10", name: 'October' },
    { id: "11", name: 'November' },
    { id: "12", name: 'December' },
  ];
  constructor(
    public commonMethod: CommonMethodService,
    private userService: UserService,
    private teacherProfileService: TeacherProfileServiceProxy,
    public router: Router,
    private modalController: ModalController,
    private platform: Platform, public schoolService:SchoolServiceProxy,
    private fcmService:FcmService
  ) {
   
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('android') || this.platform.is('ios')){
       await this.checkForUpdate();
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
    
    //this.getUserDetails();
    // this.loadUpcomingEvents();
    this.GetSchoolBasicDetails();
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
      this.teacherId = result.userIdByRole;
      this.GetSchoolBasicDetails();
      this.getClassTeacherGradeDivisionList();
      this.loadTeacherUpcomingLectures();
      this.currentMonth = ((new Date().getMonth()) + 1).toString();
     // this.monthId=this.currentMonth;
      //this.loadMonthMissingAttendanceList();
    })
  }
  loadInitialData() {
    this.GetSchoolBasicDetails();
    this.getClassTeacherGradeDivisionList();
    this.loadTeacherUpcomingLectures();
  }
  onMonthChange(e: any) {
    this.loadMonthMissingAttendanceList();
  }
  getClassTeacherGradeDivisionList() {
    this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId).subscribe((result: ClassTeacherGradeDivisionListDto) => {
      this.showMissingAttendanceSection = result.classTeacherGradeDivisionList.length > 0;

      this.content_loaded = true;
    })
  }
  loadTeacherUpcomingLectures() {
    let dayNo = new Date().getDay() + 1;
    this.teacherProfileService.teacherOneDayLectureSelect(this.teacherId, dayNo).subscribe((result: TeacherOneDayLectureResponseDto) => {
      this.teacherLectureList = result.teacherOneDayLectureList;
      this.content_loaded = true;
    })
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
  loadMissingAttendanceList(month, year) {
    this.teacherProfileService.classMissingAttendanceReport(this.teacherId,month, year).subscribe((result: ClassAttendanceMissingReportResponseDto) => {
      this.classAttendanceMissingList = result.classAttendanceMissingList;
      console.log(result);
      this.content_loaded = true;
    })
  }
  loadMonthMissingAttendanceList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.loadMissingAttendanceList(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate: Date = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.loadMissingAttendanceList(month, year);
    }
  }
  loadUpcomingEvents() {
    this.teacherProfileService.schoolMonthEvent().subscribe((result: SchoolMonthEventResponseDto) => {
      this.schoolEventList = result.schoolMonthEventList;
      this.content_loaded = true;
    })
  }
  getEventTotalTime(schoolEvent: SchoolMonthEventDto) {
    if(schoolEvent.endTime){
      return schoolEvent.endTime.diff(schoolEvent.startTime, 'hours') + ' hrs';
    }
    else{
      return '';
    }
    
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  goToAttendancePage(classAttendanceMissing: ClassAttendanceMissingReportDto) {
    this.commonMethod.setAttendanceDate(classAttendanceMissing);
    this.router.navigate(['/teacher-app/teacherTab/attendance'])
  }




  ionViewDidEnter() {
    this.initializeApp();
    this.commonMethod.setHeaderTitle('Dashboard');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year ;
    setTimeout(() => {
      this.getUserDetails();
    this.loadMonthMissingAttendanceList();
    this.loadUpcomingEvents();
    }, 2000);
    this.currentMonth = ((new Date().getMonth()) + 1).toString();
   // this.monthId = this.currentMonth 

  }

  upcomingEventSort(first:SchoolMonthEventDto,second:SchoolMonthEventDto):boolean
  {
    return first.startDate<second.startDate;
  }
   
async openSchoolEventDetail(selectedEventId:number) {
  const selectedEvent = this.schoolEventList.find(event => event.schoolEventId === selectedEventId) || null;
    
  const modal = await this.modalController.create({
    component: ViewTeacherSchoolEventDetailComponent,
    componentProps: { selectedEvent : selectedEvent }
  });

  await modal.present();
  }
  // getMonthName(monthId: string): string {
  //   debugger
  //   const month=this.monthList.find(m=>m.id==monthId);
  //   return(month.name);
  // }

  refreshPage(){
    window.location.reload();
  }

}
