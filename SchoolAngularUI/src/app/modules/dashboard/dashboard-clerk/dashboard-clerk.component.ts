import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
// import library classes
import { DashBoardServiceProxy, DashBoardStaffDetailsDto, DashboardCountDto, GirlsBoysCountDto, SchoolMonthEventResponseDto, SchoolMonthEventServiceProxy, TeacherOneDayLectureResponseDto } from 'src/app/services/school-api-service';
import { NgbProgressbarConfig, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-dashboard-clerk',
  templateUrl: './dashboard-clerk.component.html',
  styleUrls: ['./dashboard-clerk.component.scss']
})
export class DashboardClerkComponent implements OnInit {
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
  teachersList:any;
  feeCollectionPercentage : any;
  attendancePercentage : any;
  addmissionCount : any;
  girlsBoysCount : any;
  constructor(
    private dashboardService: DashBoardServiceProxy,
    config: NgbProgressbarConfig, config1: NgbCarouselConfig,
    private schoolMonthEventService: SchoolMonthEventServiceProxy,
    private userService: UserService) {
    // customize default values of progress bars used by this component tree
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';

    config1.interval = 10000;
    config1.wrap = false;
    config1.keyboard = false;
    config1.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardCount().subscribe(dashboardCountData => {
      this.dashboardCountDto = new DashboardCountDto();
      setTimeout(() => {
        this.dashboardCountDto = dashboardCountData;
      }, 100);
    });
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.AcademicYearId = academicYearId as number;
      this.userService.getUser().subscribe((user) => {
        if (user?.roleDetails?.find((role) => role.roleName == "Super Admin" || role.roleName == "Admin" || role.roleName == "Principal" || role.roleName == "Clerk")) {
         
          this.dashboardService.getAdminDashboardCount(this.AcademicYearId).subscribe(adminCountResult=>{
            this.addmissionCount = adminCountResult.addmissionCount;
            this.attendancePercentage = adminCountResult.attendancePercentage;
            this.girlsBoysCount = adminCountResult.girlsBoysCount;
            this.feeCollectionPercentage = adminCountResult.feeCollectionPercentage;
          });
        }
        
        this.schoolMonthEventService.schoolMonthEvent(this.AcademicYearId).subscribe(eventData => {
       
            this.schoolEventDto = eventData;
          
        });
      });
    });

  }



  ngOnDestroy() {
  }

 
}

