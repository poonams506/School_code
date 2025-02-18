import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { getHours } from 'date-fns';
import { Time } from 'highcharts';
import { now } from 'jquery';
import { ThemeService } from 'ng2-charts';
import { Observable } from 'rxjs';
import { FeePaymentServiceProxy, MasterServiceProxy, PaymentAnalyticsDivisionDto, PaymentAnalyticsDivisionExportDto, PaymentAnalyticsDto, PaymentAnalyticsGradeDto, PaymentAnalyticsGradeExportDto, PaymentAnalyticsSchoolExportDto, PaymentAnalyticsServiceProxy, PaymentAnalyticsStudentDto, PaymentAnalyticsExportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-payment-analytic',
  templateUrl: './payment-analytic.component.html',
  styleUrls: ['./payment-analytic.component.scss']
})
export class PaymentAnalyticComponent implements OnInit {
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
  paymentAnalyticsDto: PaymentAnalyticsDto;
  gradeExportData: PaymentAnalyticsGradeExportDto[] = [];
  divisionExportData: PaymentAnalyticsDivisionExportDto[] = [];
  schooltExportData: PaymentAnalyticsSchoolExportDto[] = [];
  //currentDate : string;

  


  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private paymentAnalytics: PaymentAnalyticsServiceProxy,
    private toastEvokeService: ToastEvokeService,
    private userService: UserService,
    private paymentAnalyticsExportService: PaymentAnalyticsExportServiceProxy
  ) { }

  currentDate = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
  
  

    


  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.paymentAnalytics.getPaymentAnalyticsSchool(this.academicYearId).subscribe(schoolAnalyticsData => {
        this.paymentAnalyticsDto = schoolAnalyticsData
      });
    });
   
  }

  getGradePaymentanalytics() {
    this.paymentAnalytics.getPaymentAnalyticsGrade(this.academicYearId).subscribe(gradeAnalyticsData => {
      this.paymentAnalyticsDto.paymentAnalyticsGrade = gradeAnalyticsData.paymentAnalyticsGrade;
    });
  }

  getDivisionPaymentAnalytics(gradeId: number) {
    this.paymentAnalytics.getPaymentAnalyticsDivision(gradeId, this.academicYearId).subscribe(divisionAnalyticsData => {
      this.paymentAnalyticsDto.paymentAnalyticsDivision = divisionAnalyticsData.paymentAnalyticsDivision;
    });

  }

  getStudentPaymentAnalytics(gradeId: number, divisionId: number) {
    this.paymentAnalytics.getPaymentAnalyticsStudent(gradeId, divisionId, this.academicYearId).subscribe(studentAnalyticsData => {
      this.paymentAnalyticsDto.paymentAnalyticsStudent = studentAnalyticsData.paymentAnalyticsStudent;
    });
  }

  exportPaymentAnalyticsSchoolwise() {
    this.paymentAnalyticsExportService.getExportPaymentAnalyticsSchool(this.academicYearId).subscribe(masterData => {
      this.schooltExportData = masterData.paymentAnalyticsExportSchool!;
      if(this.schooltExportData) {
      const headings1 = [['School Name', 'Grade Name', 'Division Name', 'Roll Number', 'Student Name', 'Is RTE Student','Is New Student','Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date','Receivable Fee', 'Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.schooltExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'School');
      let excelName = this.schooltExportData[0].schoolName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
      }

    });
  }


  exportPaymentAnalyticsDivisionwise(gradeId: number, divisionId: number) {
    this.paymentAnalyticsExportService.getExportPaymentAnalyticsDivision(this.academicYearId, gradeId, divisionId).subscribe(masterData => {
      this.divisionExportData = masterData.paymentAnalyticsExportDivision!;
      if (this.divisionExportData) {
        const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name','Is RTE Student','IsNewStudent', 'Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date', 'Receivable Fee', 'Collection In %', 'Contact No']];
        const wb = utils.book_new();
        const ws: any = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
        utils.sheet_add_json(ws, this.divisionExportData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Division');
        let excelName = this.divisionExportData[0].gradeName +'-'+this.divisionExportData[0].divisionName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
        writeFile(wb, excelName);
      }
    });

  }


  exportPaymentAnalyticsGradewise(gradeId: number) {
    this.paymentAnalyticsExportService.getExportPaymentAnalyticsGrade(this.academicYearId, gradeId).subscribe(masterData => {
      this.gradeExportData = masterData.paymentAnalyticsExportGrade!;
      if (this.gradeExportData) {
        const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name','Is RTE Student','Is New Student', 'Total Fee', 'Discounted Fee', 'Effective Fee', 'Collection Till Date', 'Receivable Fee', 'Collection In %', 'Contact No']];
        const wb = utils.book_new();
        const ws: any = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
        utils.sheet_add_json(ws, this.gradeExportData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Grade');
        let excelName = this.gradeExportData[0].gradeName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
        writeFile(wb, excelName);
      }
    });
  }





}







