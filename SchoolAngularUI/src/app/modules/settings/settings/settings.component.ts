import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import { AcademicYear, MasterServiceProxy, MonthMasterDto, SchoolServiceProxy, SchoolSettingDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  active = 1;
  schoolSettingForm: FormGroup;
  submitted = false;
  academicYearDropdownList:AcademicYear[]=[]
  monthMasterDropdownList:MonthMasterDto[]=[]
  langaugeCodes:any[];
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  originalAcademicYearId : number;
  newAcademicYearId : number;
  originalLangCode : string;
  newLangCode : string;
  schoolId : number;
  monthPartYAxis: any[] = [];
  academicYearId:number;
  transportMonths: { month: number, year: number }[] = [];
  constructor(
    private router: Router, 
    public translate: TranslateService, 
    private formBuilder: FormBuilder,
    private schoolService:SchoolServiceProxy,
    private userService:UserService,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private el: ElementRef) {
     
    }
    
  ngOnInit(): void {
    this.langaugeCodes=[
      {id:'en',value:'English'},
      {id:'hn',value:'हिंदी'},
      {id:'mr',value:'मराठी'}
    ];
    this.schoolSettingForm = this.formBuilder.group({
          schoolId:[0],
          // academicYearId:[null,Validators.required],
          academicYearStartMonth:[null],
          ngbAcademicYearStartMonth:[null,Validators.required],
          invoiceNoPrefix:[null],
          invoiceNoStartNumber:[null],
          serialNoStartNumber:[null],
          accountNumber:[null],
          accountTypeId:[null],
          ifscCode:[null],
          accountName:[null],
          //schoolEmail:[null,[Validators.required,Validators.pattern("^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
          //schoolContactNo1:[null,Validators.required],
          langaugeCode:[null,Validators.required],
          isSharedTransport:[false],
          transportInvoiceNoPrefix:[null],
          transportInvoiceNoStartNumber:[null],
          additionalFeeInvoiceNoPrefix:[null],
          additionalFeeInvoiceNoStartNumber:[null],
          schoolKitInvoiceNoPrefix:[null],
          schoolKitInvoiceNoStartNumber:[null],
          registrationFeeInvoiceNoPrefix:[null],
          registrationFeeInvoiceNoStartNumber:[null],
          isFeeApplicableToStaff:[false],
          Jan:[false],
          Feb:[false],
          Mar:[false],
          Apr:[false],
          May:[false],
          Jun:[false],
          Jul:[false],
          Aug:[false],
          Sep:[false],
          Oct:[false],
          Nov:[false],
          Dec:[false],
          monthList:this.formBuilder.array([])
          
  });
  this.monthPartYAxis = [
    { id: 1, value: 'Jan' },
    { id: 2, value: 'Feb' },
    { id: 3, value: 'Mar' },
    { id: 4, value: 'Apr' },
    { id: 5, value: 'May' },
    { id: 6, value: 'Jun' },
    { id: 7, value: 'Jul' },
    { id: 8, value: 'Aug' },
    { id: 9, value: 'Sep' },
    { id: 10, value: 'Oct' },
    { id: 11, value: 'Nov' },
    { id: 12, value: 'Dec' },
  ];

  this.masterService.getAcademicYearData().subscribe(masterData=>{
    this.academicYearDropdownList = masterData.academicYears;
  
});

this.masterService.getMonthMasterList().subscribe(monthMasters=>{
  this.monthMasterDropdownList=monthMasters.monthMasters;
  
});
this.schoolSettingForm.get('ngbAcademicYearStartMonth')?.valueChanges.subscribe(value => {
  debugger;
  if (value) {
    const { year, month, day } = value;
    const momentDate = moment({ year, month: month - 1, day });
    if (momentDate.isValid()) {
      const startMonth = momentDate.month() + 1; // month() returns 0-11, so add 1 for 1-12
      const startYear = momentDate.year();
      this.resetTransportMonths();
      this.calculateTransportMonths(startMonth, startYear);
    }
  }
});

this.getSchoolSetting();

  }

  getSchoolSetting(){
    this.userService.getSchoolId().subscribe(schoolId=>{
      this.schoolId = schoolId!;
       this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
    this.academicYearId= academicYearId as number;
    });
    this.schoolService.getSchoolSettingProfile(schoolId,this.academicYearId).subscribe(setting=>{
      this.schoolSettingForm.patchValue(setting);
      this.schoolSettingForm.get('langaugeCode')?.setValue(setting.langaugeCode); 
      this.originalAcademicYearId = setting.academicYearId!;
      this.originalLangCode = setting.langaugeCode!;
      setting.monthList!.forEach(month => {
        let selectedMonth =  this.monthPartYAxis.find(d => d.id === month);
        this.schoolSettingForm.controls[selectedMonth.value].setValue(true);});
        const startMonth = setting.academicYearStartMonth!.month() + 1; 
        const startYear = setting.academicYearStartMonth!.year();
        this.calculateTransportMonths(startMonth, startYear);
    })
    });
   
  }
  resetTransportMonths() {
    debugger;
    this.transportMonths.forEach(month => {
      this.schoolSettingForm.controls[month.month].setValue(false);
    });
  }
  calculateTransportMonths(startMonth: number, startYear: number) {
    this.transportMonths = [];
    let currentYear = startYear;
    
    for (let i = 0; i < 12; i++) {
      let monthIndex = (startMonth - 1 + i) % 12;
      if (monthIndex === 0 && i !== 0) { // Increment year when monthIndex cycles back to January (0)
        currentYear++;
      }
      let month = this.monthPartYAxis[monthIndex].value;
      let year = parseInt(`${currentYear.toString().slice(-2)}`); // Use the last two digits of the year
      this.transportMonths.push({month,year});
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.schoolSettingForm.controls; }
  
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
    debugger;
      this.submitted = true;
      this.focusToInvalidControl(this.schoolSettingForm);
      // stop here if form is invalid
      if (this.schoolSettingForm.invalid) {
          return;
      }
      let inputParam = this.schoolSettingForm.getRawValue() as SchoolSettingDto;

       inputParam.monthList = [];
    this.monthPartYAxis!.forEach(month => {
    if (this.schoolSettingForm.get(month.value)?.getRawValue() === true) {// Create instance of SchoolMonthTypeDto
      inputParam.monthList.push(month.id);
      }
    });
    inputParam.academicYearId=this.academicYearId;
      if((this.originalLangCode && this.originalLangCode != undefined && this.originalLangCode != null && this.originalLangCode != '')){
        let logoutAllUsers = false; 
         if(this.originalLangCode != inputParam.langaugeCode){
          logoutAllUsers = true;
         }
         if(logoutAllUsers == true){
          const newConfirmBox = new ConfirmBoxInitializer();
          newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
          newConfirmBox.setMessage(
            this.translate.instant('SCHOOL_SETTING_MESSAGE')
          );
          newConfirmBox.setConfig({
            confirmLabel: this.translate.instant('YES'), // default confirmation button label
            declineLabel: this.translate.instant('NO'),
          });
          newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
          if(resp?.success){
            this.schoolService.schoolSettingUpsert(inputParam).subscribe(result=>{
              this.schoolProfileUpdateSuccessNotification();
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login']);
              }, 500);
           });
          }
          });
         }
         else{
            this.schoolService.schoolSettingUpsert(inputParam).subscribe(result=>{
            this.schoolProfileUpdateSuccessNotification();
         });
         }
      }
      else{
          this.schoolService.schoolSettingUpsert(inputParam).subscribe(result=>{
          this.schoolProfileUpdateSuccessNotification();
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
        this.schoolSettingForm.reset({schoolId : storedSchoolId});
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
  
    resetSelectList(f : any, item : string){
      debugger;
      if(f[item]?.getRawValue() == "null"){
        f[item]?.setValue(null); 
        return;
      }
    }
  
}
