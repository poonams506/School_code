import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ParentDto,CountryMasterDto, DistrictMasterDto, MasterServiceProxy, ParentServiceProxy, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { IParentUrlParameter } from '../parents-url-parameter.interface';
import { environment } from 'src/environments/environment';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent implements OnInit{
 
 
  parentForm: FormGroup;
  submitted = false;
  academicYearId:number;
  schoolId:number;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];

  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  parentRouteDetail:IParentUrlParameter;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private user:UserService,
    private parentService:ParentServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private router:Router,
    private el: ElementRef
    ) {
     
    }

  ngOnInit(): void {
    this.parentForm = this.formBuilder.group({
      parentId:[0],
      parentTypeId:[0],
      firstName:[null,Validators.required],
      middleName:[null,Validators.required],
      lastName:[null,Validators.required],
      gender:[null,Validators.required],
      contactNumber:[null,[this.mobileNumberValidator()]],
      mobileNumber:[null,[this.mobileNumberValidator()]],
      emailId:[null,Validators.pattern("^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")],
      addressLine1:[null],
      addressLine2:[null],
      talukaId:[null],
      districtId:[null],
      stateId:[null],
      countryId:[null],
      countryName  :[null],
      stateName  :[null],
      districtName  :[null],
      talukaName  :[null],
      zipcode:[null],
      adharNumber:[null],
      education:[null],
      birthDate:[null],
      ngbBirthDate:[null],
      bloodGroup:[null],
      profileImageURL:[null],
      annualIncome:[null],
      isAppAccess:[false],
      appAccessMobileNo:[null],
      AppAccessOneTimePassword:[null],
      schoolId:[null]
  });

  
  this.getMasterDropdownData();
  this.parentForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.parentForm.get('stateId')?.setValue(null);
    this.parentForm.get('districtId')?.setValue(null);
    this.parentForm.get('talukaId')?.setValue(null); 
  
  });

  this.parentForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.parentForm.get('districtId')?.setValue(null);
    this.parentForm.get('talukaId')?.setValue(null); 
  });

  
  this.parentForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.parentForm.get('talukaId')?.setValue(null); 
  });


  }


  getOneTimePassword(){
    return this.parentForm.get('AppAccessOneTimePassword')?.value;
   }
  
  getMasterDropdownData(){
    this.masterService.getAddressMasterData().subscribe(masterData=>{
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
      
       this.user.getSchoolId().subscribe((schoolId:number|undefined)=>{
            this.schoolId=schoolId as number;
            this.parentForm.get('schoolId')?.setValue(this.schoolId);
            this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
              this.academicYearId=academicYearId as number;
               
            this.route.params.subscribe((data:any) =>{
              const queryParamValue = data.parentRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                this.parentRouteDetail=JSON.parse(decryptedString) as IParentUrlParameter;
                this.parentForm.get('parentId')?.setValue(this.parentRouteDetail.parentId as number);
                this.getParentProfile();
              }
            
            });
        
             
          });
          });

    });

  


}


getParentProfile(){
  if(this.parentRouteDetail.parentId && this.parentRouteDetail.parentId>0){
    this.parentService.getParentProfile(this.parentRouteDetail.parentId).
    subscribe((parentDetail:ParentDto)=>{
      this.parentForm.patchValue(parentDetail);
      this.parentForm.get('parentId')?.setValue(this.parentRouteDetail.parentId as number);
      this.parentForm.get('countryId')?.setValue(parentDetail.countryId);
      this.parentForm.get('stateId')?.setValue(parentDetail.stateId);
      this.parentForm.get('districtId')?.setValue(parentDetail.districtId);
      this.parentForm.get('talukaId')?.setValue(parentDetail.talukaId);
    if(parentDetail.profileBase64Image != undefined && parentDetail.profileBase64Image!=null){
        this.base64ToBlob(parentDetail.profileBase64Image as string,
          parentDetail.profileImageContentType as string, 
          parentDetail.profileImageURL as string).then(file => {
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
  get f() { return this.parentForm.controls; }
  
  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  
  saveParentProfile() {
    debugger
    this.submitted = true;
    this.focusToInvalidControl(this.parentForm);
    // stop here if form is invalid
    if (this.parentForm.invalid) {
        return;
    }

    
   this.setKeyNameForParentByIdForSearchable();
 
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      
      if(this.files[i].lastModified > 0){
        formData.append("file[]", this.files[i]);
      }
    }
    formData.append('parentProfile',JSON.stringify(this.parentForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/Parent/ParentProfileUpsert`, formData)

    .subscribe((result: any) => {
      this.parentRouteDetail.parentId=result as number;
      this.parentProfileUpdateSuccessNotification();

      this.router.navigate(['parents']);
      
   
    });
}


setKeyNameForParentByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.parentForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.parentForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.parentForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.parentForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.parentForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.parentForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.parentForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.parentForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 
 parentProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('PARENT_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

onReset() {
  const storedId=this.parentRouteDetail?.parentId;
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
    this.parentForm.reset({parentId:storedId});
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
  debugger;
  this.files=[];
  this.parentForm.controls['profileImageURL'].setValue('');
  this.files.push(event.addedFiles[0]);
}

onRemove(event: File) {
  this.files.splice(this.files.indexOf(event), 1);
}

resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null" ){
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

