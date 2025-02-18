import { Component, Injector, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
// import library classes
import { BaseComponent } from '../base/base-component';
import { Chart, ChartData, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ClassTeacherDataDto, ClassTeacherDataServiceProxy, DashBoardServiceProxy, DashBoardStaffDetailsDto, DashboardCountDto, GirlsBoysCountDto, SchoolEventDto, SchoolMonthEventResponseDto, SchoolMonthEventServiceProxy, TeacherOneDayLectureDto, TeacherOneDayLectureResponseDto, TeacherOneDayLectureServiceProxy } from 'src/app/services/school-api-service';
import { NgbProgressbarConfig, NgbProgressbarModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  dashboardId:number=0;
  constructor(override injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private dashboardService: DashBoardServiceProxy,
    private teacherOneDayLectureService : TeacherOneDayLectureServiceProxy,
    config: NgbProgressbarConfig, config1: NgbCarouselConfig,
    private schoolMonthEventService: SchoolMonthEventServiceProxy,
    public classTeacherDataService : ClassTeacherDataServiceProxy,
    private userService: UserService) {
    super(injector);
    
  }

  override ngOnInit(): void {
    this.document.body.classList.add('dashboard-page-body');
    this.userService.getUser().subscribe((user) => {
      if(user?.roleDetails?.find((role) => role.roleName == "Super Admin" || role.roleName == "Admin")){
        this.dashboardId = 1; // admin
      }
      else if(user?.roleDetails?.find((role) => role.roleName == "Teacher")){
        this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
          academicYearId as number;
          this.classTeacherDataService.getClassTeacherData(academicYearId as number, user?.userId as number)
          .subscribe((classTeacherData: ClassTeacherDataDto) => {
            if(classTeacherData.getGradeDivisionList && classTeacherData.getGradeDivisionList.length > 0){
              this.dashboardId = 3; // Class Teacher
            }
            else{
              this.dashboardId = 2; // Teacher
            }
          });
        });
      }
      else if(user?.roleDetails?.find((role) => role.roleName == "Clerk")){
        this.dashboardId = 4; // Clerk
      }
    });
  }

  ngOnDestroy() {
    this.document.body.classList.remove('dashboard-page-body');
  }

}

