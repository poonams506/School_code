import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, config } from 'rxjs';
import { DashBoardServiceProxy, Division, Grade, IdealTeacherListResponseDto, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { Teacher } from './teacher-interface';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-availability',
  templateUrl: './teacher-availability.component.html',
  styleUrls: ['./teacher-availability.component.scss']
})
export class TeacherAvailabilityComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  showNavigationArrows = true;
  showNavigationIndicators = false;
  height = '25px';
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  idealTeacherName: IdealTeacherListResponseDto;
  teachersList: any;
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();
  currentIndex = 0;
  carouselInterval=2000;
  constructor(
    public translate: TranslateService, 
    private userService:UserService,
    private dashboardService: DashBoardServiceProxy,
   
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {
    // config.interval = 0; // Disable default interval
    // config.wrap = false;
  }

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
     this.teacherList();
    })
}
teacherList() {
  this.dashboardService.getIdealTeacherList(this.academicYearId).subscribe((result) => {
    // Assuming result.schoolTimeSlotList contains an array of teachers
    this.teachersList = result.schoolTimeSlotList;

    // Sorting the teachersList by teacherName in ascending order
    this.teachersList.sort((a:Teacher, b:Teacher) => {
      const nameA = a.teacherName.toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
      const nameB = b.teacherName.toUpperCase();
      
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  });
}

convertToAMPM(hour: number, minute: number): string {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  const formattedMinute = minute < 10 ? '0' + minute : minute;
  return `${formattedHour}:${formattedMinute} ${ampm}`;
}
handleSlide(slideEvent: any): void {
  const nextIndex = (slideEvent.direction === 'left') ? slideEvent.current + 1 : slideEvent.current - 1;
  if (nextIndex === this.teachersList.length) {
    slideEvent.current = 0;
    this.currentIndex = 0; 
  } else if (nextIndex === -1) {
    slideEvent.current = this.teachersList.length - 1;
    this.currentIndex = this.teachersList.length - 1; 
  } else {
    this.currentIndex = nextIndex; 
  }
}
}
