import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ClassAttendanceMissingReportDto, ClassAttendanceMissingReportResponseDto, ClassAttendanceMissingReportServiceProxy, Division, Grade, MasterServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-class-attendance-misssing-report',
  templateUrl: './class-attendance-misssing-report.component.html',
  styleUrls: ['./class-attendance-misssing-report.component.scss']
})
export class ClassAttendanceMisssingReportComponent implements OnInit {
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  classAttendanceMissingList: ClassAttendanceMissingReportDto[] = [];
  missingList: any;
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('carousel') carousel: NgbCarousel; // Add reference to NgbCarousel

  slidingInterval: any;
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private userService:UserService,
    private httpClient:HttpClient,
    private masterService:MasterServiceProxy,
    private classAttendanceMisssingReportService: ClassAttendanceMissingReportServiceProxy,
   
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

  }

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.classAttendanceMissingSelect();
    })
}

classAttendanceMissingSelect(): void {
  this.classAttendanceMisssingReportService.classMissingAttendanceReport(this.academicYearId, this.userService.getUserRefId(), this.userService.getUserRoleId()).subscribe((result) => {
    this.missingList=result.classAttendanceMissingList
  })}

  stopSliding(): void {
    if (this.carousel && this.carousel.pause) {
      this.carousel.pause(); // Pause the carousel
    }
    clearInterval(this.slidingInterval); // Clear the interval for automatic sliding
  }

  // Method to start automatic sliding
  startSliding(): void {
    if (this.carousel && this.carousel.cycle) {
      this.carousel.cycle(); // Start the carousel
    }
    // Set interval for automatic sliding
    this.slidingInterval = setInterval(() => {
      if (this.carousel && this.carousel.next) {
        this.carousel.next(); // Move to the next slide
      }
    }, 1000); // Change 5000 to your desired interval in milliseconds
  }
  
}

