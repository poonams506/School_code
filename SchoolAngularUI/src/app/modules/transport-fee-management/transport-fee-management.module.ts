import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportFeeManagementRoutingModule } from './transport-fee-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewTransportPaymentComponent } from './view-transport-payment/view-transport-payment.component';
import { ViewTransportHistoryComponent } from './view-transport-history/view-transport-history.component';
import { TransportPaymentHistoryComponent } from './transport-payment-history/transport-payment-history.component';
import { TransportFeePaymentComponent } from './transport-fee-payment/transport-fee-payment.component';
import { TransportFeePaymentDaywiseReportComponent } from './transport-fee-payment-daywise-report/transport-fee-payment-daywise-report.component';
import { TransportPaymentAnalyticsComponent } from './transport-payment-analytics/transport-payment-analytics.component';


@NgModule({
  declarations: [ViewTransportPaymentComponent,
    ViewTransportHistoryComponent,
    TransportPaymentHistoryComponent,
    TransportFeePaymentComponent,
    TransportFeePaymentDaywiseReportComponent,
    TransportPaymentAnalyticsComponent
  ],
  imports: [
    CommonModule,
    TransportFeeManagementRoutingModule,
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
export class TransportFeeManagementModule { }
