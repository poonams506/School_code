import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdhocFeePaymentComponent } from './adhoc-fee-payment/adhoc-fee-payment.component';
import { AdhocViewPaymentComponent } from './adhoc-view-payment/adhoc-view-payment.component';
import { AdhocPaymentHistoryComponent } from './adhoc-payment-history/adhoc-payment-history.component';
import { AdhocPaymentReportComponent } from './adhoc-payment-report/adhoc-payment-report.component';

const routes: Routes = [
  {path:"adhoc-fee-payment/:studentRouteParameter", component:AdhocFeePaymentComponent},
  {path:"adhoc-view-payment", component:AdhocViewPaymentComponent},
  {path:"adhoc-payment-history/:studentRouteParameter", component:AdhocPaymentHistoryComponent},
  {path:"adhoc-payment-collection-report", component:AdhocPaymentReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdhocFeeManagementRoutingModule { }
