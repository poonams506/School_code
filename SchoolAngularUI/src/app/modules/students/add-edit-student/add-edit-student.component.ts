import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { AcademicYear, CountryMasterDto, DistrictMasterDto, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, ParentDto, ParentServiceProxy, SchoolGradeDivisionMatrixDto, StateMasterDto, StudentDocumentDto, StudentDocumentServiceProxy, StudentDocumentTypeDto, StudentDto, StudentIdModelResponse, StudentServiceProxy, TalukaMasterDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { forEach } from 'jszip';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
class DocumentWithName {
  documentFiles : File[];
  name : string;
  uploadedDate : any;
}

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss'],
})
export class AddEditStudentComponent implements OnInit{
  allowedFileFormats: string[] = ['png', 'pdf', 'jpg', 'jpeg', 'bmp', 'avif'];
  active = 1;
  minDate = {year:new Date().getFullYear() - 100, month: 1, day: 1};
  maxDate = {year:new Date().getFullYear() + 10, month: 1, day: 1};
  isConcessionVisible: boolean = false;
  studentForm: FormGroup;
  studentFatherForm: FormGroup;
  studentMotherForm: FormGroup;
  studentGuardianForm: FormGroup;
  studentSubmitted = false;
  studentFatherSubmitted = false;
  studentMotherSubmitted = false;
  studentGuardianSubmitted = false;
  //studentRouteDetail:StudentIdModelResponse;
  studentId:number=0;
  fatherId:number=0;
  motherId:number=0;
  guardianId:number=0;
  academicYearId:number;
  schoolId:number;
  gradeId:any;
  divisionId:any;
  splitResult: string[];
  isViewMode:boolean;
  errorMessage : String;
  errorMessage2 : String;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];

  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];

  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];

  currentStateFilteredDropdownList : StateMasterDto[];
  currentDistrictFilteredDropdownList: DistrictMasterDto[];
  currentTalukaFilteredDropdownList: TalukaMasterDto[];

  stateFatherFilteredDropdownList : StateMasterDto[];
  districtFatherFilteredDropdownList: DistrictMasterDto[];
  talukaFatherFilteredDropdownList: TalukaMasterDto[];

  stateMotherFilteredDropdownList : StateMasterDto[];
  districtMotherFilteredDropdownList: DistrictMasterDto[];
  talukaMotherFilteredDropdownList: TalukaMasterDto[];

  stateGuardianFilteredDropdownList : StateMasterDto[];
  districtGuardianFilteredDropdownList: DistrictMasterDto[];
  talukaGuardianFilteredDropdownList: TalukaMasterDto[];

  divisionFilteredDropdownList: Division[];

  academicYearDropdownList:AcademicYear[];

 divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
 dtElement: DataTableDirective;
 

 
 dtTrigger: Subject<any> = new Subject();
 

  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private user:UserService,
    private studentService:StudentServiceProxy,
    private masterService:MasterServiceProxy,
    private parentService:ParentServiceProxy,
    private httpClient:HttpClient,
    private documentService:StudentDocumentServiceProxy,
    private toastEvokeService: ToastEvokeService,
    private router:Router,
    private el: ElementRef) {
     

    }

  defaultTheme() {
    this.themeService.setDefaultTheme();
  }

  theme1() {
    this.themeService.setLightTheme();
  }

  theme2() {
    this.themeService.setDarkTheme();
  }


  ngOnInit(): void {
  
    this.studentForm = this.formBuilder.group({
      studentId :[null],
      generalRegistrationNo  :[null],
      cbscStudentId :[],
      admissionNo  :[null],
      schoolId  :[null],
      firstName  :[null,Validators.required],
      middleName  :[null,Validators.required],
      lastName  :[null,Validators.required],
      gender  :[null,Validators.required],
      adharNo  :[null],
      religion  :[null],
      category  :[null],
      cast  :[null],
      subCast  :[null],
      nationality  :[null],
      motherTounge  :[null],
      emergencyContactPersonName  :[null],
      emergencyContactNumber  :[null,[this.mobileNumberValidator()]],
      familyDoctorName  :[null],
      familyDoctorContactNumber  :[null,[ this.mobileNumberValidator()]],
      birthPlace  :[null],
      birthDate  :[null],
      ngbBirthDate:[null,Validators.required],
      birthDateInWords  :[null],
      birthCountryId  :[null],
      birthStateId  :[null],
      birthDistrictId  :[null],
      birthTalukaId  :[null],
      birthCountryName  :[null],
      birthStateName  :[null],
      birthDistrictName  :[null],
      birthTalukaName  :[null],
      currentAddressLine1:[null],
      currentAddressLine2:[null],
      currentCountryId  :[null],
      currentStateId  :[null],
      currentDistrictId  :[null],
      currentTalukaId  :[null],
      currentCountryName  :[null],
      currentStateName  :[null],
      currentDistrictName  :[null],
      currentTalukaName  :[null],
      currentZipcode:[null],
      bloodGroup  :[null],
      height  :[null],
      weight  :[null],
      medicalHistory  :[null],
      admissionGrade  :[null],
      dateOfAdmission  :[null],
      ngbDateOfAdmission:[null],
      lastSchoolAttended  :[null],
      lastSchoolStandard  :[null],
      lastSchoolDivision  :[null],
      progressNoteFromLastSchool  :[null],
      conductNoteFromLastSchool  :[null],
      standardInWhichLastStudyingSection  :[null],
      sinceWhenStudyingInLastSchool  :[null],
      reasonOfLeavingSchoolLastSchool  :[null],
      dateOfLeavingLastSchool  :[null],
      ngbDateOfLeavingLastSchool :[null],
      remarkFromLastSchool  :[null],
      profileImageURL :[null],
      academicYearId :[null,Validators.required],
      classId:[null,Validators.required],
      gradeNameAdmission :[null],
      rollNumber :[null],
      fatherId:[null],
      motherId:[null],
      guardianId:[null],
      isNewStudent  :[false],
      isRTEStudent  :[false],
      isConsationApplicable  :[false],
      consationAmount  :[null],
      isArchive:[false],
      isAppAccess:[false],
      appAccessMobileNo:[null],
      AppAccessOneTimePassword:[null],
      addressLine1:[null],
      addressLine2:[null],
      documentId:[0],
      documentName:[null],
      documentURL :[null],
      doumentFileType:[null],
      previousAcademicYearPendingFeeAmount:[null]
     });

     this.studentFatherForm=this.formBuilder.group({
        parentId:[null],
        parentTypeId:[null],
        firstName:[null,Validators.required],
        middleName:[null,Validators.required],
        lastName:[null,Validators.required],
        gender:['M',Validators.required],
        contactNumber:[null,[ this.mobileNumberValidator()]],
        mobileNumber:[null,[ this.mobileNumberValidator()]],
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
        occupation:[null],
        annualIncome:[null],
        bloodGroup:[null],
        profileImageURL:[null],
        studentId:[null],

     });
     this.studentMotherForm=this.formBuilder.group({
      parentId:[null],
        parentTypeId:[null],
        firstName:[null,Validators.required],
        middleName:[null,Validators.required],
        lastName:[null,Validators.required],
        gender:['F',Validators.required],
        contactNumber:[null,[ this.mobileNumberValidator()]],
        mobileNumber:[null,[ this.mobileNumberValidator()]],
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
        occupation:[null],
        annualIncome:[null],
        bloodGroup:[null],
        profileImageURL:[null],
        studentId:[null],

     });
     this.studentGuardianForm=this.formBuilder.group({
      parentId:[null],
      parentTypeId:[null],
      firstName:[null,Validators.required],
      middleName:[null,Validators.required],
      lastName:[null,Validators.required],
      gender:[null,Validators.required],
      contactNumber:[null,[ this.mobileNumberValidator()]],
      mobileNumber:[null,[ this.mobileNumberValidator()]],
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
      occupation:[null],
      annualIncome:[null],
      bloodGroup:[null],
      profileImageURL:[null],
      studentId:[null],

     });

  this.getMasterDropdownData();

  this.studentForm.get('birthCountryId')?.valueChanges.subscribe((countryId:string) => {
    this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.studentForm.get('birthStateId')?.setValue(null);
    this.studentForm.get('birthDistrictId')?.setValue(null);
    this.studentForm.get('birthTalukaId')?.setValue(null); 
  
  });

  this.studentForm.get('birthStateId')?.valueChanges.subscribe((stateId:string) => {
    this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.studentForm.get('birthDistrictId')?.setValue(null);
    this.studentForm.get('birthTalukaId')?.setValue(null); 
  });

  
  this.studentForm.get('birthDistrictId')?.valueChanges.subscribe((districtId:string) => {
    this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.studentForm.get('birthTalukaId')?.setValue(null); 
  });

  this.studentForm.get('currentCountryId')?.valueChanges.subscribe((countryId:string) => {
    this.currentStateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
    this.studentForm.get('currentStateId')?.setValue(null);
    this.studentForm.get('currentDistrictId')?.setValue(null);
    this.studentForm.get('currentTalukaId')?.setValue(null); 
  
  });

  this.studentForm.get('currentStateId')?.valueChanges.subscribe((stateId:string) => {
    this.currentDistrictFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
    this.studentForm.get('currentDistrictId')?.setValue(null);
    this.studentForm.get('currentTalukaId')?.setValue(null); 
  });

  
  this.studentForm.get('currentDistrictId')?.valueChanges.subscribe((districtId:string) => {
    this.currentTalukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
    this.studentForm.get('currentTalukaId')?.setValue(null); 
  });

  this.studentForm.get('classId')?.valueChanges.subscribe((classId:string) => {
   
    if (classId) {
      const selectedClassId = this.studentForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
      
    }
  }
  });
  
  this.studentForm.get('isAppAccess')?.valueChanges.subscribe((value) => {
    const appAccessMobileNoControl = this.studentForm.get('appAccessMobileNo');
    
    if (value) {
      appAccessMobileNoControl?.setValidators([Validators.required, this.mobileNumberValidator()]);
    } else {
      appAccessMobileNoControl?.clearValidators();
    }
    appAccessMobileNoControl?.setValue(null);
    appAccessMobileNoControl?.updateValueAndValidity();
  });


    this.defaultTheme();


    this.studentFatherForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
      this.stateFatherFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.studentFatherForm.get('stateId')?.setValue(null);
      this.studentFatherForm.get('districtId')?.setValue(null);
      this.studentFatherForm.get('talukaId')?.setValue(null); 
    
    });
  
    this.studentFatherForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
      this.districtFatherFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.studentFatherForm.get('districtId')?.setValue(null);
      this.studentFatherForm.get('talukaId')?.setValue(null); 
    });
  
    
    this.studentFatherForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
      this.talukaFatherFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.studentFatherForm.get('talukaId')?.setValue(null); 
    });

  
    this.studentMotherForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
      this.stateMotherFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.studentMotherForm.get('stateId')?.setValue(null);
      this.studentMotherForm.get('districtId')?.setValue(null);
      this.studentMotherForm.get('talukaId')?.setValue(null); 
    
    });
  
    this.studentMotherForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
      this.districtMotherFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.studentMotherForm.get('districtId')?.setValue(null);
      this.studentMotherForm.get('talukaId')?.setValue(null); 
    });
  
    
    this.studentMotherForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
      this.talukaMotherFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.studentMotherForm.get('talukaId')?.setValue(null); 
    });

    
    
    this.studentGuardianForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
      this.stateGuardianFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.studentGuardianForm.get('stateId')?.setValue(null);
      this.studentGuardianForm.get('districtId')?.setValue(null);
      this.studentGuardianForm.get('talukaId')?.setValue(null); 
    
    });
  
    this.studentGuardianForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
      this.districtGuardianFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.studentGuardianForm.get('districtId')?.setValue(null);
      this.studentGuardianForm.get('talukaId')?.setValue(null); 
    });
  
    
    this.studentGuardianForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
      this.talukaGuardianFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.studentGuardianForm.get('talukaId')?.setValue(null); 
    });
  }

  getOneTimePassword(){
    try {
      let day = this.studentForm.get('ngbBirthDate')?.value.day.toString().length == 1 ? '0' + this.studentForm.get('ngbBirthDate')?.value.day.toString() : this.studentForm.get('ngbBirthDate')?.value.day.toString()
      let month = this.studentForm.get('ngbBirthDate')?.value.month.toString().length == 1 ? '0' + this.studentForm.get('ngbBirthDate')?.value.month.toString() : this.studentForm.get('ngbBirthDate')?.value.month.toString()
      let oneTimePassword = this.studentForm.get('firstName')?.value.toString()?.toUpperCase().trim() + day.toString() + month.toString();
      this.studentForm.get('AppAccessOneTimePassword')?.setValue(oneTimePassword); 
      return oneTimePassword;
    } catch (error) {
    }
  }
  
  getMasterDropdownData(){
   
    this.masterService.getAddressMasterData().subscribe(masterData=>{
          this.countryDropdownList = masterData.countryList as CountryMasterDto[];
          this.stateDropdownList = masterData.stateList as StateMasterDto[];
          this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
          this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[]
          this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
            this.academicYearId=academicYearId as number;
        this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
          this.gradeDropdownList=gradeMaster.grades as Grade[];
          this.divisionDropdownList=gradeMaster.divisions as Division[];
          this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
          this.user.getSchoolId().subscribe((schoolId:number|undefined)=>{
            this.schoolId=schoolId as number;
            this.studentForm.get('schoolId')?.setValue(this.schoolId);
            
               if(this.studentId <= 0 || this.studentId == undefined || this.studentId == null){
                this.studentForm.get('academicYearId')?.setValue(this.academicYearId); 
               }
            this.route.params.subscribe((data:any) =>{
        
              const queryParamValue = data.studentRouteParameter; 
              if(queryParamValue){
                let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
                let routeInfo = JSON.parse(decryptedString) as StudentIdModelResponse;
                this.studentId= routeInfo.studentId as number;
                this.isViewMode=JSON.parse(decryptedString).isViewMode as boolean;
                this.getStudentProfile();     
              } 
                            
            });       
          });
        });
      });      
      });

  

  this.masterService.getAcademicYearData().subscribe(masterData=>{
    this.academicYearDropdownList = masterData.academicYears;
  
});

}

getStudentProfile(){
  this.documentFiles = [];
  this.studentFiles=[];
  setTimeout(() => {
    if(this.studentId>0){
      this.studentService.getStudentProfile(this.studentId,this.academicYearId).
      subscribe((studentDetail:StudentDto)=>{
        this.fatherId=studentDetail.fatherId!;
        this.motherId=studentDetail.motherId!;
        this.guardianId=studentDetail.guardianId!;
        if(!this.fatherId || this.fatherId == undefined || this.fatherId == null){
          this.fatherId = 0;
        }
        if(!this.motherId || this.motherId == undefined || this.motherId == null){
          this.motherId = 0;
        }
        if(!this.guardianId || this.guardianId == undefined || this.guardianId == null){
          this.guardianId = 0;
        }
        this.studentForm.patchValue(studentDetail);
        this.studentForm.get('birthCountryId')?.setValue(studentDetail.birthCountryId);
        this.studentForm.get('birthStateId')?.setValue(studentDetail.birthStateId);
        this.studentForm.get('birthDistrictId')?.setValue(studentDetail.birthDistrictId);
        this.studentForm.get('birthTalukaId')?.setValue(studentDetail.birthTalukaId);
  
        this.studentForm.get('currentCountryId')?.setValue(studentDetail.currentCountryId);
        this.studentForm.get('currentStateId')?.setValue(studentDetail.currentStateId);
        this.studentForm.get('currentDistrictId')?.setValue(studentDetail.currentDistrictId);
        this.studentForm.get('currentTalukaId')?.setValue(studentDetail.currentTalukaId);
       
        this. gradeId = (studentDetail.gradeId);
        this. divisionId = (studentDetail.divisionId);
      const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.gradeId === this.gradeId && mapping.divisionId === this.divisionId);
      if (selectedClassMapping) {
       
        this.studentForm.get('classId')?.setValue(selectedClassMapping.schoolGradeDivisionMatrixId);
        
      }

        
        if(studentDetail.profileBase64Image != undefined && studentDetail.profileBase64Image!=null){
          this.base64ToBlob(studentDetail.profileBase64Image as string,
            studentDetail.profileImageContentType as string, 
            studentDetail.profileImageURL as string).then(file => {
           this.studentFiles=[];
           this.studentFiles.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }
        this.getDocument();
    });
    
    
      
        
    }
  }, 100);
  
 
}


getDocument(){
  
  this.documentService.getStudentDocumentList(this.studentId).subscribe((response)=>{
    this.documentFiles = [];
    for(const document of response.studentDocuments!){
    if(document.documentBase64Image != undefined && document.documentBase64Image!=null){
      this.base64ToBlob(document.documentBase64Image as string,
        document.documentFileType as string, 
        document.documentUrl as string).then(file => {
          let item = new DocumentWithName();
          item.documentFiles = [file];
          // item.name = this.studentForm.get('documentName')?.getRawValue();
          item.name = document.documentName;
          item.uploadedDate = document.uploadedDate;
          this.documentFiles.push(item);
      }).catch(error => {
        console.error('An error occurred:', error);
      });
    }
  }
  });
}

getFatherProfile(){
  
  if(this.fatherId && this.fatherId>0){
    this.parentService.getParentProfile(this.fatherId).subscribe((fatherDetail:ParentDto)=>{
      this.studentFatherForm.patchValue(fatherDetail);


      this.studentFatherForm.get('countryId')?.setValue(fatherDetail.countryId);
      this.studentFatherForm.get('stateId')?.setValue(fatherDetail.stateId);
      this.studentFatherForm.get('districtId')?.setValue(fatherDetail.districtId);
      this.studentFatherForm.get('talukaId')?.setValue(fatherDetail.talukaId);
      if(fatherDetail.profileBase64Image != undefined && fatherDetail.profileBase64Image!=null){
        this.base64ToBlob(fatherDetail.profileBase64Image as string,
          fatherDetail.profileImageContentType as string, 
          fatherDetail.profileImageURL as string).then(file => {
         this.studentFatherFiles=[];
         this.studentFatherFiles.push(file);
        }).catch(error => {
          console.error('An error occurred:', error);
        });
      }
    });
  }

}

getMotherProfile(){
 
  if(this.motherId && this.motherId>0){
    this.parentService.getParentProfile(this.motherId).subscribe((motherDetail:ParentDto)=>{
      this.studentMotherForm.patchValue(motherDetail);

  
      this.studentMotherForm.get('countryId')?.setValue(motherDetail.countryId);
      this.studentMotherForm.get('stateId')?.setValue(motherDetail.stateId);
      this.studentMotherForm.get('districtId')?.setValue(motherDetail.districtId);
      this.studentMotherForm.get('talukaId')?.setValue(motherDetail.talukaId);
     if(motherDetail.profileBase64Image != undefined && motherDetail.profileBase64Image!=null){
        this.base64ToBlob(motherDetail.profileBase64Image as string,
          motherDetail.profileImageContentType as string, 
          motherDetail.profileImageURL as string).then(file => {
         this.studentMotherFiles=[];
         this.studentMotherFiles.push(file);
        }).catch(error => {
          console.error('An error occurred:', error);
        });
      }
    });
  }

}

getGuardianProfile(){
 
  if(this.guardianId && this.guardianId>0){
    this.parentService.getParentProfile(this.guardianId).subscribe((guardianDetail:ParentDto)=>{
      this.studentGuardianForm.patchValue(guardianDetail);
  
      
      this.studentGuardianForm.get('countryId')?.setValue(guardianDetail.countryId);
      this.studentGuardianForm.get('stateId')?.setValue(guardianDetail.stateId);
      this.studentGuardianForm.get('districtId')?.setValue(guardianDetail.districtId);
      this.studentGuardianForm.get('talukaId')?.setValue(guardianDetail.talukaId);
     if(guardianDetail.profileBase64Image != undefined && guardianDetail.profileBase64Image!=null){
        this.base64ToBlob(guardianDetail.profileBase64Image as string,
          guardianDetail.profileImageContentType as string, 
          guardianDetail.profileImageURL as string).then(file => {
         this.studentGuardianFiles=[];
         this.studentGuardianFiles.push(file);
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
  get f() { return this.studentForm.controls; }
  get ff() { return this.studentFatherForm.controls; }
  get fm() { return this.studentMotherForm.controls; }
  get fg() { return this.studentGuardianForm.controls; }
  

  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }
  clearErrorMessage() {
    // Clear the error message when the input is cleared
    if (this.studentForm.get('generalRegistrationNo')?.value == '') {
      this.errorMessage = '';
      this.errorMessage2 = '';
    }
  }
  saveStudentProfile() {
    
    this.studentSubmitted = true;
    this.focusToInvalidControl(this.studentForm);
    // stop here if form is invalid
    if (this.studentForm.invalid) {
        return;
    }
    
   this.setKeyNameForStudentByIdForSearchable();

    const formData = new FormData();
    for (var i = 0; i < this.studentFiles.length; i++) { 
      
      if(this.studentFiles[i].lastModified > 0){
        formData.append("file[]", this.studentFiles[i]);
      }
    }
    formData.append('studentProfile',JSON.stringify(this.studentForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/student/StudentProfileUpsert`, formData)

    .subscribe((result: any) => {
      
      if(result.generalRegistrationNoAvailable==1 && result.updateFlag==0 )
        {
          this.errorMessage = "GENERAL_REGISTRATION_NO_AVAILABLE";
          if (this.errorMessage || this.studentForm.get('generalRegistrationNo')?.invalid) {
            const genRegNoNumberControl = this.el.nativeElement.querySelector('[formcontrolname="generalRegistrationNo"]');
            genRegNoNumberControl.focus();
          }
          return;
        }
      else if(result.updateFlag==0 && result.exist!=1 && result.studentPaymentExist==0){
        this.cantUpdateGradeDivision();
      }
      else if(result.updateFlag==0 && result.exist==0 && result.studentPaymentExist==1){
        this.cantUpdateRTEFlag();
      }
      else{
      if(result.exist==0 && result.exist==0 && result.updateFlag==1 && result.studentPaymentExist==0 ){
      if(this.studentId > 0){
        this.studentProfileUpdateSuccessNotification();
      }
      else{
        this.studentProfileInsertSuccessNotification();
        this.studentId = result.studentId;
        this.addDocument();
      }
    
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        result), environment.ENCRYPTION_PASSWORD).toString();
        
      this.router.navigate(['students/add-edit-student',encryptedString]);
      
      }
      else if(result.exist==1){
        this.existNotification();
      }
    }
     
    });
    

}




saveStudentFatherProfile(){
  
  this.studentFatherSubmitted = true;
  this.focusToInvalidControl(this.studentFatherForm);
  // stop here if form is invalid
  if (this.studentFatherForm.invalid) {
      return;
  }

  this.saveValidatedFatherProfile();
 

  
}


saveValidatedFatherProfile(){
  
  this.setKeyNameForFatherByIdForSearchable();
  this.studentFatherForm.get('studentId')?.setValue(this.studentId);
  this.studentFatherForm.get('parentId')?.setValue(this.fatherId);
  this.studentFatherForm.get('parentTypeId')?.setValue(11);
  const formData = new FormData();
  for (var i = 0; i < this.studentFatherFiles.length; i++) { 
    
    if(this.studentFatherFiles[i].lastModified > 0){
      formData.append("file[]", this.studentFatherFiles[i]);
    }
  }
  formData.append('parentProfile',JSON.stringify(this.studentFatherForm.getRawValue()))

  this.httpClient.post(`${environment.API_BASE_URL}/api/parent/ParentProfileUpsert`, formData)

  .subscribe((result:any) => {
   this.fatherId=result as number;
   this.studentFatherProfileUpdateSuccessNotification();
   this.GoToTab(12);
  });
}


saveStudentMotherProfile(){
  
  this.studentMotherSubmitted = true;
  this.focusToInvalidControl(this.studentMotherForm);
  // stop here if form is invalid
  if (this.studentMotherForm.invalid) {
      return;
  }
  this.saveValidatedMotherProfile();

 

}

saveValidatedMotherProfile(){
  this.setKeyNameForMotherByIdForSearchable();
  this.studentMotherForm.get('studentId')?.setValue(this.studentId);
  this.studentMotherForm.get('parentId')?.setValue(this.motherId);
  this.studentMotherForm.get('parentTypeId')?.setValue(12);
  const formData = new FormData();
  for (var i = 0; i < this.studentMotherFiles.length; i++) { 
    
    if(this.studentMotherFiles[i].lastModified > 0){
      formData.append("file[]", this.studentMotherFiles[i]);
    }
  }
  formData.append('parentProfile',JSON.stringify(this.studentMotherForm.getRawValue()))

  this.httpClient.post(`${environment.API_BASE_URL}/api/parent/ParentProfileUpsert`, formData)

  .subscribe((result:any) => {
    this.motherId=result as number;
   this.studentMotherProfileUpdateSuccessNotification();
   this.GoToTab(13);
  });
}


saveStudentGuardianProfile(){
  this.studentGuardianSubmitted = true;
  this.focusToInvalidControl(this.studentGuardianForm);
  // stop here if form is invalid
  if (this.studentGuardianForm.invalid) {
      return;
  }

  this.saveValidatedGuardianProfile();
  
 
}

saveValidatedGuardianProfile(){
  this.setKeyNameForGuardianByIdForSearchable();
  this.studentGuardianForm.get('studentId')?.setValue(this.studentId);
  this.studentGuardianForm.get('parentId')?.setValue(this.guardianId);
  this.studentGuardianForm.get('parentTypeId')?.setValue(13);
  const formData = new FormData();
  for (var i = 0; i < this.studentGuardianFiles.length; i++) { 
    
    if(this.studentGuardianFiles[i].lastModified > 0){
      formData.append("file[]", this.studentGuardianFiles[i]);
    }
  }
  formData.append('parentProfile',JSON.stringify(this.studentGuardianForm.getRawValue()))

  this.httpClient.post(`${environment.API_BASE_URL}/api/parent/ParentProfileUpsert`, formData)

  .subscribe((result:any) => {
    this.guardianId=result as number;
   this.studentGuardianProfileUpdateSuccessNotification();
    //  this.GoToTab(13);
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentId:this.studentId,
      fatherId:this.fatherId,
      motherId:this.motherId,
      guardianId:this.guardianId,
    }
  ),
   environment.ENCRYPTION_PASSWORD).toString();
    
this.router.navigate(['students/add-edit-student',encryptedString]);
  });
}

setKeyNameForStudentByIdForSearchable(){

 let countryList= this.countryDropdownList.filter(x=>x.countryId==this.studentForm.get('birthCountryId')?.value)
  if(countryList && countryList.length>0){
      if(countryList[0].countryKey){
        this.studentForm.get('birthCountryName')?.setValue(this.translate.instant(countryList[0].countryKey));
      }
  }

  let stateList= this.stateDropdownList.filter(x=>x.stateId==this.studentForm.get('birthStateId')?.value)
  if(stateList && stateList.length>0){
      if(stateList[0].stateKey){
        this.studentForm.get('birthStateName')?.setValue(this.translate.instant(stateList[0].stateKey));
      }
  }

  let districtList= this.districtDropdownList.filter(x=>x.districtId==this.studentForm.get('birthDistrictId')?.value)
  if(districtList && districtList.length>0){
      if(districtList[0].districtKey){
        this.studentForm.get('birthDistrictName')?.setValue(this.translate.instant(districtList[0].districtKey));
      }
  }

  let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.studentForm.get('birthTalukaId')?.value)
  if(talukaList && talukaList.length>0){
      if(talukaList[0].talukaKey){
        this.studentForm.get('birthTalukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
      }
  }

let currentCountryList= this.countryDropdownList.filter(x=>x.countryId==this.studentForm.get('currentCountryId')?.value)
  if(currentCountryList && currentCountryList.length>0){
      if(currentCountryList[0].countryKey){
        this.studentForm.get('currentCountryName')?.setValue(this.translate.instant(currentCountryList[0].countryKey));
      }
  }

  let currentStateList= this.stateDropdownList.filter(x=>x.stateId==this.studentForm.get('currentStateId')?.value)
  if(currentStateList && currentStateList.length>0){
      if(currentStateList[0].stateKey){
        this.studentForm.get('currentStateName')?.setValue(this.translate.instant(currentStateList[0].stateKey));
      }
  }

  let currentDistrictList= this.districtDropdownList.filter(x=>x.districtId==this.studentForm.get('currentDistrictId')?.value)
  if(currentDistrictList && currentDistrictList.length>0){
      if(currentDistrictList[0].districtKey){
        this.studentForm.get('currentDistrictName')?.setValue(this.translate.instant(currentDistrictList[0].districtKey));
      }
  }

  let currentTalukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.studentForm.get('currentTalukaId')?.value)
  if(currentTalukaList && currentTalukaList.length>0){
      if(currentTalukaList[0].talukaKey){
        this.studentForm.get('currentTalukaName')?.setValue(this.translate.instant(currentTalukaList[0].talukaKey));
      }
  }

}

setKeyNameForFatherByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.studentFatherForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.studentFatherForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.studentFatherForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.studentFatherForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.studentFatherForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.studentFatherForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.studentFatherForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.studentFatherForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

 setKeyNameForMotherByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.studentMotherForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.studentMotherForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.studentMotherForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.studentMotherForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.studentMotherForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.studentMotherForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.studentMotherForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.studentMotherForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }
 
 setKeyNameForGuardianByIdForSearchable(){

  let countryList= this.countryDropdownList.filter(x=>x.countryId==this.studentGuardianForm.get('countryId')?.value)
   if(countryList && countryList.length>0){
       if(countryList[0].countryKey){
         this.studentGuardianForm.get('countryName')?.setValue(this.translate.instant(countryList[0].countryKey));
       }
   }
 
   let stateList= this.stateDropdownList.filter(x=>x.stateId==this.studentGuardianForm.get('stateId')?.value)
   if(stateList && stateList.length>0){
       if(stateList[0].stateKey){
         this.studentGuardianForm.get('stateName')?.setValue(this.translate.instant(stateList[0].stateKey));
       }
   }
 
   let districtList= this.districtDropdownList.filter(x=>x.districtId==this.studentGuardianForm.get('districtId')?.value)
   if(districtList && districtList.length>0){
       if(districtList[0].districtKey){
         this.studentGuardianForm.get('districtName')?.setValue(this.translate.instant(districtList[0].districtKey));
       }
   }
 
   let talukaList= this.talukaDropdownList.filter(x=>x.talukaId==this.studentGuardianForm.get('talukaId')?.value)
   if(talukaList && talukaList.length>0){
       if(talukaList[0].talukaKey){
         this.studentGuardianForm.get('talukaName')?.setValue(this.translate.instant(talukaList[0].talukaKey));
       }
   }
 }

  studentProfileUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

studentProfileInsertSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('Student Profile Saved Successfully'));
  newToastNotification.openToastNotification$();
}

studentFatherProfileUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_FATHER_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


studentMotherProfileUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_MOTHER_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


studentGuardianProfileUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_GUARDIAN_PROFILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

studentDocumentFileUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_DOCUMENT_FILE_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}



onStudentReset() {
  const storedStudentId=this.studentId;
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
    this.studentSubmitted = false;
      this.studentFiles=[];
      this.studentForm.reset({studentId:storedStudentId});
      this.documentFiles=[];
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

  onStudentFatherReset() {
    const storedFatherId=this.fatherId;
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
    this.studentFatherSubmitted = false;
    this.studentFatherFiles=[];
    this.studentFatherForm.reset({fatherId:storedFatherId});
    this.resetNotification();
   }
  });
}


onStudentMotherReset() {
  const storedMotherId=this.motherId;
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
    this.studentMotherSubmitted = false;
  this.studentMotherFiles=[];
  this.studentMotherForm.reset({motherId:storedMotherId});
    this.resetNotification();
   }
  });
}

onStudentGuardianReset() {
  const storedGuardianId=this.guardianId;
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
    this.studentGuardianSubmitted = false;
  this.studentGuardianFiles=[];
  this.studentGuardianForm.reset({guardianId:storedGuardianId});
    this.resetNotification();
   }
  });
}


  studentFiles: File[] = [];

  onStudentImageSelect(event: { addedFiles: any; }) {
  //this.studentFiles.push(...event.addedFiles);
  this.studentFiles=[];
  this.studentForm.controls['profileImageURL'].setValue('');
  this.studentFiles.push(event.addedFiles[0]);
  }

onStudentImageRemove(event: File) {
  this.studentFiles.splice(this.studentFiles.indexOf(event), 1);
  
}
 
studentFatherFiles: File[] = [];

  onStudentFatherImageSelect(event: { addedFiles: any; }) {
  //this.studentFatherFiles.push(...event.addedFiles);
  this.studentFatherFiles=[];
  this.studentFatherForm.controls['profileImageURL'].setValue('');
  this.studentFatherFiles.push(event.addedFiles[0]);
}

onStudentFatherImageRemove(event: File) {
  this.studentFatherFiles.splice(this.studentFatherFiles.indexOf(event), 1);
}


studentMotherFiles: File[] = [];

  onStudentMotherImageSelect(event: { addedFiles: any; }) {
  //this.studentMotherFiles.push(...event.addedFiles);
  this.studentMotherFiles=[];
  this.studentMotherForm.controls['profileImageURL'].setValue('');
  this.studentMotherFiles.push(event.addedFiles[0]);
}

onStudentMotherImageRemove(event: File) {
  this.studentMotherFiles.splice(this.studentMotherFiles.indexOf(event), 1);
}


studentGuardianFiles: File[] = [];

  onStudentGuardianImageSelect(event: { addedFiles: any; }) {
  //this.studentGuardianFiles.push(...event.addedFiles);
  this.studentGuardianFiles=[];
  this.studentGuardianForm.controls['profileImageURL'].setValue('');
  this.studentGuardianFiles.push(event.addedFiles[0]);
}

onStudentMotherGuardianRemove(event: File) {
  this.studentGuardianFiles.splice(this.studentGuardianFiles.indexOf(event), 1);
}


GoToTab(tabNo:any, action : string = 'Back'){
  if(action == 'Next')
  {
    if (tabNo == 11){
      if (this.studentForm.invalid) {
        return;
      }
    } else if (tabNo == 12){
      if (this.studentFatherForm.invalid) {
        return;
      }
    } else if (tabNo == 13){
      if (this.studentMotherForm.invalid) {
        return;
      }
    } 
  }
  this.active=tabNo;
  this.getNavDataById();
}

getNavDataById(){
  if(this.active==1){
    this.getStudentProfile();
  }else if(this.active==11){
    this.getFatherProfile();
  }else if(this.active==12){
    this.getMotherProfile();
  }else if(this.active==13){
    this.getGuardianProfile();
  }

}

deleteStudentDocument(item:string){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant("Are you sure you want to delete") + ' "' + item+ '" document?'
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let index = this.documentFiles.findIndex(x=>x.name == item);
      this.documentFiles.splice(index, 1);
      this.studentForm.get('documentName')?.setValue('');
      if(this.studentId > 0){
        this.addDocument();
      }
     }
    });
}

studentDocumentDeleteSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_DOCUMENT_DELETE_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();

}
rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: any) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next(null);
  });
}
addDocument(){
 
  // for (const tempFile of this.temporaryFiles) {
  //   this.documentFiles.push(tempFile.document);
  // }
  this.studentForm.get('studentId')?.setValue(this.studentId);
  
  const formData = new FormData();
    for (var i = 0; i < this.documentFiles.length; i++) { 
         formData.append("label[]", this.documentFiles[i].name);
         formData.append("file[]", this.documentFiles[i].documentFiles[0]);
    }
    formData.append('studentDocuments',JSON.stringify(this.studentForm.getRawValue()))
    
    this.httpClient.post(`${environment.API_BASE_URL}/api/StudentDocument/StudentDocumentInsert`, formData)

    .subscribe((result: any) => {
      this.studentForm.get('documentName')?.setValue('');
      this.getStudentProfile();
    });
    this.studentForm.get('documentName')?.setValue('');
}

documentAddedSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_DOCUMENT_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

documentFiles : DocumentWithName[] = [];// [{documentFiles : File[], name : string}];
getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}
onDocumentImageSelect(event: { addedFiles: any }) {
  if (event.addedFiles.length == 0) {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('Warning'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('Invalid File Format'));
          newToastNotification.openToastNotification$();
    return;
  } 
  let item = new DocumentWithName();
  item.documentFiles = event.addedFiles;
  item.name = this.studentForm.get('documentName')?.getRawValue();
  item.uploadedDate = new Date();
  if(item.name == undefined || item.name == '' || item.name == null || (item.name && item.name.trim() == '')){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('Warning'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('Please enter document name'));
          newToastNotification.openToastNotification$();
    return;
  }
  this.documentFiles.push(item);
  this.studentForm.get('documentName')?.setValue('');
  if(this.studentId > 0){
    this.addDocument();
  }
}

  ImageRemove(event:File){
    this.documentFiles=[];
  }

  showImage(file : any){
    var blob = new Blob(file.documentFiles, { type: file.documentFiles[0].type });
     var url = window.URL.createObjectURL(blob);
     window.open(url, '_blank');
  }

  convertDateToWords(date: NgbDateStruct): string {
    if (!date) return '';

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const numWords = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
      'Twenty',
      'Twenty One',
      'Twenty Two',
      'Twenty Three',
      'Twenty Four',
      'Twenty Five',
      'Twenty Six',
      'Twenty Seven',
      'Twenty Eight',
      'Twenty Nine',
      'Thirty',
      'Thirty One',
    ];

    const tensWords = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    const nth = () => '';

    const day = date.day !== 0 ? numWords[date.day] || date.day : '';
    const month = months[date.month - 1];
    const year = date.year;
    // Convert year into words
    const yearInWords = this.convertYearToWords(year, numWords, tensWords);
    let dateInWord = `${day} ${month} ${yearInWords}`;
    this.studentForm.get('birthDateInWords')?.setValue(dateInWord);
    return dateInWord;
  }

  // Function to convert year into words
  convertYearToWords(
    year: number,
    numWords: string[],
    tensWords: string[]
  ): string {
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const tens = Math.floor((year % 100) / 10);
    const ones = year % 10;

    let yearInWords = '';

    if (thousands > 0) {
      yearInWords += numWords[thousands] + ' Thousand ';
    }

    if (hundreds > 0) {
      yearInWords += numWords[hundreds] + ' Hundred ';
    }

    if (tens > 1) {
      yearInWords += tensWords[tens] + ' ';
      if (ones > 0) {
        yearInWords += numWords[ones];
      }
    } else if (tens === 1) {
      yearInWords += numWords[tens * 10 + ones];
    } else if (ones > 0) {
      yearInWords += numWords[ones];
    }

    return yearInWords.trim();
  }
  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

  existNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_ADD');
    const message = this.translate.instant('STUDENT_EXIST');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    

  //this.toastEvokeService.danger('Failed to add!', 'Student already exist').subscribe();

  }

  cantUpdateGradeDivision(){
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_UPDATE');
    const message = this.translate.instant('PAYMENT_EXIST');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
  }
  cantUpdateRTEFlag(){
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_UPDATE');
    const message = this.translate.instant('PAYMENT_EXIST_FOR_RTE');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
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

