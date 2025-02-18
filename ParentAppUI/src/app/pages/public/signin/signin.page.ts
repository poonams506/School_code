import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { AuthServiceProxy, LoginDto, ResetPasswordRequestDto, UserLoginResponse } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { PasswordResetPage } from '../password-reset/password-reset.page';
import { ToastService } from 'src/app/services/toast/toast.service';
import { APP_TOKEN, StorageService } from 'src/app/services/storage/storage.service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, OnDestroy {
  isError : boolean = false;
  isLocationError:boolean=false;
  loginForm: FormGroup;
  showLoginPage = true;
  password: string = '';
  passwordVisible: boolean = false;
  appVersion:string;
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(
     @Inject(DOCUMENT) private document: Document,
     private formBuilder: FormBuilder,
     private authClient:AuthServiceProxy,
     private router:Router,
     public commonMethods:CommonMethodService,
     public translate: TranslateService,
     public userService:UserService,
     private modalController: ModalController,
     private toastService: ToastService,
     private routerOutlet: IonRouterOutlet,
     private storageService:StorageService,
     private fcmService:FcmService
    ) 
      {
       translate.addLangs(['en', 'hn', 'mr']);  
       translate.setDefaultLang('en'); 
       this.appVersion=environment.APP_VERSION;
      }

    ionViewDidEnter() {
     
      this.checkIfAlreadyLoggedIn();
       
      }

      checkIfAlreadyLoggedIn(){
        if(this.userService.isAuthenticated())
        {
          this.userService.getUser().subscribe(result=>{
            let roleId= localStorage.getItem("id");
            if(roleId && roleId!=''){
              let decryptedString=CryptoJS.AES.decrypt(roleId!, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
               if(decryptedString=="3"){
                this.router.navigate(['/teacher-app']);
              }
              else if(decryptedString=="5")
              {
                this.router.navigate(['/parent-app']);
              }
              else if(decryptedString=="6")
              {
                this.router.navigate(['/driver-app']);
              }
            }
          });
        
           
        }
      }

  ngOnInit() {
  this.loginForm = this.formBuilder.group({
    code: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fcmToken:['']
  });
  this.document.body.classList.add('login-page-body');
  this.translate.use('en');
  this.translate.setDefaultLang('en');
  this.checkIfAlreadyLoggedIn();
 
  }


  ionViewDidLeave() {
    this.document.body.classList.remove('login-page-body');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('login-page-body');
  }

  
get f(){
  return this.loginForm.controls;
}



async login(){
  this.loginForm.markAllAsTouched();
  if( this.loginForm.valid){
    const formData = this.loginForm.getRawValue() as LoginDto;
   this.authClient.applogin(formData).subscribe(async successResult =>
   {
    this.isError = false;
    if(successResult.isFirstTimeLogin){


      const modal = await this.modalController.create({
        component: PasswordResetPage,
        componentProps:{token:successResult.resetPasswordObj.token,schoolCode:formData.code},
        presentingElement: this.routerOutlet.nativeEl
      });
  
      await modal.present();
  
      // Apply filter from modal
      let { data } = await modal.onWillDismiss();
  
      if (data) {
        this.toastService.presentToast('Success', 'Password reset successfully', 'top', 'success', 2000);
      }
   }
   else{
    if(successResult.roles.length > 1){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(successResult), environment.ENCRYPTION_PASSWORD).toString();
   
      this.router.navigate(['/role',encryptedString], { replaceUrl: true });
    }
    else{
      let encryptedString=CryptoJS.AES.encrypt(successResult.roles[0].roleId?.toString()!, environment.ENCRYPTION_PASSWORD).toString();
      localStorage.setItem("id",encryptedString);
      this.userService.UserToken = successResult.token;
      this.storageService.setStorage("TOKEN",this.userService.UserToken);
      
      setTimeout(() => {
        if(successResult.roles[0].roleKey=="Teacher"){
          this.router.navigate(['/teacher-app']);
        }
        else if(successResult.roles[0].roleKey=="Parent")
        {
          this.router.navigate(['/parent-app']);
        }
        else if(successResult.roles[0].roleKey=="Cab_Driver")
        {
          this.router.navigate(['/driver-app']);
        }
      }, 500);
      
     
    }
   }

   if(Capacitor.getPlatform() !== 'web') {
    await this.fcmService.clearFCMTokenAndRemoveListener();
    await this.fcmService.registerPush();
  }
   
  
   },async error =>{
    this.isError = true;
    this.router.navigate(['/signin']);
    if(Capacitor.getPlatform() !== 'web') {
      await this.fcmService.clearFCMTokenAndRemoveListener();
    }
   }
   );
  }
  
}

isModalOpen = false;

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}
}
