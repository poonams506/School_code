import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendOtpRoutingModule } from './send-otp-routing.module';
import { SendOtpComponent } from './send-otp.component';
import { TranslateModule } from '@ngx-translate/core';  

@NgModule({
  declarations: [
    SendOtpComponent
  ],
  imports: [
    CommonModule,
    SendOtpRoutingModule,
    TranslateModule
  ]
})
export class SendOtpModule { }
