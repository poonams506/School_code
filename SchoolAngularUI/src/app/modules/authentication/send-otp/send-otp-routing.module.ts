import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOtpComponent } from './send-otp.component';

const routes: Routes = [
  {
    path:'',
     component: SendOtpComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendOtpRoutingModule { }
