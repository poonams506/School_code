import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TeachingLoadAnalysisServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-teaching-load-analyser-report',
  templateUrl: './teaching-load-analyser-report.component.html',
  styleUrls: ['./teaching-load-analyser-report.component.scss']
})
export class TeachingLoadAnalyserReportComponent implements OnInit {
  teachingLoadAnalysisForm: FormGroup;
  submitted = false;
  academicYearId: any;
  teacherList: any;

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private teachingLoadAnalysisService: TeachingLoadAnalysisServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService) 
    {}

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getTeachingLoadAnalyserSelect();
    });
  }

  getTeachingLoadAnalyserSelect():void {
    this.teachingLoadAnalysisService.teacherPercentageSelect(this.academicYearId).subscribe((response:any) => {
      this.teacherList = response.teacherPercentageList;
      this.teacherList.sort((a: any, b: any) => a.fullName.localeCompare(b.fullName));

    });
  }
}
