import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFeePaymentComponent } from './registration-fee-payment/registration-fee-payment.component';
import { RegistrationFeeHistoryComponent } from './registration-fee-history/registration-fee-history.component';

const routes: Routes = [
  {
    path:'registration-fee-payment', component:RegistrationFeePaymentComponent
  },
  {
    path:'registration-fee-payment/:studentRouteParameter', component:RegistrationFeePaymentComponent
  },
  {
    path:'registration-fee-history/:studentRouteParameter', component:RegistrationFeeHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationFeeManagementRoutingModule { }
