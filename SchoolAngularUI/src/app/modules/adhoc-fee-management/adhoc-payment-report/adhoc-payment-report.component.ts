import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdhocFeePaymentDaywiseReportDto, AdhocFeePaymentServiceProxy, DaywiseAdhocPaymentReportRequest, SchoolNgbDateModel } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-adhoc-payment-report',
  templateUrl: './adhoc-payment-report.component.html',
  styleUrls: ['./adhoc-payment-report.component.scss']
})
export class AdhocPaymentReportComponent implements OnInit {

  daywiseAdhocPaymentReportRequest : DaywiseAdhocPaymentReportRequest;
  daywiseAdhocPaymentReportDto: AdhocFeePaymentDaywiseReportDto;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  ngbStartDate: any;
  ngbEndDate: any;
  academicYearId: number;
  submitted : boolean = false;
  adhocPaymentCollectionReportForm: FormGroup;
  constructor(private userService: UserService,
    private adhocPaymentServiceProxy: AdhocFeePaymentServiceProxy,
    private formBuilder: FormBuilder,
  ) { }
  
  
  ngOnInit(): void {
    this.adhocPaymentCollectionReportForm = this.formBuilder.group({
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

    this.daywiseAdhocPaymentReportRequest = new DaywiseAdhocPaymentReportRequest();    
      this.daywiseAdhocPaymentReportRequest.startDate = new SchoolNgbDateModel(this.adhocPaymentCollectionReportForm.get('ngbStartDate')?.value);
      this.daywiseAdhocPaymentReportRequest.endDate = new SchoolNgbDateModel(this.adhocPaymentCollectionReportForm.get('ngbEndDate')?.value);
      this.adhocPaymentServiceProxy.getDayWiseAdhocPaymentReport(this.daywiseAdhocPaymentReportRequest).subscribe(response => {
        this.daywiseAdhocPaymentReportDto = response;
      });
  }

  search() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.adhocPaymentCollectionReportForm.invalid) {
      return;
    }

      this.daywiseAdhocPaymentReportRequest = new DaywiseAdhocPaymentReportRequest();
      this.daywiseAdhocPaymentReportRequest.startDate = new SchoolNgbDateModel(this.adhocPaymentCollectionReportForm.get('ngbStartDate')?.value);
      this.daywiseAdhocPaymentReportRequest.endDate = new SchoolNgbDateModel(this.adhocPaymentCollectionReportForm.get('ngbEndDate')?.value);
      this.adhocPaymentServiceProxy.getDayWiseAdhocPaymentReport(this.daywiseAdhocPaymentReportRequest).subscribe(response => {
        this.daywiseAdhocPaymentReportDto = response;
      });

  }


}
