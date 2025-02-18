import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { CountryMasterDto, StateMasterDto, DistrictMasterDto, TalukaMasterDto, TeacherServiceProxy, MasterServiceProxy, TeacherDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { ITeacherUrlParameter } from '../teacher-url-parameter.interface';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit{
 
  teacherForm: FormGroup;
  submitted = false;
  academicYearId:number;
  schoolId:number;
  teacherId:number=0;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];

  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  teacherRouteDetail:ITeacherUrlParameter;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private user:UserService,
    private teacherService:TeacherServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private router:Router,
    private el: ElementRef
    ) {
     
    }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      teacherId:[0],
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
  this.teacherForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.teacherForm.get('stateId')?.setValue(null);
    this.teacherForm.get('districtId')?.setValue(null);
    this.teacherForm.get('talukaId')?.setValue(null); 
  
  });

  this.teacherForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.teacherForm.get('districtId')?.setValue(null);
    this.teacherForm.get('talukaId')?.setValue(null); 
  });

  
  this.teacherForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.teacherForm.get('talukaId')?.setValue(null); 
  });

  
    this.teacherForm.get('isAppAccess')?.valueChanges.subscribe((value) => {
      const appAccessMobileNoControl = this.teacherForm.get('appAccessMobileNo');
      
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
      let day = this.teacherForm.get('ngbBirthDate')?.value.day.toString().length == 1 ? '0' + this.teacherForm.get('ngbBirthDate')?.value.day.toString() : this.teacherForm.get('ngbBirthDate')?.value.day.toString()
      let month = this.teacherForm.get('ngbBirthDate')?.value.month.toString().length == 1 ? '0' + this.teacherForm.get('ngbBirthDate')?.value.month.toString() : this.teacherForm.get('ngbBirthDate')?.value.month.toString()
      let oneTimePassword = this.teacherForm.get('firstName')?.value.toString()?.toUpperCase().trim() + day.toString() + month.toString();
      this.teacherForm.get('AppAccessOneTimePassword')?.setValue(oneTimePassword); 
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
            this.teacherForm.get('schoolId')?.setValue(this.schoolId);
            this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
              this.academicYearId=academicYearId as number;
               
            this.route.params.subscribe((data:any) =>{
              const queryParamValue = data.teacherRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                this.teacherRouteDetail=JSON.parse(decryptedString) as ITeacherUrlParameter;
                this.teacherForm.get('teacherId')?.setValue(this.teacherRouteDetail.teacherId as number);
                this.teacherId=this.teacherRouteDetail.teacherId;
                this.getTeacherProfile();
              }
            
            });
        
             
          });
          });

    });

  


}


getTeacherProfile(){
  if(this.teacherRouteDetail.teacherId && this.teacherRouteDetail.teacherId>0){
    this.teacherService.getTeacherProfile(this.teacherRouteDetail.teacherId).
    subscribe((teacherDetail:TeacherDto)=>{
      this.teacherForm.patchValue(teacherDetail);
  
      this.teacherForm.get('countryId')?.setValue(teacherDetail.countryId);
      this.teacherForm.get('stateId')?.setValue(teacherDetail.stateId);
      this.teacherForm.get('districtId')?.setValue(teacherDetail.districtId);
      this.teacherForm.get('talukaId')?.setValue(teacherDetail.talukaId);
    if(teacherDetail.profileBase64Image != undefined && teacherDetail.profileBase64Image!=null){
        this.base64ToBlob(teacherDetail.profileBase64Image as string,
          teacherDetail.profileImageContentType as string, 
          teacherDetail.profileImageURL as string).then(file => {
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
  get f() { return this.teacherForm.controls; }
  
  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  
  saveTeacherProfile() {
    this.submitted = true;
    this.focusToInvalidControl(this.teacherForm);
    // stop here if form is invalid
    if (this.teacherForm.invalid) {
        return;
    }

    
   this.setKeyNameForTeacherByIdForSearchable();
 
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      
      if(this.files[i].lastModified > 0){
        formData.append("file[]", this.files[i]);
      }
    }
    formData.append('teacherProfile',JSON.stringify(this.teacherForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/teacher/TeacherProfileUpsert`, formData)

    .subscribe((result: any) => {
      if(this.teacherId > 0){
        this.teacherProfileUpdateSuccessNotification();
        this.router.navigate(['teachers']);
      }
      else{
    
      this.teacherProfileAddedSuccessNotification();

      this.router.navigate(['teachers']);
      }
   
    });
}


setKeyNameForTeacherByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.teacherForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.teacherForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.teacherForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.teacherForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.teacherForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.teacherForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.teacherForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.teacherForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 
 teacherProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('TEACHER_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
teacherProfileAddedSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('TEACHER_PROFILE_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

onReset() {
  const storedId=this.teacherRouteDetail?.teacherId;
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
    this.teacherForm.reset({teacherId:storedId});
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
  this.teacherForm.controls['profileImageURL'].setValue('');
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

