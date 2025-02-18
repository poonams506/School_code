import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceProxy, ForgotPasswordRequestDto } from 'src/app/services/school-api-service';
import { TranslateService } from '@ngx-translate/core';
import Validation from 'src/app/utils/validation';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/'; 

@Component({
  selector: 'app-select-login-role',
  templateUrl: './select-login-role.component.html',
  styleUrls: ['./select-login-role.component.scss']
})
export class SelectLoginRoleComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
      private formBuilder: FormBuilder,
      private authClient:AuthServiceProxy,
      private router:Router,
      public translate: TranslateService,
    ) {
      this.selectRoleForm = this.formBuilder.group({
        roles:[],
        roleId:[null, [Validators.required]]
      });
}
submitted = false;
roles : any[]=[];
selectRoleForm: FormGroup;
modelRef:any;
// add class to login page body

ngOnInit() {
  this.roles = this.selectRoleForm.value.roles;
  this.document.body.classList.add('login-page-body');
}

ngOnDestroy() {
//this.document.body.classList.remove('login-page-body');
}


get f(){
  return this.selectRoleForm.controls;
}

onSubmit() {
  
  this.submitted = true;
  // stop here if form is invalid
  if (this.selectRoleForm.invalid) {
      return;
  }
  if(this.selectRoleForm.value.roleId > 0){
    let encryptedString=CryptoJS.AES.encrypt(this.selectRoleForm.value.roleId, environment.ENCRYPTION_PASSWORD).toString();
    localStorage.setItem("id",encryptedString);
    let refObj = this.roles.filter(x=>x.roleId == this.selectRoleForm.value.roleId)[0].refId;
    let encryptedStringRefId=CryptoJS.AES.encrypt(refObj.toString(), environment.ENCRYPTION_PASSWORD).toString();
    localStorage.setItem("refId",encryptedStringRefId);
    this.modelRef.close({result:true});
  }
  return;
}

login(){
  this.modelRef.close({result:false});
}

}
