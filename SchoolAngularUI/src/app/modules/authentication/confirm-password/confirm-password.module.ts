import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPasswordRoutingModule } from './confirm-password-routing.module';
import { ConfirmPasswordComponent } from './confirm-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [
    ConfirmPasswordComponent
  ],
  imports: [
    CommonModule,
    ConfirmPasswordRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class ConfirmPasswordModule { }
