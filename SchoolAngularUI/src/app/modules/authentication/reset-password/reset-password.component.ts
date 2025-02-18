import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceProxy, ForgotPasswordRequestDto, ResetPasswordRequestDto } from 'src/app/services/school-api-service';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import * as CryptoJS from 'crypto-js/'; 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  isEyeOpen:boolean=false;
  isEyeOpenConfirm:boolean=false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
      private formBuilder: FormBuilder,
      private authClient:AuthServiceProxy,
      private router:Router,
      public translate: TranslateService,
      private toastEvokeService: ToastEvokeService,
    ) {
      this.forgotPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required,Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required,RxwebValidators.compare({fieldName:'password'})]],
        schoolCode:['', [Validators.required]],
        token:[]
      });
}

forgotPasswordForm: FormGroup;
modelRef:any;
// add class to login page body

ngOnInit() {
 
this.document.body.classList.add('login-page-body');
}

ngOnDestroy() {
//this.document.body.classList.remove('login-page-body');
}


get f(){
  return this.forgotPasswordForm.controls;
}

// ChangePassword() {
//   // stop here if form is invalid
//   if (this.forgotPasswordForm.invalid) {
//       return;
//   }

//   let resetPasswordDto=this.forgotPasswordForm.getRawValue() as ResetPasswordRequestDto
//   this.authClient.changePassword(resetPasswordDto).subscribe(data=>{
//     const newToastNotification = new ToastNotificationInitializer();
//     newToastNotification.setTitle(this.translate.instant('SUCCESS'));
//     newToastNotification.setMessage(this.translate.instant('Password_Reset_Successfully'));
//     newToastNotification.openToastNotification$();
//     this.modelRef.close({result:true, password : resetPasswordDto.confirmPassword});
//   });

// }

ChangePassword() {
  // Stop here if form is invalid
  if (this.forgotPasswordForm.invalid) {
    return;
  }

  if (this.forgotPasswordForm.controls['password'].value !== this.forgotPasswordForm.controls['confirmPassword'].value) {
     const mismatchToastNotification = new ToastNotificationInitializer();
    // mismatchToastNotification.setTitle(this.translate.instant('ERROR'));
    // mismatchToastNotification.setMessage(this.translate.instant('New_Password_and_Confirm_New_Password_Should_Be_Matached'));
        const title = this.translate.instant('ERROR');
    const message = this.translate.instant('New_Password_and_Confirm_New_Password_Should_Be_Matached');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
    mismatchToastNotification.openToastNotification$();
    return; 
    
  }
  
  let resetPasswordDto = this.forgotPasswordForm.getRawValue() as ResetPasswordRequestDto;
  this.authClient.changePassword(resetPasswordDto).subscribe(data => {
    const successToastNotification = new ToastNotificationInitializer();
    successToastNotification.setTitle(this.translate.instant('SUCCESS'));
    successToastNotification.setMessage(this.translate.instant('Password_Reset_Successfully'));
    successToastNotification.openToastNotification$();
    this.modelRef.close({ result: true, password: resetPasswordDto.confirmPassword });
  });
}


login(){
  this.modelRef.close({result:false});
}

}
