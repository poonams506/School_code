import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeWaiverMasterComponent } from './fee-waiver-master/fee-waiver-master.component';
import { CreateFeeStructureComponent } from './create-fee-structure/create-fee-structure.component';
import { FeePaymentComponent } from './fee-payment/fee-payment.component';
import { ViewFeeStructureComponent } from './view-fee-structure/view-fee-structure.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentAnalyticComponent } from './payment-analytic/payment-analytic.component';
import { PaymentCollectionReportComponent } from './payment-collection-report/payment-collection-report.component';
import { CreateStudentKitFeeStructureComponent } from './create-student-kit-fee-structure/create-student-kit-fee-structure.component';
import { ViewStudentKitFeeStructureComponent } from './view-student-kit-fee-structure/view-student-kit-fee-structure.component';

const routes: Routes = [
  {path:'', component:FeeWaiverMasterComponent},
  {path:"create-fee-structure", component:CreateFeeStructureComponent},
  {path:"create-fee-structure/:feeStructureRouteParameter", component:CreateFeeStructureComponent},
  {path:"view-fee-structure", component:ViewFeeStructureComponent},
  {path:"create-student-kit-fee-structure", component:CreateStudentKitFeeStructureComponent},
  {path:"create-student-kit-fee-structure/:feeStructureRouteParameter", component:CreateStudentKitFeeStructureComponent},
  {path:"view-student-kit-fee-structure", component:ViewStudentKitFeeStructureComponent},
  {path:"fee-payment/:studentRouteParameter", component:FeePaymentComponent},
  {path:"fee-waiver-master", component:FeeWaiverMasterComponent},
  {path:"view-payment", component:ViewPaymentComponent},
  {path:"payment-history/:studentRouteParameter", component:PaymentHistoryComponent},
  {path:"payment-analytic", component:PaymentAnalyticComponent},
  {path:"payment-collection-report", component:PaymentCollectionReportComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeManagementRoutingModule { }
