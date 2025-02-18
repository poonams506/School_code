import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicYear, DaywisePaymentReportDTO, DaywisePaymentReportRequest, FeePaymentServiceProxy, SchoolNgbDateModel } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-collection-report',
  templateUrl: './payment-collection-report.component.html',
  styleUrls: ['./payment-collection-report.component.scss']
})
export class PaymentCollectionReportComponent implements OnInit {
  daywisePaymentReportRequest : DaywisePaymentReportRequest;
  daywisePaymentReportDTO: DaywisePaymentReportDTO;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  ngbStartDate: any;
  ngbEndDate: any;
  academicYearId: number;
  submitted : boolean = false;
  paymentCollectionReportForm: FormGroup;
  constructor(private userService: UserService,
    private feePaymentServiceProxy: FeePaymentServiceProxy,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.paymentCollectionReportForm = this.formBuilder.group({
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
 
      this.daywisePaymentReportRequest = new DaywisePaymentReportRequest();    
      this.daywisePaymentReportRequest.startDate = new SchoolNgbDateModel(this.paymentCollectionReportForm.get('ngbStartDate')?.value);
      this.daywisePaymentReportRequest.endDate = new SchoolNgbDateModel(this.paymentCollectionReportForm.get('ngbEndDate')?.value);
      this.feePaymentServiceProxy.getDayWisePaymentReport(this.daywisePaymentReportRequest).subscribe(response => {
        this.daywisePaymentReportDTO = response;
      });

  }

  search() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.paymentCollectionReportForm.invalid) {
      return;
    }

      this.daywisePaymentReportRequest = new DaywisePaymentReportRequest();
      this.daywisePaymentReportRequest.startDate = new SchoolNgbDateModel(this.paymentCollectionReportForm.get('ngbStartDate')?.value);
      this.daywisePaymentReportRequest.endDate = new SchoolNgbDateModel(this.paymentCollectionReportForm.get('ngbEndDate')?.value);
      this.feePaymentServiceProxy.getDayWisePaymentReport(this.daywisePaymentReportRequest).subscribe(response => {
        this.daywisePaymentReportDTO = response;
      });

  }

}
