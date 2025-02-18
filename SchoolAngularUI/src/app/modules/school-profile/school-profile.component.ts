import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';

import {TranslateService} from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AcademicYear, CountryMasterDto, DistrictMasterDto, MasterServiceProxy, MediumType, SchoolServiceProxy, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent implements OnInit {
  schoolProfileForm: FormGroup;
  submitted = false;
  
userName:string;
userRoleName:any;
schoolName : string;
academicYearId:number;
originalAcademicYearId : number;
  newAcademicYearId : number;
  
    constructor(
      private formBuilder: FormBuilder, 
      public translate: TranslateService,
      private schoolService:SchoolServiceProxy,
      private masterService:MasterServiceProxy,
      private httpClient:HttpClient,
      private userService:UserService,
      private router:Router,
      public sharedPermissionServiceService : SharedPermissionServiceService,
      private el: ElementRef) {  }  

  
    
    mediumTypeDropdownList: MediumType[]=[];

    countryDropdownList : CountryMasterDto[]=[];
    stateDropdownList : StateMasterDto[]=[];
    districtDropdownList : DistrictMasterDto[]=[];
    talukaDropdownList : TalukaMasterDto[]=[];
    stateFilteredDropdownList : StateMasterDto[];
    districtFilteredDropdownList: DistrictMasterDto[];
    talukaFilteredDropdownList: TalukaMasterDto[];

    academicYearDropdownList:AcademicYear[];
    schoolId : number;

  ngOnInit(): void {
    this.userService.getUser().subscribe(x=>{
      this.userName=x?.uname??'';
      this.schoolName=x?.schoolName??'';
      this.userRoleName=x?.roleDetails?.map(x=>x.roleName)??'';
    });
    this.schoolProfileForm = this.formBuilder.group({
      schoolId:[''],
      logoUrl:[''],
      schoolName: ['', Validators.required],
      schoolCode: [''],
      schoolCodeNo: [''],
      schoolMediumId: [null, Validators.required],
      schoolEmail: [null,[Validators.required,Validators.pattern("^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      schoolContactNo1: ['', Validators.required],
      schoolContactNo2: [''],
      schoolPermission: [''],
      schoolWebsiteUrl: [''],
      schoolDescription: [''],
      schoolAddressLine1: ['',Validators.required],
      schoolAddressLine2: [''],
      pincode: ['',Validators.required],
      countryId: [null,Validators.required],
      stateId: [null,Validators.required],
      districtId: [null,Validators.required],
      talukaId: [null,Validators.required],
      countryName  :[null],
      stateName  :[null],
      districtName  :[null],
      talukaName  :[null],
      registrationNumber: ['',Validators.required],
      schoolType: [''],
      udiseNumber: [''],
      board: ['',Validators.required],
      affiliationNumber: [''],
      hscOrSscIndexNo: [''],
      ngbEstablishmentDate:[null],
      academicYearId:[null,Validators.required],
      authorisedBy: [''],
      section: [''],
      contactPersonName: [''],
      contactPersonRole: [''],
      contactPersonEmail: ['',Validators.pattern("^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      contactPersonMobileNo: [''],

  });

 
  this.getMasterDropdownData();

  this.schoolProfileForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.schoolProfileForm.get('stateId')?.setValue(null);
    this.schoolProfileForm.get('districtId')?.setValue(null);
    this.schoolProfileForm.get('talukaId')?.setValue(null); 
  
  });

  this.schoolProfileForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.schoolProfileForm.get('districtId')?.setValue(null);
    this.schoolProfileForm.get('talukaId')?.setValue(null); 
  });

  
  this.schoolProfileForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.schoolProfileForm.get('talukaId')?.setValue(null); 
  });

  }


  getMasterDropdownData(){
    this.masterService.getAddressMasterData().subscribe(masterData=>{
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
       this.userService.getSchoolId().subscribe((schoolId:number|undefined)=>{
            this.schoolId = schoolId??0 as number;
            this.getSchoolProfile(schoolId??0 as number);
          });
       
       

    });

    this.masterService.getMediumTypeData().subscribe(masterData=>{
      this.mediumTypeDropdownList = masterData.mediumTypes;
    
  });

  this.masterService.getAcademicYearData().subscribe(masterData=>{
    this.academicYearDropdownList = masterData.academicYears;
  
});
  }


  // convenience getter for easy access to form fields
  get f() { return this.schoolProfileForm.controls; }

  getSchoolProfile(schoolId:number){
    this.schoolService.getSchoolProfile(schoolId).subscribe(schoolProfile=> {
      this.schoolProfileForm.patchValue(schoolProfile);
      this.schoolProfileForm.get('countryId')?.setValue(schoolProfile.countryId);
      this.schoolProfileForm.get('stateId')?.setValue(schoolProfile.stateId);
      this.schoolProfileForm.get('districtId')?.setValue(schoolProfile.districtId);
      this.schoolProfileForm.get('talukaId')?.setValue(schoolProfile.talukaId);
      this.schoolProfileForm.get('schoolMediumId')?.setValue(schoolProfile.schoolMediumId);
      this.schoolProfileForm.get('academicYearId')?.setValue(schoolProfile.academicYearId);
      this.originalAcademicYearId = schoolProfile.academicYearId!;
      if(schoolProfile.base64LogoImage != undefined && schoolProfile.base64LogoImage!=null){
        this.base64ToBlob(schoolProfile.base64LogoImage as string,
          schoolProfile.logoImageContentType as string, 
          schoolProfile.logoUrl as string).then(file => {
         this.files=[];
         this.files.push(file);
        }).catch(error => {
          console.error('An error occurred:', error);
        });
      }
      
    })
    
  }

   async base64ToBlob(base64Url:string, contentType:string,image:string) {
    const response = await fetch(base64Url);
    const data = await response.blob();
    return new File([data], image, { type: contentType, lastModified:-1 });
  }

  
setKeyNameForSchoolSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.schoolProfileForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.schoolProfileForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.schoolProfileForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.schoolProfileForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.schoolProfileForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.schoolProfileForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.schoolProfileForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.schoolProfileForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 focusToInvalidControl(formName :any){
  for (const key of Object.keys(formName.controls)) {
    if (formName.controls[key].invalid) {
      const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
      invalidControl.focus();
      break;
   }
  }
}

  onSubmit() {
      this.submitted = true;
      this.focusToInvalidControl(this.schoolProfileForm);
      // stop here if form is invalid
      if (this.schoolProfileForm.invalid) {
          return;
      }

      this.setKeyNameForSchoolSearchable();
      
      const formData = new FormData();
        for (var i = 0; i < this.files.length; i++) { 
          
          if(this.files[i].lastModified > 0){
            formData.append("file[]", this.files[i]);
          }
        }
        formData.append('schoolprofile',JSON.stringify(this.schoolProfileForm.getRawValue()))
        debugger;
        if(this.originalAcademicYearId > 0){
          let logoutAllUsers = false; 
           if(this.originalAcademicYearId != parseInt(this.schoolProfileForm.get('academicYearId')?.value)){
            logoutAllUsers = true;
           }
           if(logoutAllUsers == true){
            const newConfirmBox = new ConfirmBoxInitializer();
            newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
            newConfirmBox.setMessage(
              this.translate.instant('SCHOOL_SETTING_MESSAGE_AY')
            );
            newConfirmBox.setConfig({
              confirmLabel: this.translate.instant('YES'), // default confirmation button label
              declineLabel: this.translate.instant('NO'),
            });
            newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
            if(resp?.success){
             this.httpClient.post(`${environment.API_BASE_URL}/api/school/SchoolProfileUpsert`, formData)
            .subscribe((result:any) => {
              this.userService.setSchoolId(result as number);
              this.schoolProfileUpdateSuccessNotification();
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }, 500);
            })
            }
            });
           }
           else{
            this.httpClient.post(`${environment.API_BASE_URL}/api/school/SchoolProfileUpsert`, formData)
            .subscribe((result:any) => {
              this.userService.setSchoolId(result as number);
              this.schoolProfileUpdateSuccessNotification();
              this.router.navigate(['dashboard']);
            })
           }
        }
        else{
          const newConfirmBox = new ConfirmBoxInitializer();
            newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
            newConfirmBox.setMessage(
              this.translate.instant('SCHOOL_SETTING_MESSAGE_AY')
            );
            newConfirmBox.setConfig({
              confirmLabel: this.translate.instant('YES'), // default confirmation button label
              declineLabel: this.translate.instant('NO'),
            });
            newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
            if(resp?.success){
             this.httpClient.post(`${environment.API_BASE_URL}/api/school/SchoolProfileUpsert`, formData)
            .subscribe((result:any) => {
              this.userService.setSchoolId(result as number);
              this.schoolProfileUpdateSuccessNotification();
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }, 500);
            })
            }
            });
        }
        
 }

 schoolProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('School_Profile_Updated_Successfully'));
  newToastNotification.openToastNotification$();
}
onReset() {
  const storedSchoolId = this.schoolId;
  const storedSchoolCode = this.schoolProfileForm.get('schoolCode')?.value;
  const storedAcademicYearId = this.schoolProfileForm.get('academicYearId')?.value;
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
    this.schoolProfileForm.reset({schoolId : storedSchoolId, schoolCode : storedSchoolCode, academicYearId :storedAcademicYearId});
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

  onSelect(event : any) {
    this.files=[];
    this.schoolProfileForm.controls['logoUrl'].setValue('');
    this.files.push(event.addedFiles[0]);
  }
  
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
    this.schoolProfileForm.controls['logoUrl'].setValue('');
  }

  
  
  loadImage(url:string): Observable<Blob> {
    const headers = new HttpHeaders({
      Accept: 'image/*' // Set the Accept header to expect image types
    });
   return this.httpClient.get(url, { headers, responseType: 'blob' });
  }

  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }
}

