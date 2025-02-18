import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryMasterDto, DistrictMasterDto, Division, EnquiryStatusDropdownDto, EnquiryTypeDropdownDto, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StateMasterDto, StudentEnquiryDto, StudentEnquiryServiceProxy, TalukaMasterDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-add-edit-student-enquiry',
  templateUrl: './add-edit-student-enquiry.component.html',
  styleUrls: ['./add-edit-student-enquiry.component.scss']
})
export class AddEditStudentEnquiryComponent {
  studentEnquiryForm: FormGroup;
  studentEnquiryId:number;
  academicYearId: number;
  submitted = false;
  errorMessage : String;
  modelRef: any;
  isViewMode:boolean;
  countryDropdownList : CountryMasterDto[]=[];
  stateDropdownList : StateMasterDto[]=[];
  districtDropdownList : DistrictMasterDto[]=[];
  talukaDropdownList : TalukaMasterDto[]=[];
  stateFilteredDropdownList : StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  enquiryTypeDropdownList:EnquiryTypeDropdownDto[];
  enquiryStatusDropdownList:EnquiryStatusDropdownDto[];

  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 100, month: 1, day: 1 };
   convertDateToWords(date: NgbDateStruct): string {
    if (!date) return '';
    return '';
    
  }

  constructor(
    private formBuilder: FormBuilder,
    private studentEnquiryService:StudentEnquiryServiceProxy,
    private userService: UserService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private httpClient: HttpClient,
    private el: ElementRef,
    private router:Router,
    private user:UserService,
    private toastEvokeService: ToastEvokeService,
    private masterService:MasterServiceProxy,
  ) { }
  today: NgbDateStruct;

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };
    this.studentEnquiryForm = this.formBuilder.group({
      academicYearId: [null],
      studentEnquiryId:[0],
      enquiryDate:[null],
      ngbEnquiryDate:[this.today,Validators.required],
      studentFirstName:[null,Validators.required],
      studentMiddleName:[null,Validators.required],
      studentLastName:[null,Validators.required],
      gender:[null,Validators.required],
      birthDate:[null],
      ngbBirthDate:[null,Validators.required],
      adharNo:[null],
      religion:[null],
      cast:[null],
      category:[null],
      nationality:[null],
      mobileNumber:[null],
      interestedClassId:[null,Validators.required],
      currentSchool:[null],
      currentClass:[null],
      nameOfSiblingInCurrentSchool:[null],
      fatherFirstName:[null,Validators.required],
      fatherMiddleName:[null,Validators.required],
      fatherLastName:[null,Validators.required],
      motherFirstName:[null],
      motherMiddleName:[null],
      motherLastName:[null],
      addressLine1:[null],
      addressLine2:[null],
      countryId:[null],
      countryName:[null],
      stateId:[null],
      stateName:[null],
      talukaId:[null],
      talukaName:[null],
      districtId:[null],
      districtName:[null],
      enquiryTypeId:[null],
      referenceBy:[null],
      enquiryStatusId:[null],
      emailId:[null]
    });
    this.getMasterDropdownData();

    this.route.params.subscribe((data: any) => {
      const queryParamValue = data.studentEnquiryId;

      if (queryParamValue) {
        
        let decryptedString = CryptoJS.AES.decrypt(queryParamValue, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        let decryptedValues = JSON.parse(decryptedString) as any;
        this.studentEnquiryId = decryptedValues.studentEnquiryId as number;
         this.academicYearId = decryptedValues.academicYearId as number;
         this.isViewMode=JSON.parse(decryptedString).isViewMode as boolean;
       this.getStuentEnquirySelect(); 
      }
    });
   
      this.studentEnquiryForm.get('countryId')?.valueChanges.subscribe((countryId:string) => {
      this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.studentEnquiryForm.get('stateId')?.setValue(null);
      this.studentEnquiryForm.get('districtId')?.setValue(null);
      this.studentEnquiryForm.get('talukaId')?.setValue(null); 
    
    });
      this.studentEnquiryForm.get('stateId')?.valueChanges.subscribe((stateId:string) => {
      this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.studentEnquiryForm.get('districtId')?.setValue(null);
      this.studentEnquiryForm.get('talukaId')?.setValue(null); 
    });
  
    
      this.studentEnquiryForm.get('districtId')?.valueChanges.subscribe((districtId:string) => {
      this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.studentEnquiryForm.get('talukaId')?.setValue(null); 
    });

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
         
            this.route.params.subscribe((data:any) =>{
        
              const queryParamValue = data.studentRouteParameter; 
           
              this.studentEnquiryService.getEnquiryTypeDropDown().subscribe(result => {
                this.enquiryTypeDropdownList = result.enquiryTypeDropdownList;
              });  

              this.studentEnquiryService.getEnquiryStatusDropDown().subscribe(result => {
                this.enquiryStatusDropdownList = result.enquiryStatusDropdownList;
              });  
              this.getStuentEnquirySelect(); 

            });       
          });
         });
      });      
    }

  getStuentEnquirySelect() {
    debugger;
    if (this.studentEnquiryId && this.studentEnquiryId > 0) {
      this.studentEnquiryService.studentEnquirySelect(this.studentEnquiryId)
        .subscribe((studentEnquiry: StudentEnquiryDto) => {
          this.studentEnquiryForm.patchValue(studentEnquiry);

          this.studentEnquiryForm.get('countryId')?.setValue(studentEnquiry.countryId);
      this.studentEnquiryForm.get('stateId')?.setValue(studentEnquiry.stateId);
      this.studentEnquiryForm.get('districtId')?.setValue(studentEnquiry.districtId);
      this.studentEnquiryForm.get('talukaId')?.setValue(studentEnquiry.talukaId);
        });
    }
  }

  get f() { return this.studentEnquiryForm.controls; }

  saveStudentEnquiryData() {
    debugger;
    this.submitted = true;
    this.focusToInvalidControl(this.studentEnquiryForm);
    if (this.studentEnquiryForm.invalid) {
      return;
    }
    const academicYearId = this.academicYearId;
    this.studentEnquiryForm.patchValue({ academicYearId });
    
    const formData = new FormData();
    formData.append('studentEnquiry', JSON.stringify(this.studentEnquiryForm.getRawValue()));
  
    this.httpClient.post(`${environment.API_BASE_URL}/api/StudentEnquiry/StudentEnquiryUpsert`, formData)
      .subscribe((result: any) => {
        
        if(result.exist==0 ){
        if(this.studentEnquiryId > 0){
          this.studentEnquiryUpdateSuccessNotification();
          this.router.navigate(['students/student-enquiry']);
        }
        else{
          this.studentEnquiryAddedSuccessNotification();
          this.studentEnquiryId = result.studentEnquiryId;
          this.router.navigate(['students/student-enquiry']);
        }
       
        
      }
      else if(result.exist==1){
        this.existNotification();
      }
      });
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

  close() {
    this.modelRef.close(false);
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

onReset() {
  const storedId = this.studentEnquiryId;
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('Confirm'));
  newConfirmBox.setMessage(this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_CLEAR_THE_DATA'));
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'),
    declineLabel: this.translate.instant('NO'),
  });
  newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
    if (resp?.success) {
      this.submitted = false;
      this.studentEnquiryForm.reset({ studentEnquiryId: storedId});
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

  studentEnquiryAddedSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_ENQUIRY_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


studentEnquiryUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('STUDENT_ENQUIRY_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}
}
