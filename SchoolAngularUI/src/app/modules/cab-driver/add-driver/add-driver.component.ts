import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js/';  
import { CountryMasterDto, StateMasterDto, DistrictMasterDto, TalukaMasterDto, CabDriverServiceProxy, MasterServiceProxy, CabDriverDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { ICabDriverUrlParameter } from '../cab-driver-url-parameter.interface';
@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit{
  
  cabDriverForm: FormGroup;
  submitted = false;
  academicYearId:number;
  schoolId:number;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];
  cabDriverId:number=0;
  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  cabDriverRouteDetail:ICabDriverUrlParameter;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private user:UserService,
    private cabDriverService:CabDriverServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private router:Router,
    private el: ElementRef
    ) {
     
    }

  ngOnInit(): void {
    this.cabDriverForm = this.formBuilder.group({
      cabDriverId:[0],
      firstName:[null,Validators.required],
      middleName:[null,Validators.required],
      lastName:[null,Validators.required],
      gender:[null,Validators.required],
      contactNumber:[null,[this.mobileNumberValidator()]],
      mobileNumber:[null,[Validators.required,this.mobileNumberValidator()]],
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
      schoolId:[null],
      drivingLicenceNumber:[null,Validators.required],
      ngbValidTill:[null,Validators.required],
      validTill:[null],
  });

  
  this.getMasterDropdownData();
  this.cabDriverForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.cabDriverForm.get('stateId')?.setValue(null);
    this.cabDriverForm.get('districtId')?.setValue(null);
    this.cabDriverForm.get('talukaId')?.setValue(null); 
  
  });

  this.cabDriverForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.cabDriverForm.get('districtId')?.setValue(null);
    this.cabDriverForm.get('talukaId')?.setValue(null); 
  });

  
  this.cabDriverForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.cabDriverForm.get('talukaId')?.setValue(null); 
  });

  this.cabDriverForm.get('isAppAccess')?.valueChanges.subscribe((value) => {
    const appAccessMobileNoControl = this.cabDriverForm.get('appAccessMobileNo');
    
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
      let day = this.cabDriverForm.get('ngbBirthDate')?.value.day.toString().length == 1 ? '0' + this.cabDriverForm.get('ngbBirthDate')?.value.day.toString() : this.cabDriverForm.get('ngbBirthDate')?.value.day.toString()
      let month = this.cabDriverForm.get('ngbBirthDate')?.value.month.toString().length == 1 ? '0' + this.cabDriverForm.get('ngbBirthDate')?.value.month.toString() : this.cabDriverForm.get('ngbBirthDate')?.value.month.toString()
      let oneTimePassword = this.cabDriverForm.get('firstName')?.value.toString()?.toUpperCase().trim() + day.toString() + month.toString();
      this.cabDriverForm.get('AppAccessOneTimePassword')?.setValue(oneTimePassword); 
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
            this.cabDriverForm.get('schoolId')?.setValue(this.schoolId);
            this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
              this.academicYearId=academicYearId as number;
               
            this.route.params.subscribe((data:any) =>{
              const queryParamValue = data.cabDriverRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                this.cabDriverRouteDetail=JSON.parse(decryptedString) as ICabDriverUrlParameter;
                this.cabDriverForm.get('cabDriverId')?.setValue(this.cabDriverRouteDetail.cabDriverId as number);
                this.cabDriverId=this.cabDriverRouteDetail.cabDriverId ;
                this.getCabDriverProfile();
              }
            
            });
        
             
          });
          });

    });

  


}


getCabDriverProfile(){
  if(this.cabDriverRouteDetail.cabDriverId && this.cabDriverRouteDetail.cabDriverId>0){
    this.cabDriverService.getCabDriverProfile(this.cabDriverRouteDetail.cabDriverId).
    subscribe((cabDriverDetail:CabDriverDto)=>{
      this.cabDriverForm.patchValue(cabDriverDetail);
  
      this.cabDriverForm.get('countryId')?.setValue(cabDriverDetail.countryId);
      this.cabDriverForm.get('stateId')?.setValue(cabDriverDetail.stateId);
      this.cabDriverForm.get('districtId')?.setValue(cabDriverDetail.districtId);
      this.cabDriverForm.get('talukaId')?.setValue(cabDriverDetail.talukaId);
    if(cabDriverDetail.profileBase64Image != undefined && cabDriverDetail.profileBase64Image!=null){
        this.base64ToBlob(cabDriverDetail.profileBase64Image as string,
          cabDriverDetail.profileImageContentType as string, 
          cabDriverDetail.profileImageURL as string).then(file => {
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
  get f() { return this.cabDriverForm.controls; }
  

  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  
  saveCabDriverProfile() {
    this.submitted = true;
    this.focusToInvalidControl(this.cabDriverForm);
    // stop here if form is invalid
    if (this.cabDriverForm.invalid) {
        return;
    }

    
   this.setKeyNameForCabDriverByIdForSearchable();
 
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      
      if(this.files[i].lastModified > 0){
        formData.append("file[]", this.files[i]);
      }
    }
    formData.append('cabDriverProfile',JSON.stringify(this.cabDriverForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/cabDriver/CabDriverProfileUpsert`, formData)

    .subscribe((result: any) => {
      if(this.cabDriverId > 0){
      this.cabDriverProfileUpdateSuccessNotification();

      this.router.navigate(['cab-drivers']);
      }
      else
      {
        this.cabDriverProfileAddedSuccessNotification();
  
        this.router.navigate(['cab-drivers']);
        }
      
   
    });
}


setKeyNameForCabDriverByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.cabDriverForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.cabDriverForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.cabDriverForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.cabDriverForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.cabDriverForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.cabDriverForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.cabDriverForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.cabDriverForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 
 cabDriverProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('CABDRIVER_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

cabDriverProfileAddedSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('CABDRIVER_PROFILE_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

  onReset() {
    const storedCabDriverId = this.cabDriverRouteDetail?.cabDriverId;
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
      this.cabDriverForm.reset({cabDriverId: storedCabDriverId});
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

files: File[] = [];

onSelect(event: { addedFiles: any; }) {
  this.files=[];
  this.cabDriverForm.controls['profileImageURL'].setValue('');
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



