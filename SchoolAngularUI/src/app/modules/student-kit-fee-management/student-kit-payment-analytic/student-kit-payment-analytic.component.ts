import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'ng2-charts';
import { StudentKitAnalyticsPaymentAnalyticsServiceProxy, StudentKitPaymentAnalyticsDivisionDto, StudentKitPaymentAnalyticsDivisionExportDto, StudentKitPaymentAnalyticsDto, StudentKitPaymentAnalyticsExportDto, StudentKitPaymentAnalyticsExportServiceProxy, StudentKitPaymentAnalyticsGradeExportDto, StudentKitPaymentAnalyticsSchoolExportDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { utils, writeFile } from 'xlsx-js-style';

@Component({
  selector: 'app-student-kit-payment-analytic',
  templateUrl: './student-kit-payment-analytic.component.html',
  styleUrls: ['./student-kit-payment-analytic.component.scss']
})
export class StudentKitPaymentAnalyticComponent implements OnInit {
  model: NgbDateStruct;
  paymentAnalysisForm: FormGroup;
  submitted = false;
  studentId: number;
  academicYearId: number;
  gradeId: number;
  divisionId: number;
  discountedFee: number;
  totalFee: number;
  effectiveFee: number;
  collectionTillDate: number;
  collectionInPercentage: number;
  receivableFee : number;
  schoolId: number;
  schoolName: string;
  studentName: string;
  gradeName: string;
  divisionName: string;
  studentKitPaymentAnalyticsDto: StudentKitPaymentAnalyticsDto;
  studentKitGradeExportData: StudentKitPaymentAnalyticsGradeExportDto[] = [];
  studentKitDivisionExportData: StudentKitPaymentAnalyticsDivisionExportDto[] = [];
  studentKitSchooltExportData: StudentKitPaymentAnalyticsSchoolExportDto[] = [];

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private studentKitPaymentAnalytics: StudentKitAnalyticsPaymentAnalyticsServiceProxy,
    private toastEvokeService: ToastEvokeService,
    private userService: UserService,
    private studentKitPaymentAnalyticsExportService: StudentKitPaymentAnalyticsExportServiceProxy
  ) { }

  currentDate = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
  
  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.studentKitPaymentAnalytics.getStudentKitPaymentAnalyticsSchool(this.academicYearId).subscribe(studentKitSchoolAnalyticsData => {
        this.studentKitPaymentAnalyticsDto = studentKitSchoolAnalyticsData
      });
    });
  }

  getStudentKitGradePaymentanalytics() {
    this.studentKitPaymentAnalytics.getStudentKitPaymentAnalyticsGrade(this.academicYearId).subscribe(studentKitGradeAnalyticsData => {
      this.studentKitPaymentAnalyticsDto.studentKitPaymentAnalyticsGrade = studentKitGradeAnalyticsData.studentKitPaymentAnalyticsGrade;
    });
  }

  getStudentKitDivisionPaymentAnalytics(gradeId: number) {
    this.studentKitPaymentAnalytics.getStudentKitPaymentAnalyticsDivision(gradeId, this.academicYearId).subscribe(studentKitDivisionAnalyticsData => {
      this.studentKitPaymentAnalyticsDto.studentKitPaymentAnalyticsDivision = studentKitDivisionAnalyticsData.studentKitPaymentAnalyticsDivision;
    });

  }

  getStudentKitStudentPaymentAnalytics(gradeId: number, divisionId: number) {
    this.studentKitPaymentAnalytics.getStudentKitPaymentAnalyticsStudent(gradeId, divisionId, this.academicYearId).subscribe(studentkitAnalyticsData => {
      this.studentKitPaymentAnalyticsDto.studentKitPaymentAnalyticsStudent = studentkitAnalyticsData.studentKitPaymentAnalyticsStudent;
    });
  }


  exportStudentKitPaymentAnalyticsSchoolwise() {
    this.studentKitPaymentAnalyticsExportService.getStudentKitPaymentAnalyticsExportSchool(this.academicYearId).subscribe(masterData => {
      this.studentKitSchooltExportData = masterData.studentKitPaymentAnalyticsExportSchool!;
      if(this.studentKitSchooltExportData) {
      const headings1 = [['School Name', 'Grade Name', 'Division Name', 'Roll Number', 'Student Name', 'Is RTE Student','Is New Student','Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date','Receivable Fee', 'Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.studentKitSchooltExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'School');
      let excelName = this.studentKitSchooltExportData[0].schoolName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
      }

  });
 }

 exportStudentKitPaymentAnalyticsDivisionwise(gradeId: number, divisionId: number) {
  this.studentKitPaymentAnalyticsExportService.getStudentKitExportPaymentAnalyticsDivision(this.academicYearId, gradeId, divisionId).subscribe(masterData => {
    this.studentKitDivisionExportData = masterData.studentKitPaymentAnalyticsExportDivision!;
    if (this.studentKitDivisionExportData) {
      const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name','Is RTE Student','IsNewStudent', 'Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date', 'Receivable Fee', 'Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.studentKitDivisionExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Division');
      let excelName = this.studentKitDivisionExportData[0].gradeName +'-'+this.studentKitDivisionExportData[0].divisionName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
    }
  });

}

exportStudentKitPaymentAnalyticsGradewise(gradeId: number) {
  this.studentKitPaymentAnalyticsExportService.getStudentKitExportPaymentAnalyticsGrade(this.academicYearId, gradeId).subscribe(masterData => {
    this.studentKitGradeExportData = masterData.studentKitPaymentAnalyticsExportGrade!;
    if (this.studentKitGradeExportData) {
      const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name','Is RTE Student','Is New Student', 'Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date', 'Receivable Fee', 'Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.studentKitGradeExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Grade');
      let excelName = this.studentKitGradeExportData[0].gradeName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
    }
  });
}


}
