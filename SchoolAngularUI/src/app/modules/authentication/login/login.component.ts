import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceProxy, LoginDto, ResetPasswordRequestDto, UserLoginResponse } from 'src/app/services/school-api-service';
import { Router } from '@angular/router';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { UserService } from 'src/app/services/user-service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SelectLoginRoleComponent } from '../select-login-role/select-login-role.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // we used reactive forms and validations
  isEyeOpen:boolean=false;
  isError : boolean = false;
  isLocationError:boolean=false;
  loginForm: FormGroup;
  showLoginPage = true;
  constructor(
     private modalService: NgbModal,
      @Inject(DOCUMENT) private document: Document,
      private formBuilder: FormBuilder,
      private authClient:AuthServiceProxy,
      private router:Router,
      public commonMethods:CommonMethodService,
      public translate: TranslateService,
      public userService:UserService,
      config: NgbModalConfig) 
       {
        translate.addLangs(['en', 'hn', 'mr']);  
        translate.setDefaultLang('en'); 
        config.backdrop = 'static';
        config.keyboard = false;
       }
  
// add class to login page body

ngOnInit() {
  localStorage.clear();
  sessionStorage.clear();
  this.loginForm = this.formBuilder.group({
    code: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  this.document.body.classList.add('login-page-body');
  this.translate.use('en');
  this.translate.setDefaultLang('en');
}

ngOnDestroy() {
  this.document.body.classList.remove('login-page-body');
}

get f(){
  return this.loginForm.controls;
}


login(){
  
  this.loginForm.markAllAsTouched();
  if( this.loginForm.valid){
    const formData = this.loginForm.value;
    let loginDto:LoginDto=new LoginDto();
    loginDto.code=formData.code;
    loginDto.username=formData.username;
    loginDto.password=formData.password;
    
   this.authClient.webLogin(loginDto).subscribe((successResult : UserLoginResponse)=>
   {
    this.isError = false;
    
    if(successResult.isFirstTimeLogin){
       // reset password
       var resetModel = new ResetPasswordRequestDto();
       resetModel = successResult.resetPasswordObj; 
       const modalRef = this.modalService.open(ResetPasswordComponent, { size: 'lg',backdrop:'static' });
       modalRef.componentInstance.forgotPasswordForm.patchValue(resetModel);
       modalRef.componentInstance.modelRef=modalRef;
       modalRef.result.then((result) => {
         if(result.result==true)
         {
          this.document.body.classList.add('login-page-body');
          this.loginForm.value.password =  result.password;
          this.login();
         }
         else{
          this.router.navigate(['/login']);
         }
       }, (reason) => {
        this.router.navigate(['/login']);
       });
       //
    }
    else
    {
      successResult.roles= successResult.roles.filter(x=>x.roleId!= 5 && x.roleId!=6);
      if(successResult.roles.length > 1){
        // multiple code
        const modalRef = this.modalService.open(SelectLoginRoleComponent, { size: 'md',backdrop:'static', centered: true, },);
        modalRef.componentInstance.selectRoleForm.patchValue({roles: successResult.roles, roleId : null});
        modalRef.componentInstance.modelRef=modalRef;
        modalRef.result.then((result) => {
          if(result.result==true)
          {
           this.userService.clearUser();
           this.document.body.classList.add('login-page-body');
           this.userService.UserToken = successResult.token;
           this.translate.use(successResult.langaugeCode!);
           this.translate.setDefaultLang(successResult.langaugeCode!);
           let encryptedLangString=CryptoJS.AES.encrypt(successResult.langaugeCode!, environment.ENCRYPTION_PASSWORD).toString();
           localStorage.setItem("lang",encryptedLangString);
           this.router.navigate(['/dashboard']);
          }
          else{
           this.router.navigate(['/login']);
          }
        }, (reason) => {
         this.router.navigate(['/login']);
        });
        // end
      }
      else{
        let encryptedString=CryptoJS.AES.encrypt(successResult.roles[0].roleId?.toString()!, environment.ENCRYPTION_PASSWORD).toString();
        let encryptedStringRefId=CryptoJS.AES.encrypt(successResult.roles[0].refId?.toString()!, environment.ENCRYPTION_PASSWORD).toString();
        this.userService.clearUser();
        localStorage.setItem("id",encryptedString);
        localStorage.setItem("refId",encryptedStringRefId);
        this.userService.UserToken = successResult.token;
        this.translate.use(successResult.langaugeCode!);
        this.translate.setDefaultLang(successResult.langaugeCode!);
        let encryptedLangString=CryptoJS.AES.encrypt(successResult.langaugeCode!, environment.ENCRYPTION_PASSWORD).toString();
        localStorage.setItem("lang",encryptedLangString);
        this.router.navigate(['/dashboard']);
      }
    }
   },(error)=>{
    this.isError = true;
    this.router.navigate(['/login']);
   }
   );
  }
  
}

open(content: any) {
  this.modalService.open(content, { centered: true, size:'sm',  modalDialogClass: 'forgot-modal' });
}

}
