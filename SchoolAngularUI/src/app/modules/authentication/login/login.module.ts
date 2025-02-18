import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {LoginRoutingModule} from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgbModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { 
  constructor() {
  }
}
