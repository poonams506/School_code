import { Component, OnInit, OnDestroy, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthServiceProxy, ResetPasswordRequestDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})

export class PasswordResetPage implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
      private authClient:AuthServiceProxy,
      public translate: TranslateService,
      private modalCtrl: ModalController,
    ) {
      this.forgotPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required,Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required,RxwebValidators.compare({fieldName:'password'})]],
        schoolCode:[''],
        token:['']
      });
}
token:string;
schoolCode:string;
forgotPasswordForm: FormGroup;
isSubmitted:boolean=false;

passwordVisible: boolean = false;
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  confirmPasswordVisible: boolean = false;
  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

ngOnInit() {
  this.document.body.classList.add('reset-page-body');
  this.forgotPasswordForm.get('schoolCode').setValue(this.schoolCode);

  this.forgotPasswordForm.get('password').valueChanges.subscribe(() => {
    this.forgotPasswordForm.get('confirmPassword').updateValueAndValidity();
  });
}

get f(){
  return this.forgotPasswordForm.controls;
}

ChangePassword() {
  
  this.isSubmitted=true;
  
  if (this.forgotPasswordForm.invalid) {
      return;
  }

  let resetPasswordDto=this.forgotPasswordForm.getRawValue() as ResetPasswordRequestDto;
  resetPasswordDto.token=this.token;
  this.authClient.changePassword(resetPasswordDto).subscribe(()=>{
   return this.modalCtrl.dismiss(true, 'success');
  });

}

close() 
{
  return this.modalCtrl.dismiss(false, 'cancel');
}

ngOnDestroy(): void {
  this.document.body.classList.remove('reset-page-body');
}


}
