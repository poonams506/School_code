import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as CryptoJS from 'crypto-js/';
import { environment } from 'src/environments/environment';
import { UserLoginResponse, UserRolesDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RolePage implements OnInit {
  addClass = false;
  roles:UserRolesDto[];
  userLoginReponse:UserLoginResponse;

  form = new FormGroup({
    role: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private ref: ChangeDetectorRef,
     private toastService: ToastService,
     private route: ActivatedRoute,
     private userService:UserService,
     private storageService:StorageService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:any) =>{
      const queryParamValue = data.RoleList; 
      if(queryParamValue){
        let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        this.userLoginReponse=JSON.parse(decryptedString) as UserLoginResponse;
        this.roles=this.userLoginReponse.roles;
        
      }
    
    });
  }

  get f() {
    return this.form.controls;
  }

  getClassNameByRoleKey(roleKey:string){
    if(roleKey=='Parent'){
      return 'parent';
    }
    else if(roleKey=='Teacher')
    {
      return 'teacher';
    }
    else if(roleKey=='Cab_Driver')
    {
      return 'driver';
    }
    return '';
  }



  submit() {
    if(!this.form.valid){
      this.toastService.presentToast('Error', 'Please select your role', 'top', 'danger', 2000);
      return;
    }
    
   let roleId=  this.roles.filter(x=>x.roleKey==this.form.value.role).map(x=>x.roleId)[0];
   if(roleId>0){
    let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(roleId), environment.ENCRYPTION_PASSWORD).toString();
    this.userService.CurrentUserRoleId= encryptedString;
    this.userService.UserToken = this.userLoginReponse.token;
    this.storageService.setStorage("TOKEN",this.userService.UserToken);

    setTimeout(() => {
      this.userService.getUser(true).subscribe(userDetail=>{
       
        this.toastService.presentToast('Success', 'Welcome!,'+userDetail.userFullNameByRole, 'top', 'success', 2000);
      
        let radioValue = this.form.value;
        if (radioValue.role === 'Parent') {
          this.router.navigateByUrl('/parent-app');
         
        } else if (radioValue.role === 'Teacher') {
          this.router.navigateByUrl('/teacher-app');
        } else if (radioValue.role === 'Cab_Driver') {
          this.router.navigateByUrl('/driver-app');
    
        }
      });
    }, 500);

  
    


   }
   

  
 
  }

}
