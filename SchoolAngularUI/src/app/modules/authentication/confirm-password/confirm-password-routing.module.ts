import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmPasswordComponent } from './confirm-password.component';

const routes: Routes = [
  {
    path:'',
     component: ConfirmPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmPasswordRoutingModule { }
