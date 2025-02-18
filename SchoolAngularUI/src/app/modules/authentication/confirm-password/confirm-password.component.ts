import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceProxy, ForgotPasswordRequestDto, ResetPasswordRequestDto } from 'src/app/services/school-api-service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
      private formBuilder: FormBuilder,
      private authClient:AuthServiceProxy,
      private router:Router,
      private route: ActivatedRoute
    ) {
}

confirmPasswordForm: FormGroup;
token:string;
// add class to login page body

ngOnInit() {
  this.route.params.subscribe(params => {
    // params is an object containing the route parameters
    this.token= params['token'];
    // do something with the id parameter
  });
  this.confirmPasswordForm = this.formBuilder.group({
    userpassword: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required,RxwebValidators.compare({fieldName:'userpassword' })]],
    schoolcode: ['', [Validators.required]],
  });
this.document.body.classList.add('login-page-body');
}

ngOnDestroy() {
this.document.body.classList.remove('login-page-body');
}


get f(){
  return this.confirmPasswordForm.controls;
}

resetPassword(){
  {
    this.confirmPasswordForm.markAllAsTouched();
  if( this.confirmPasswordForm.valid){
    const formData = this.confirmPasswordForm.value;
    let changePasswordDto:ResetPasswordRequestDto=new ResetPasswordRequestDto();
    changePasswordDto.schoolCode=formData.schoolcode;
    changePasswordDto.password=formData.userpassword;
    changePasswordDto.confirmPassword=formData.confirmpassword;
    changePasswordDto.token=this.token;
    this.authClient.changePassword(changePasswordDto).subscribe(data=>{
    
    });
  }
   
  }

}

}
