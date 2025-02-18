import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStudentKitPaymentComponent } from './view-student-kit-payment/view-student-kit-payment.component';
import { StudentKitFeePaymentComponent } from './student-kit-fee-payment/student-kit-fee-payment.component';
import { StudentKitPaymentHistoryComponent } from './student-kit-payment-history/student-kit-payment-history.component';
import { StudentKitPaymentDaywiseReportComponent } from './student-kit-payment-daywise-report/student-kit-payment-daywise-report.component';
import { StudentKitPaymentAnalyticComponent } from './student-kit-payment-analytic/student-kit-payment-analytic.component';

const routes: Routes = [
  {path:'', component:ViewStudentKitPaymentComponent},
  {path:"student-kit-fee-payment/:studentRouteParameter", component:StudentKitFeePaymentComponent},
  {path:"view-student-kit-payment", component:ViewStudentKitPaymentComponent},
  {path:"student-kit-payment-history/:studentRouteParameter", component:StudentKitPaymentHistoryComponent},
  {path:"student-kit-payment-daywise-report", component:StudentKitPaymentDaywiseReportComponent},
  {path:"student-kit-payment-analytics", component:StudentKitPaymentAnalyticComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentKitFeeManagementRoutingModule { }
