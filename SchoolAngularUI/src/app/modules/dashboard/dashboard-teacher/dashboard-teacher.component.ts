import { Component, Injector, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
// import library classes
import { Chart, ChartData, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { DashBoardServiceProxy, DashBoardStaffDetailsDto, DashboardCountDto, GirlsBoysCountDto, SchoolEventDto, SchoolMonthEventResponseDto, SchoolMonthEventServiceProxy, TeacherOneDayLectureDto, TeacherOneDayLectureResponseDto, TeacherOneDayLectureServiceProxy } from 'src/app/services/school-api-service';
import { NgbProgressbarConfig, NgbProgressbarModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.scss']
})
export class DashboardTeacherComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = false;
  height = '25px';
  // paused = false;
  // pauseOnHover = true;
  // pauseOnFocus = true;
  AcademicYearId: number;
  dayNumber: number;
  model: NgbDateStruct;
  date: { year: number; month: number };
  dashboardCountDto: DashboardCountDto = new DashboardCountDto();
  schoolEventDto: SchoolMonthEventResponseDto;
  girlsBoysCountDto: GirlsBoysCountDto;
  dashBoardStaffDetailsDto: DashBoardStaffDetailsDto;
  teacherOneDayLectureResponseDto:TeacherOneDayLectureResponseDto;
  girlsCount: number[];
  boysCount: number[];
  academicYear: number[];
  chart: any;
  myChart: Chart;
  teachersList:any
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dashboardService: DashBoardServiceProxy,
    private teacherOneDayLectureService : TeacherOneDayLectureServiceProxy,
    config: NgbProgressbarConfig, config1: NgbCarouselConfig,
    private schoolMonthEventService: SchoolMonthEventServiceProxy,
    private userService: UserService) {
   
  }

  ngOnInit(): void {
    this.document.body.classList.add('dashboard-page-body');
    
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.AcademicYearId = academicYearId as number;
      this.userService.getUser().subscribe((user) => {
        if (user?.roleDetails?.find((role) => role.roleName == "Teacher")) {
          this.dayNumber = new Date().getDay() + 1;
          this.teacherOneDayLectureService.teacherOneDayLectureSelect(this.AcademicYearId,user.userIdByRole,this.dayNumber).subscribe(teacherOneDayLectureDto =>{
        
            this.teacherOneDayLectureResponseDto =  teacherOneDayLectureDto;
          });
        }
        if (user?.roleDetails?.find((role) => role.roleName == "Super Admin" || role.roleName == "Principal" || role.roleName == "Teacher")) {
          this.schoolMonthEventService.schoolMonthEvent(this.AcademicYearId).subscribe(eventData => {
           
              this.schoolEventDto = eventData;
          });
        }
      });
    });

  }



  ngOnDestroy() {
    this.document.body.classList.remove('dashboard-page-body');
  }


  


}

