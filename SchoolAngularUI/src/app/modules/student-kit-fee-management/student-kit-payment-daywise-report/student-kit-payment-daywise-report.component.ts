import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SchoolNgbDateModel, StudentKitDaywisePaymentReportDto, StudentKitDaywisePaymentReportRequest, StudentKitFeePaymentServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-student-kit-payment-daywise-report',
  templateUrl: './student-kit-payment-daywise-report.component.html',
  styleUrls: ['./student-kit-payment-daywise-report.component.scss']
})
export class StudentKitPaymentDaywiseReportComponent implements OnInit {
  studentKitDaywisePaymentReportRequest : StudentKitDaywisePaymentReportRequest;
  studentKitDaywisePaymentReportDto: StudentKitDaywisePaymentReportDto;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  ngbStartDate: any;
  ngbEndDate: any;
  academicYearId: number;
  submitted : boolean = false;
  studentKitPaymentCollectionReportForm: FormGroup;
  constructor(private userService: UserService,
    private studentKitPaymentServiceProxy: StudentKitFeePaymentServiceProxy,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.studentKitPaymentCollectionReportForm = this.formBuilder.group({
      ngbStartDate: [{
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      } as NgbDateStruct, Validators.required],
      ngbEndDate: [{
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      } as NgbDateStruct, Validators.required]
    });

    this.studentKitDaywisePaymentReportRequest = new StudentKitDaywisePaymentReportRequest();    
      this.studentKitDaywisePaymentReportRequest.startDate = new SchoolNgbDateModel(this.studentKitPaymentCollectionReportForm.get('ngbStartDate')?.value);
      this.studentKitDaywisePaymentReportRequest.endDate = new SchoolNgbDateModel(this.studentKitPaymentCollectionReportForm.get('ngbEndDate')?.value);
      this.studentKitPaymentServiceProxy.getStudentKitDayWisePaymentReport(this.studentKitDaywisePaymentReportRequest).subscribe(response => {
        this.studentKitDaywisePaymentReportDto = response;
      });

  }
  
  search() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.studentKitPaymentCollectionReportForm.invalid) {
      return;
    }

      this.studentKitDaywisePaymentReportRequest = new StudentKitDaywisePaymentReportRequest();
      this.studentKitDaywisePaymentReportRequest.startDate = new SchoolNgbDateModel(this.studentKitPaymentCollectionReportForm.get('ngbStartDate')?.value);
      this.studentKitDaywisePaymentReportRequest.endDate = new SchoolNgbDateModel(this.studentKitPaymentCollectionReportForm.get('ngbEndDate')?.value);
      this.studentKitPaymentServiceProxy.getStudentKitDayWisePaymentReport(this.studentKitDaywisePaymentReportRequest).subscribe(response => {
        this.studentKitDaywisePaymentReportDto = response;
      });

  }

}
