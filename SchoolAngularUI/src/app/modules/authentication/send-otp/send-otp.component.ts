import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss'],
})
export class SendOtpComponent implements OnInit, OnDestroy {
  showDiv = false;
  buttonText = 'Send OTP';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // add class to login page body

  ngOnInit() {
    this.document.body.classList.add('login-page-body');
  }
  toggleDiv() {
    this.showDiv = !this.showDiv;
    this.buttonText = 'Resend OTP';
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }

 
}
