import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AdminDto, AdminServiceProxy, CountryMasterDto, DistrictMasterDto, MasterServiceProxy, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { IAdminUrlParameter } from '../admin-url-parameter.interface';
import { environment } from 'src/environments/environment';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import * as CryptoJS from 'crypto-js/';  
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  
  adminForm: FormGroup;
  submitted = false;
  academicYearId:number;
  schoolId:number;
  adminId:number=0;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];

  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  adminRouteDetail:IAdminUrlParameter;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private user:UserService,
    private adminService:AdminServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private router:Router,
    private el: ElementRef
    ) {
     
    }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      adminId:[0],
      firstName:[null,Validators.required],
      middleName:[null,Validators.required],
      lastName:[null,Validators.required],
      gender:[null,Validators.required],
      contactNumber:[null,[this.mobileNumberValidator()]],
      mobileNumber:[null,[Validators.required,this.mobileNumberValidator() ]],
      emailId:[null,Validators.pattern("^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")],
      addressLine1:[null,Validators.required],
      addressLine2:[null],
      talukaId:[null,Validators.required],
      districtId:[null,Validators.required],
      stateId:[null,Validators.required],
      countryId:[null,Validators.required],
      countryName  :[null],
      stateName  :[null],
      districtName  :[null],
      talukaName  :[null],
      zipCode:[null,Validators.required],
      adharNumber:[null],
      education:[null],
      birthDate:[null],
      ngbBirthDate:[null,Validators.required],
      bloodGroup:[null],
      profileImageURL:[null],
      isAppAccess:[false],
      appAccessMobileNo:[null],
      AppAccessOneTimePassword:[null],
      schoolId:[null]
  });

  
  this.getMasterDropdownData();
  this.adminForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.adminForm.get('stateId')?.setValue(null);
    this.adminForm.get('districtId')?.setValue(null);
    this.adminForm.get('talukaId')?.setValue(null); 
  
  });

  this.adminForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.adminForm.get('districtId')?.setValue(null);
    this.adminForm.get('talukaId')?.setValue(null); 
  });

  
  this.adminForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.adminForm.get('talukaId')?.setValue(null); 
  });

  this.adminForm.get('isAppAccess')?.valueChanges.subscribe((value) => {
    const appAccessMobileNoControl = this.adminForm.get('appAccessMobileNo');
    
    if (value) {
      appAccessMobileNoControl?.setValidators([Validators.required,this.mobileNumberValidator() ]);
    } else {
      appAccessMobileNoControl?.clearValidators();
    }
    appAccessMobileNoControl?.setValue(null);
    appAccessMobileNoControl?.updateValueAndValidity();
  });
  }

  getOneTimePassword(){
    try {
      let day = this.adminForm.get('ngbBirthDate')?.value.day.toString().length == 1 ? '0' + this.adminForm.get('ngbBirthDate')?.value.day.toString() : this.adminForm.get('ngbBirthDate')?.value.day.toString()
      let month = this.adminForm.get('ngbBirthDate')?.value.month.toString().length == 1 ? '0' + this.adminForm.get('ngbBirthDate')?.value.month.toString() : this.adminForm.get('ngbBirthDate')?.value.month.toString()
      let oneTimePassword = this.adminForm.get('firstName')?.value.toString()?.toUpperCase().trim() + day.toString() + month.toString();
      this.adminForm.get('AppAccessOneTimePassword')?.setValue(oneTimePassword); 
      return oneTimePassword;
    } catch (error) {
    }
  }
  
  getMasterDropdownData(){
   
    this.masterService.getAddressMasterData().subscribe(masterData=>{
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
      
       this.user.getSchoolId().subscribe((schoolId:number|undefined)=>{
            this.schoolId=schoolId as number;
            this.adminForm.get('schoolId')?.setValue(this.schoolId);
            this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
              this.academicYearId=academicYearId as number;
               
            this.route.params.subscribe((data:any) =>{
              const queryParamValue = data.adminRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                this.adminRouteDetail=JSON.parse(decryptedString) as IAdminUrlParameter;
                this.adminForm.get('adminId')?.setValue(this.adminRouteDetail.adminId as number);
                this.adminId=this.adminRouteDetail.adminId;
                this.getAdminProfile();
              }
            
            });
        
             
          });
          });

    });

  


}


getAdminProfile(){
  if(this.adminRouteDetail.adminId && this.adminRouteDetail.adminId>0){
    this.adminService.getAdminProfile(this.adminRouteDetail.adminId).
    subscribe((adminDetail:AdminDto)=>{
      this.adminForm.patchValue(adminDetail);
  
      this.adminForm.get('countryId')?.setValue(adminDetail.countryId);
      this.adminForm.get('stateId')?.setValue(adminDetail.stateId);
      this.adminForm.get('districtId')?.setValue(adminDetail.districtId);
      this.adminForm.get('talukaId')?.setValue(adminDetail.talukaId);
    if(adminDetail.profileBase64Image != undefined && adminDetail.profileBase64Image!=null){
        this.base64ToBlob(adminDetail.profileBase64Image as string,
          adminDetail.profileImageContentType as string, 
          adminDetail.profileImageURL as string).then(file => {
         this.files=[];
         this.files.push(file);
        }).catch(error => {
          console.error('An error occurred:', error);
        });
      }
  
    });
  }
 
}

async base64ToBlob(base64Url:string, contentType:string,image:string) {
  const response = await fetch(base64Url);
  const data = await response.blob();
  return new File([data], image, { type: contentType, lastModified:-1 });
}

  // convenience getter for easy access to form fields
  get f() { return this.adminForm.controls; }
  

  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  
  saveAdminProfile() {
    this.submitted = true;
    this.focusToInvalidControl(this.adminForm);
    // stop here if form is invalid
    if (this.adminForm.invalid) {
        return;
    }

    
   this.setKeyNameForAdminByIdForSearchable();
 
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      
      if(this.files[i].lastModified > 0){
        formData.append("file[]", this.files[i]);
      }
    }
    formData.append('adminProfile',JSON.stringify(this.adminForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/admin/AdminProfileUpsert`, formData)

    .subscribe((result: any) => {
    
      this.adminProfileUpdateSuccessNotification();

      this.router.navigate(['admins']);
      
   
    });
}


setKeyNameForAdminByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.adminForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.adminForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.adminForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.adminForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.adminForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.adminForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.adminForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.adminForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 
 adminProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('ADMIN_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

onReset() {
  const storedId=this.adminRouteDetail?.adminId;
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
  newConfirmBox.setMessage(
    this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_CLEAR_THE_DATA')
  );
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'), // default confirmation button label
    declineLabel: this.translate.instant('NO'),
  });
  newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
   if(resp?.success){
    this.submitted = false;
    this.adminForm.reset({adminId:storedId});
    this.resetNotification();
   }
  });
 }

resetNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('RECORD_DATA_CLEARED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


  // image upload

files: File[] = [];

onSelect(event: { addedFiles: any; }) {
  this.files=[];
  this.adminForm.controls['profileImageURL'].setValue('');
  this.files.push(event.addedFiles[0]);
  
}

onRemove(event: File) {
  this.files.splice(this.files.indexOf(event), 1);
}
resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}
mobileNumberValidator() {
  return (control:any) => {
    const value = control.value;
    if (!value) {
      // Field is empty, return null to indicate validity
      return null;
    }

    const regex = /^[\d()+\-]+$/;
    const isValid = regex.test(value);
    return isValid ? null : { invalidMobileNumber: true };
  };
}

}
