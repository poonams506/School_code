import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdhocFeeManagementRoutingModule } from './adhoc-fee-management-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdhocFeePaymentComponent } from './adhoc-fee-payment/adhoc-fee-payment.component';
import { AdhocViewPaymentComponent } from './adhoc-view-payment/adhoc-view-payment.component';
import { AdhocPaymentHistoryComponent } from './adhoc-payment-history/adhoc-payment-history.component';
import { AdhocViewHistoryComponent } from './adhoc-view-history/adhoc-view-history.component';
import {NgxPrintModule} from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAdhocParticularComponent } from './add-adhoc-particular/add-adhoc-particular.component';
import { AdhocPaymentReportComponent } from './adhoc-payment-report/adhoc-payment-report.component';

@NgModule({
  declarations: [
    AdhocFeePaymentComponent,
    AdhocViewPaymentComponent,
    AdhocPaymentHistoryComponent,
    AdhocViewHistoryComponent,
    AddAdhocParticularComponent,
    AdhocPaymentReportComponent,
  ],
  imports: [
    CommonModule,
    AdhocFeeManagementRoutingModule,
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
export class AdhocFeeManagementModule { }
