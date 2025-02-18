import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'ng2-charts';
import { TransportPaymentAnalyticsDivisionExportDto, TransportPaymentAnalyticsDto, TransportPaymentAnalyticsExportServiceProxy, TransportPaymentAnalyticsGradeExportDto, TransportPaymentAnalyticsSchoolExportDto, TransportPaymentAnalyticsServiceProxy, TransportPaymentAnalyticsStaffListDto, TransportPaymentAnalyticsStaffListExportDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { utils, writeFile } from 'xlsx-js-style';

@Component({
  selector: 'app-transport-payment-analytics',
  templateUrl: './transport-payment-analytics.component.html',
  styleUrls: ['./transport-payment-analytics.component.scss']
})
export class TransportPaymentAnalyticsComponent implements OnInit {
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
  transportPaymentAnalyticsDto :TransportPaymentAnalyticsDto;
  transportGradeExportData: TransportPaymentAnalyticsGradeExportDto[] = [];
  transportDivisionExportData: TransportPaymentAnalyticsDivisionExportDto[] = [];
  transportSchooltExportData: TransportPaymentAnalyticsSchoolExportDto[] = [];
  transportStaffListtExportData : TransportPaymentAnalyticsStaffListExportDto[]=[];


  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private transportPaymentAnalytics: TransportPaymentAnalyticsServiceProxy,
    private toastEvokeService: ToastEvokeService,
    private userService: UserService,
    private transportPaymentAnalyticsService: TransportPaymentAnalyticsExportServiceProxy
  ) { }

currentDate = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();

ngOnInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
    this.academicYearId = academicYearId as number;
    this.transportPaymentAnalytics.getTransportPaymentAnalyticsSchool(this.academicYearId).subscribe(transpotSchoolAnalyticsData => {
      this.transportPaymentAnalyticsDto = transpotSchoolAnalyticsData;
      this.transportPaymentAnalytics.getTransportPaymentAnalyticsStaff(this.academicYearId).subscribe(staffData =>{
        this.transportPaymentAnalyticsDto.transportPaymentAnalyticsStaff = staffData.transportPaymentAnalyticsStaff
      });
    });
  });
 
}

getstaffListTransportPaymentanalytics() {
  this.transportPaymentAnalytics.getTransportPaymentAnalyticsStaffList(this.academicYearId).subscribe(staffListTransportAnalyticsData => {
    this.transportPaymentAnalyticsDto.transportPaymentAnalyticsStaffList = staffListTransportAnalyticsData.transportPaymentAnalyticsStaffList;
  });
}

getGradeTransportPaymentanalytics() {
  this.transportPaymentAnalytics.getTransportPaymentAnalyticsGrade(this.academicYearId).subscribe(gradeTransportAnalyticsData => {
    this.transportPaymentAnalyticsDto.transportPaymentAnalyticsGrade = gradeTransportAnalyticsData.transportPaymentAnalyticsGrade;
  });
}

getDivisionTransportPaymentAnalytics(gradeId: number) {
  this.transportPaymentAnalytics.getTransportPaymentAnalyticsDivision(gradeId, this.academicYearId).subscribe(divisionTransportAnalyticsData => {
  this.transportPaymentAnalyticsDto.transportPaymentAnalyticsDivision = divisionTransportAnalyticsData.transportPaymentAnalyticsDivision;  
 });
}

getStudentTransportPaymentAnalytics(gradeId: number, divisionId: number) {
  this.transportPaymentAnalytics.getTransportPaymentAnalyticsStudent(gradeId, divisionId, this.academicYearId).subscribe(studentTransportAnalyticsData => {
    this.transportPaymentAnalyticsDto.transportPaymentAnalyticsStudent = studentTransportAnalyticsData.transportPaymentAnalyticsStudent;
  });
}

exportTransportPaymentAnalyticsSchoolwise() {
  this.transportPaymentAnalyticsService.getTransportExportPaymentAnalyticsSchool(this.academicYearId).subscribe(masterData => {
    this.transportSchooltExportData = masterData.transportPaymentAnalyticsExportSchool!;
    if(this.transportSchooltExportData) {
    const headings1 = [['School Name', 'Grade Name', 'Division Name', 'Roll Number', 'Student Name', 'Transport Total Fee', 'Transport Discounted Fee', 'Transport Effective Fee', 'Transport Collection Till Date','Transport Receivable Fee', 'Transport Collection In %', 'Contact No']];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
    utils.sheet_add_json(ws, this.transportSchooltExportData, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'School');
    let excelName = this.transportSchooltExportData[0].schoolName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
    writeFile(wb, excelName);
    }

  });
}


exportTransportPaymentAnalyticsDivisionwise(gradeId: number, divisionId: number) {
  this.transportPaymentAnalyticsService.getTransportExportPaymentAnalyticsDivision(this.academicYearId, gradeId, divisionId).subscribe(masterData => {
    this.transportDivisionExportData = masterData.transportPaymentAnalyticsExportDivision!;
    if (this.transportDivisionExportData) {
      const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name', 'Transport Total Fee', 'Transport Discounted Fee', 'Transport Effective Fee', 'Transport Collection Till Date', 'Transport Receivable Fee', 'Transport Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.transportDivisionExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Division');
      let excelName = this.transportDivisionExportData[0].gradeName +'-'+this.transportDivisionExportData[0].divisionName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
    }
  });

}

exportTransportPaymentAnalyticsGradewise(gradeId: number) {
  this.transportPaymentAnalyticsService.getTransportExportPaymentAnalyticsGrade(this.academicYearId, gradeId).subscribe(masterData => {
    this.transportGradeExportData = masterData.transportPaymentAnalyticsExportGrade!;
    if (this.transportGradeExportData) {
      const headings1 = [['Grade Name', 'Division Name', 'Roll Number', 'Student Name', 'Transport Total Fee', 'Transport Discounted Fee', 'Transport Effective Fee', 'Transport Collection Till Date', 'Transport Receivable Fee', 'Transport Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.transportGradeExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Grade');
      let excelName = this.transportGradeExportData[0].gradeName + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
    }
  });
}

exportTransportPaymentAnalyticsStaffList() {
  this.transportPaymentAnalyticsService.getTransportExportPaymentAnalyticsStaffList(this.academicYearId).subscribe(masterData => {
    this.transportStaffListtExportData = masterData.transportPaymentAnalyticsExportStaffList!;
    if (this.transportStaffListtExportData) {
      const headings1 = [['StaffName', 'Role','Academic Year', 'Transport Total Fee', 'Transport Discounted Fee', 'Transport Effective Fee', 'Transport Collection Till Date', 'Transport Receivable Fee', 'Transport Collection In %', 'Contact No']];
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings1, { origin: 'A1' })
      utils.sheet_add_json(ws, this.transportStaffListtExportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Staff');
      let excelName = 'Staff_Transport_Payment_List' + '_' + new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +'_'+ new Date().getMinutes() + '_'+ + new Date().getSeconds()+ '.xlsx';
      writeFile(wb, excelName);
    }
  });
}



}