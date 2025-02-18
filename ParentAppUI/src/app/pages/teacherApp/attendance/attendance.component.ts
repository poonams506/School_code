import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController, RadioGroupChangeEventDetail, RadioGroupCustomEvent } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';
import { IonModal } from '@ionic/angular';
import { ClassTeacherDataDto, ClassTeacherGradeDivisionListDto, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, StudentAttendanceGridDto, StudentAttendanceRequestDto, StudentAttendanceServiceProxy, StudentAttendanceUpsertDto, StudentAttendanceUpsertListDto, TeacherAttendanceHolidayDto, TeacherAttendanceVacationDto, TeacherAttendanceWeeklyOffDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
})
export class AttendanceComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  
  selectAllChecked = false;
  selectAllShow = true;
  academicYearId: number;
  teacherId: number;
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  studentAttendanceList: StudentAttendanceGridDto[] = [];
  studentAttendanceListCopy: StudentAttendanceGridDto[] = [];
  currentDate = new Date().toISOString();
  isAttendanceAlreadyTaken: boolean;
  classTeacherGradeDivisionList: SchoolGradeDivisionMatrixDto[] = [];
  selectedClassTeacherGradeDivision: SchoolGradeDivisionMatrixDto;
  selectedClass: string;
  weeklyOffDay:TeacherAttendanceWeeklyOffDto[];
  schoolHolidays:TeacherAttendanceHolidayDto[];
  vacation:TeacherAttendanceVacationDto[];
  presentCount: number = 0;
  absentCount: number = 0;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private userService: UserService,
    private teacherProfileService: TeacherProfileServiceProxy,
    private toastService: ToastService,
    public commonMethod: CommonMethodService,
    public router: Router
  ) {
   

  }


  weekdayList=[  { id: 1, value: 'Sunday' },
                 { id: 2, value: 'Monday' },
                 { id: 3, value: 'Tuesday' },
                 { id: 4, value: 'Wednesday' },
                 { id: 5, value: 'Thursday' },
                 { id: 6, value: 'Friday' },
                 { id: 7, value: 'Saturday' }
              ];

  ngOnInit() 
  {
    this.loadInitData();
  }

  getWeekDayString(dayNo:number){
    return this.weekdayList.filter(x=> x.id==dayNo)[0].value;
  }

  holidayError:string;
  getCurrentHolidayError() {
    const weeklyOffList = this.weeklyOffDay?.map(x => this.getWeekDayString(parseInt(x.dayNo)))
      .filter(x => x == moment(this.currentDate).format('dddd'));
  
    const holidayList = this.schoolHolidays?.filter(x => x.calendarDate.isSame(moment(this.currentDate), 'date'));
    // const vacationList = this.vacation?.filter(x => x.startDate.isSame(moment(this.currentDate), 'date'));
    // const vacationList = this.vacation?.filter(x => {
    //   const startDate = moment(x.startDate);
    //   const endDate = moment(x.endDate);
    //   return moment(this.currentDate).isBetween(startDate, endDate, 'day', '[]');
    // });
    const vacationList = this.vacation?.filter(x => 
      moment(this.currentDate).isBetween(x.startDate, x.endDate, 'day', '[]')
    );
    
    if (weeklyOffList?.length > 0) 
    {
      this.holidayError = "Selected day is a holiday (Weekly Off).";
    } 
    else if (holidayList?.length > 0) 
    {
      this.holidayError = "Selected day is a holiday. (" + holidayList[0].holidayReason + ")";
    }
    else if (vacationList?.length > 0) 
      {
        this.holidayError = "Selected day is a Vacation. (" + vacationList[0].vacationName + ")";
      }
    else 
    {
      this.holidayError = '';
    }
  }
  
  

  loadInitData() {
    this.userService.getUser().subscribe(result=>{
      this.academicYearId = result.academicYearId;
      this.teacherId = result.userIdByRole;
      forkJoin([this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId), this.teacherProfileService.getTeacherAttendanceHoliday()]).subscribe(result => {
     
        this.getClassTeacherGradeDivisionList(result[0]);
    
        this.weeklyOffDay = result[1].lstWeeklyOff;
        this.schoolHolidays = result[1].lstHoliday;
        this.vacation= result[1].lstVacation;

        this.getCurrentHolidayError(); // Call here
      })
    });
   
  }
  
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Attendance');
    this.loadInitData();
  }
  

  getClassTeacherGradeDivisionList(result:ClassTeacherGradeDivisionListDto) 
  {
    if (result.classTeacherGradeDivisionList.length == 0) {
        this.toastService.presentToast('Error', 'Only Class Teacher can take Attendance !', 'top', 'danger', 2000);
        this.content_loaded = true;
        this.router.navigate(['/teacher-app/teacherTab/home'])
      } else {
        this.classTeacherGradeDivisionList = result.classTeacherGradeDivisionList;

        if (this.commonMethod.getAttendanceDate()) {
          this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList.filter(m => m.divisionId == this.commonMethod.getAttendanceDate().divisionId &&
            m.gradeId == this.commonMethod.getAttendanceDate().gradeId
          )[0];

          this.currentDate = this.commonMethod.getAttendanceDate().attendanceMissingDate.toString();
          
          // reset 

          this.commonMethod.setAttendanceDate(null);
        
        }
        else {
          this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList[0];
          this.currentDate = new Date().toISOString();
        }
        this.selectedClass = this.selectedClassTeacherGradeDivision.divisionId + ":" + this.selectedClassTeacherGradeDivision.gradeId;
        this.loadAttendenceList();
      }
    
  }
  onClassChange(e: any) {
    this.selectAllShow = false;
    setTimeout(() => {
      this.selectAllShow = true;
    }, 500);
    this.selectAllChecked = false;
    this.selectedClassTeacherGradeDivision = new SchoolGradeDivisionMatrixDto();
    let value = e.detail.value;
    let valueArray = value.split(':');
    if (valueArray.length > 1) {
      this.selectedClassTeacherGradeDivision.divisionId = parseInt(valueArray[0]);
      this.selectedClassTeacherGradeDivision.gradeId = parseInt(valueArray[1]);
      this.loadAttendenceList();
    }
    this.getCurrentHolidayError(); 

  }
  loadAttendenceList() {
    let requestWrapper = new StudentAttendanceRequestDto();
    requestWrapper.academicYearId = this.academicYearId;
    requestWrapper.teacherId = this.teacherId;
    requestWrapper.divisionId = this.selectedClassTeacherGradeDivision.divisionId;
    requestWrapper.gradeId = this.selectedClassTeacherGradeDivision.gradeId;
    requestWrapper.ngbAttendanceDate = new SchoolNgbDateModel();
    requestWrapper.ngbAttendanceDate.day = new Date(this.currentDate).getDate();
    requestWrapper.ngbAttendanceDate.month = new Date(this.currentDate).getMonth() + 1;
    requestWrapper.ngbAttendanceDate.year = new Date(this.currentDate).getFullYear();
    this.teacherProfileService.getStudentAttendanceList(requestWrapper).subscribe(result => {
      this.studentAttendanceList = result.studentAttendancesList;
      this.isAttendanceAlreadyTaken = result.studentAttendancesList.filter(m => (m.statusId == 2 || m.statusId == 3 || m.statusId == 1)).length > 0
      this.content_loaded = true;
      this.presentCount = this.getCount(1);
      this.absentCount = this.getCount(3);
    });
    this.getCurrentHolidayError();  }


  // Filter
  async filter() {

    // Open filter modal
    const modal = await this.modalController.create({
      component: FilterPage,
      //swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      // Reload
      this.content_loaded = false;

      // Fake timeout
      setTimeout(() => {
        this.content_loaded = true;
      }, 2000);
    }
  }
  isPresent(attendance: any) {
    return attendance.statusId == 1 || attendance.statusId == 2;
  }
  getCount(statusId: number) {
    return this.studentAttendanceList.filter(m => m.statusId == statusId).length;
  }
  updateList() {
    for (let i = 0; i < this.studentAttendanceList.length; i++) {
      if (this.studentAttendanceList[i].statusId == 0) {
        this.studentAttendanceList[i].statusId = this.studentAttendanceList[i].statusId = 3;
      }

    }
  }
  onSelectAll(e: CustomEvent) {
    for (let i = 0; i < this.studentAttendanceList.length; i++) {
      this.studentAttendanceList[i].statusId = e.detail.checked ? 1 : 3;
    }
  }
  onSelect(e: CustomEvent, attendance: StudentAttendanceGridDto) {
    attendance.statusId = e.detail.checked ? 1 : 3;
  }
  onSubmit() {
    this.updateList();
    let studentAttendanceUpsertDto = new StudentAttendanceUpsertDto();
    studentAttendanceUpsertDto.academicYearId = this.academicYearId;
    studentAttendanceUpsertDto.userId = this.teacherId;
    studentAttendanceUpsertDto.divisionId = this.selectedClassTeacherGradeDivision.divisionId;
    studentAttendanceUpsertDto.gradeId = this.selectedClassTeacherGradeDivision.gradeId;
    studentAttendanceUpsertDto.studentAttendanceUpsertLists = this.studentAttendanceList;
    studentAttendanceUpsertDto.ngbAttendanceDate = new SchoolNgbDateModel();
    studentAttendanceUpsertDto.ngbAttendanceDate.day = new Date(this.currentDate).getDate();
    studentAttendanceUpsertDto.ngbAttendanceDate.month = new Date(this.currentDate).getMonth() + 1;
    studentAttendanceUpsertDto.ngbAttendanceDate.year = new Date(this.currentDate).getFullYear();
    this.teacherProfileService.getStudentAttendanceUpsert(studentAttendanceUpsertDto).subscribe(result => {
      this.toastService.presentToast('Success', 'Attendance saved successfully !', 'top', 'success', 2000);
      this.presentCount = this.getCount(1);
      this.absentCount = this.getCount(3);
    });

  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

}
