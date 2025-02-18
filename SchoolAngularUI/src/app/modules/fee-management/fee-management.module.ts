import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeManagementRoutingModule } from './fee-management-routing.module';
import { FeeWaiverMasterComponent } from './fee-waiver-master/fee-waiver-master.component';
import { CreateFeeStructureComponent } from './create-fee-structure/create-fee-structure.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeePaymentComponent } from './fee-payment/fee-payment.component';
import { ViewFeeStructureComponent } from './view-fee-structure/view-fee-structure.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { AddEditFeeWaiverMasterComponent } from './add-edit-fee-waiver-master/add-edit-fee-waiver-master.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { CloneFeeParticularStructureComponent } from './clone-fee-particular-structure/clone-fee-particular-structure.component';
import {NgxPrintModule} from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentAnalyticComponent } from './payment-analytic/payment-analytic.component';
import { PaymentCollectionReportComponent } from './payment-collection-report/payment-collection-report.component';
import { InstallmentDetailsPopupComponent } from './installment-details-popup/installment-details-popup.component';
import { CloneStudentKitFeeParticularStructureComponent } from './clone-student-kit-fee-particular-structure/clone-student-kit-fee-particular-structure.component';
import { CreateStudentKitFeeStructureComponent } from './create-student-kit-fee-structure/create-student-kit-fee-structure.component';
import { ViewStudentKitFeeStructureComponent } from './view-student-kit-fee-structure/view-student-kit-fee-structure.component';

@NgModule({
  declarations: [
    FeeWaiverMasterComponent,
    CreateFeeStructureComponent,
    FeePaymentComponent,
    ViewFeeStructureComponent,
    ViewPaymentComponent,
    AddEditFeeWaiverMasterComponent,
    PaymentHistoryComponent,
    ViewHistoryComponent,
    CloneFeeParticularStructureComponent,
    PaymentAnalyticComponent,
    PaymentCollectionReportComponent,
    InstallmentDetailsPopupComponent,
    CloneStudentKitFeeParticularStructureComponent,
    CreateStudentKitFeeStructureComponent,
    ViewStudentKitFeeStructureComponent
  ],
  imports: [
    CommonModule,
    FeeManagementRoutingModule,
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
export class FeeManagementModule { }
