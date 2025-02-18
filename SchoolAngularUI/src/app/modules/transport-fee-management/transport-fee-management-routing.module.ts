import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTransportPaymentComponent } from './view-transport-payment/view-transport-payment.component';
import { TransportFeePaymentComponent } from './transport-fee-payment/transport-fee-payment.component';
import { TransportPaymentHistoryComponent } from './transport-payment-history/transport-payment-history.component';
import { TransportFeePaymentDaywiseReportComponent } from './transport-fee-payment-daywise-report/transport-fee-payment-daywise-report.component';
import { TransportPaymentAnalyticsComponent } from './transport-payment-analytics/transport-payment-analytics.component';

const routes: Routes = [
  {path:'', component:ViewTransportPaymentComponent},
  {path:"transport-fee-payment/:studentRouteParameter", component:TransportFeePaymentComponent},
  {path:"transport-view-payment", component:ViewTransportPaymentComponent},
  {path:"transport-payment-history/:studentRouteParameter", component:TransportPaymentHistoryComponent},
  {path:"transport-payment-daywise-report", component:TransportFeePaymentDaywiseReportComponent},
  {path:"transport-payment-analytics", component:TransportPaymentAnalyticsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportFeeManagementRoutingModule { }
