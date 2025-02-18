import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DaywiseTransportPaymentReport, DaywiseTransportPaymentReportRequest, SchoolNgbDateModel, TransportFeePaymentServiceProxy, TransportPaymentReportDaywiseDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-transport-fee-payment-daywise-report',
  templateUrl: './transport-fee-payment-daywise-report.component.html',
  styleUrls: ['./transport-fee-payment-daywise-report.component.scss']
})
export class TransportFeePaymentDaywiseReportComponent implements OnInit {
  daywiseTransportpaymentReportRequest:DaywiseTransportPaymentReportRequest;
  transportPaymentReportDaywiseDto:TransportPaymentReportDaywiseDto;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  ngbStartDate: any;
  ngbEndDate: any;
  academicYearId: number;
  submitted : boolean = false;
  transportPaymentReportForm: FormGroup;
  
  constructor(private userService: UserService,
    private transportFeePaymentServiceProxy: TransportFeePaymentServiceProxy,
    private formBuilder: FormBuilder,
  ) { }
  



  ngOnInit(): void {
    this.transportPaymentReportForm = this.formBuilder.group({
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

    this.daywiseTransportpaymentReportRequest = new DaywiseTransportPaymentReportRequest();    
    this.daywiseTransportpaymentReportRequest.startDate = new SchoolNgbDateModel(this.transportPaymentReportForm.get('ngbStartDate')?.value);
    this.daywiseTransportpaymentReportRequest.endDate = new SchoolNgbDateModel(this.transportPaymentReportForm.get('ngbEndDate')?.value);
    this.transportFeePaymentServiceProxy.getDayWiseTransportPaymentReport(this.daywiseTransportpaymentReportRequest).subscribe(response => {
      this.transportPaymentReportDaywiseDto = response;
    });
  }
  search() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.transportPaymentReportForm.invalid) {
      return;
    }

      this.daywiseTransportpaymentReportRequest = new DaywiseTransportPaymentReportRequest();
      this.daywiseTransportpaymentReportRequest.startDate = new SchoolNgbDateModel(this.transportPaymentReportForm.get('ngbStartDate')?.value);
      this.daywiseTransportpaymentReportRequest.endDate = new SchoolNgbDateModel(this.transportPaymentReportForm.get('ngbEndDate')?.value);
      this.transportFeePaymentServiceProxy.getDayWiseTransportPaymentReport(this.daywiseTransportpaymentReportRequest).subscribe(response => {
        this.transportPaymentReportDaywiseDto = response;
      });

  }


}
  


