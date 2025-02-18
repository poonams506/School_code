import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ClerkDto, ClerkServiceProxy, CountryMasterDto, DistrictMasterDto, MasterServiceProxy, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { IClerkUrlParameter } from '../clerk-url-parameter.interface';
import { environment } from 'src/environments/environment';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html',
  styleUrls: ['./add-clerk.component.scss']
})
export class AddClerkComponent implements OnInit{
 
 
  clerkForm: FormGroup;
  submitted = false;
  academicYearId:number;
  schoolId:number;
  clerkId:number=0;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];

  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  clerkRouteDetail:IClerkUrlParameter;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private user:UserService,
    private clerkService:ClerkServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private router:Router,
    private el: ElementRef
    ) {
     
    }

  ngOnInit(): void {
    this.clerkForm = this.formBuilder.group({
      clerkId:[0],
      firstName:[null,Validators.required],
      middleName:[null,Validators.required],
      lastName:[null,Validators.required],
      gender:[null,Validators.required],
      contactNumber:[null,[this.mobileNumberValidator()]],
      mobileNumber:[null,[Validators.required,this.mobileNumberValidator()]],
      emailId:[null,Validators.pattern("^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
    ],
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
  this.clerkForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.clerkForm.get('stateId')?.setValue(null);
    this.clerkForm.get('districtId')?.setValue(null);
    this.clerkForm.get('talukaId')?.setValue(null); 
  
  });

  this.clerkForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.clerkForm.get('districtId')?.setValue(null);
    this.clerkForm.get('talukaId')?.setValue(null); 
  });

  
  this.clerkForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.clerkForm.get('talukaId')?.setValue(null); 
  });
  this.clerkForm.get('isAppAccess')?.valueChanges.subscribe((value) => {
    const appAccessMobileNoControl = this.clerkForm.get('appAccessMobileNo');
    
    if (value) {
      appAccessMobileNoControl?.setValidators([Validators.required,this.mobileNumberValidator()]);
    } else {
      appAccessMobileNoControl?.clearValidators();
    }
    appAccessMobileNoControl?.setValue(null);
    appAccessMobileNoControl?.updateValueAndValidity();
  });

  }

  getOneTimePassword(){
    try {
      let day = this.clerkForm.get('ngbBirthDate')?.value.day.toString().length == 1 ? '0' + this.clerkForm.get('ngbBirthDate')?.value.day.toString() : this.clerkForm.get('ngbBirthDate')?.value.day.toString()
      let month = this.clerkForm.get('ngbBirthDate')?.value.month.toString().length == 1 ? '0' + this.clerkForm.get('ngbBirthDate')?.value.month.toString() : this.clerkForm.get('ngbBirthDate')?.value.month.toString()
      let oneTimePassword = this.clerkForm.get('firstName')?.value.toString()?.toUpperCase().trim() + day.toString() + month.toString();
      this.clerkForm.get('AppAccessOneTimePassword')?.setValue(oneTimePassword); 
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
            this.clerkForm.get('schoolId')?.setValue(this.schoolId);
            this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
              this.academicYearId=academicYearId as number;
               
            this.route.params.subscribe((data:any) =>{
              const queryParamValue = data.clerkRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                this.clerkRouteDetail=JSON.parse(decryptedString) as IClerkUrlParameter;
                this.clerkForm.get('clerkId')?.setValue(this.clerkRouteDetail.clerkId as number);
                this.clerkId=this.clerkRouteDetail.clerkId ;
                this.getClerkProfile();
              }
            
            });
        
             
          });
          });

    });

  


}


getClerkProfile(){
  if(this.clerkRouteDetail.clerkId && this.clerkRouteDetail.clerkId>0){
    this.clerkService.getClerkProfile(this.clerkRouteDetail.clerkId).
    subscribe((clerkDetail:ClerkDto)=>{
      this.clerkForm.patchValue(clerkDetail);
  
      this.clerkForm.get('countryId')?.setValue(clerkDetail.countryId);
      this.clerkForm.get('stateId')?.setValue(clerkDetail.stateId);
      this.clerkForm.get('districtId')?.setValue(clerkDetail.districtId);
      this.clerkForm.get('talukaId')?.setValue(clerkDetail.talukaId);
    if(clerkDetail.profileBase64Image != undefined && clerkDetail.profileBase64Image!=null){
        this.base64ToBlob(clerkDetail.profileBase64Image as string,
          clerkDetail.profileImageContentType as string, 
          clerkDetail.profileImageURL as string).then(file => {
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
  get f() { return this.clerkForm.controls; }
  
  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  
  saveClerkProfile() {
    this.submitted = true;
    this.focusToInvalidControl(this.clerkForm);
    // stop here if form is invalid
    if (this.clerkForm.invalid) {
        return;
    }

    
   this.setKeyNameForClerkByIdForSearchable();
 
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      
      if(this.files[i].lastModified > 0){
        formData.append("file[]", this.files[i]);
      }
    }
    formData.append('clerkProfile',JSON.stringify(this.clerkForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/clerk/ClerkProfileUpsert`, formData)

    .subscribe((result: any) => {
      if(this.clerkId > 0){
      this.clerkProfileUpdateSuccessNotification();

      this.router.navigate(['clerks']);
      }
      else{
    
        this.clerkProfileAddedSuccessNotification();
  
        this.router.navigate(['clerks']);
        }
      
   
    });
}


setKeyNameForClerkByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.clerkForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.clerkForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.clerkForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.clerkForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.clerkForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.clerkForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.clerkForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.clerkForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 
 clerkProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('CLERK_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


clerkProfileAddedSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('CLERK_PROFILE_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

onReset() {
  const storedId=this.clerkRouteDetail?.clerkId;
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
    this.clerkForm.reset({clerkId:storedId});
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
  this.clerkForm.controls['profileImageURL'].setValue('');
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

