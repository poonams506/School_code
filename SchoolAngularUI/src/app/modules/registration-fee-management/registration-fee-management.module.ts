import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationFeeManagementRoutingModule } from './registration-fee-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationFeePaymentComponent } from './registration-fee-payment/registration-fee-payment.component';
import { RegistrationFeeHistoryComponent } from './registration-fee-history/registration-fee-history.component';
import { ViewRegistrationFeeHistoryComponent } from './view-registration-fee-history/view-registration-fee-history.component';


@NgModule({
  declarations: [
    RegistrationFeePaymentComponent,
    RegistrationFeeHistoryComponent,
    ViewRegistrationFeeHistoryComponent
  ],
  imports: [
    CommonModule,
    RegistrationFeeManagementRoutingModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    NgbAccordionModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgSelectModule,
    NgxPrintModule,
    SharedModule
  ],
})
export class RegistrationFeeManagementModule { }
