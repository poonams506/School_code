import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentKitFeeManagementRoutingModule } from './student-kit-fee-management-routing.module';
import { ViewStudentKitPaymentComponent } from './view-student-kit-payment/view-student-kit-payment.component';
import { ViewStudentKitHistoryComponent } from './view-student-kit-history/view-student-kit-history.component';
import { StudentKitPaymentHistoryComponent } from './student-kit-payment-history/student-kit-payment-history.component';
import { StudentKitFeePaymentComponent } from './student-kit-fee-payment/student-kit-fee-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentKitPaymentDaywiseReportComponent } from './student-kit-payment-daywise-report/student-kit-payment-daywise-report.component';
import { StudentKitPaymentAnalyticComponent } from './student-kit-payment-analytic/student-kit-payment-analytic.component';


@NgModule({
  declarations: [
    ViewStudentKitPaymentComponent,
    ViewStudentKitHistoryComponent,
    StudentKitPaymentHistoryComponent,
    StudentKitFeePaymentComponent,
    StudentKitPaymentDaywiseReportComponent,
    StudentKitPaymentAnalyticComponent
  ],
  imports: [
    CommonModule,
    StudentKitFeeManagementRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    NgbAccordionModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgSelectModule,
    NgxPrintModule,
    SharedModule
  ]
})
export class StudentKitFeeManagementModule { }
