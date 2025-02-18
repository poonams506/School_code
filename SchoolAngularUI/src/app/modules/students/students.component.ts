
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';
import {Subject, forkJoin } from 'rxjs';
import * as CryptoJS from 'crypto-js/';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  utils, writeFile,WorkSheet,read ,write,WorkBook} from 'xlsx-js-style';


// import library classes
import {
  ToastEvokeService,
  ConfirmBoxInitializer,
  ToastNotificationInitializer} from '@costlydeveloper/ngx-awesome-popup';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { AcademicYear, AuthServiceProxy, CountryMasterDto, DatatableResponseModel, DistrictMasterDto, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, ResponseExportStudentDataDto, SchoolGradeDivisionMatrixDto, StateMasterDto, StudentDto, StudentExportDataDto, StudentExportServiceProxy, StudentServiceProxy, TalukaMasterDto } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { get } from 'jquery';
import { ImportStudentsFileComponent } from './import-students-file/import-students-file.component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { ErrorModalPopupComponent } from '../student-certificates/error-modal-popup/error-modal-popup.component';
import { forEach } from 'jszip';
import { NgxSpinnerService } from 'ngx-spinner';
import { Console } from 'console';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent  {
 
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  submitted = false;
  students: StudentDto[];
  studentForm: FormGroup;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeId:any;
  divisionId:any;
  isViewMode:boolean;
  studentExportData:StudentExportDataDto[]=[];
  countryDropdownList : CountryMasterDto[];
  stateDropdownList : StateMasterDto[];
  districtDropdownList : DistrictMasterDto[];
  talukaDropdownList : TalukaMasterDto[];

  dtTrigger: Subject<any> = new Subject();
  oneTimePwArray : string[] = [];

  hlighlightedStudentId = 0;

	constructor(
    private modalService: NgbModal,
    private toastEvokeService: ToastEvokeService,
    private translationService:TranslateLoader,
    public translate: TranslateService,
    private studentService:StudentServiceProxy,
    private http: HttpClient,
    private router:Router,
    private modalService1: NgbModal,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private authClient:AuthServiceProxy,
    private studentExportService:StudentExportServiceProxy,
  private ngxSpinner:NgxSpinnerService) {
	}

	
  expectedColumns1: { [key: string]: string } = { 
    
    Student_First_Name:'required' , Student_Middle_Name:'required' ,
    Student_Last_Name:'required' ,
    Gen_Reg_No:'required' ,
    Admission_No:'' ,Roll_No:'' ,Grade:'required' ,Division:'required',
   Admission_Date:'required' , 'CBSC_Student_Id':'' ,
    Gender :'required', Adhaar_No:'required' ,
   Religion:'required' , Category:'required' , Caste :'required', Sub_Caste:'required' , Nationality:'required' ,
    Mother_Tongue:'required' , Emergency_Contact_Person_Name:'required' , Emergency_Contact_No:'required' , Family_Doctor_Name:'' , 
    Family_Doctor_No:'' ,Birth_Place:'required' , Birth_Date:'required', Date_Of_Birth_In_Words :'', Birth_Country:'required',
    Birth_State:'required' ,  Birth_District:'required' ,   Birth_Taluka:'required', Current_Address_Line_1 :'required',
    Current_Address_Line_2:'' , Current_Pincode:'required' ,   Current_Country:'required' ,
    Current_State:'required' , Current_District:'required' , Current_Taluka:'required' , Blood_Group:'' , Height:'' , Weight :'',
    Medical_History_Notes:'' , Previous_School_Name :'', Previous_School_Standard:'' , Previous_School_Division:'' ,
    Progress_Note_From_Last_School:'' , Conduct_Note_From_Last_School:'' , Reason_of_Leaving_School:'' , Date_of_Leaving_of_Previous_School:'' ,
    Remark:'' , Is_New_Student:'' , Is_Deactive:'' , Is_RTE:'' , Apply_Concession :'', Concession_Fee:'' , Academic_Year:'required' ,PreviousAcademicYearPendingFeeAmount:'',
    Do_you_required_parent_mobile_app_access:'' , Mobile_Number_for_Application_Access:'' ,
    Father_First_Name:'required' , Father_Middle_Name :'required', Father_Last_Name:'required' ,Father_Gender:'required' ,
   Father_Mobile_No :'', Father_Alternate_Contact_No:'' , Father_Email_Id:'' , Father_Address_Line_1 :'', Father_Address_Line_2:'' ,
   Father_Country:'' , Father_State:'' , Father_District:'' , Father_Taluka:'' , Father_Pincode :'', Father_Adhaar_No:'',
   Father_Education :'', Father_Birth_Date:'' , Father_Occupation:'' , Father_Annual_Income:'' , Father_Blood_Group:'' ,
   Mother_First_Name:'required' , Mother_Middle_Name:'required' , Mother_Last_Name :'required', Mother_Gender :'required', Mother_Mobile_No :'',
   Mother_Alternate_Contact_No:'' , Mother_Email_Id:'' , Mother_Address_Line_1:'' , Mother_Address_Line_2:'' , Mother_Country :'',
   Mother_State :'', Mother_District:'' , Mother_Taluka :'', Mother_Pincode:'' , Mother_Adhaar_No :'', Mother_Education :'',
   Mother_Birth_Date :'', Mother_Occupation:'' ,Mother_Annual_Income:'' , Mother_Blood_Group :'',
   Guardian_First_Name:'' , Guardian_Middle_Name:'', Guardian_Last_Name:'', Guardian_Gender:'' ,
   Guardian_Mobile_No:'' ,Guardian_Alternate_Contact_No:'' ,
   Guardian_Email_Id:'', Guardian_Address_Line_1:' ',Guardian_Address_Line_2:'', Guardian_Country:'',Guardian_State:'',
   Guardian_District:'', Guardian_Taluka:'' , Guardian_Pincode :'', Guardian_Adhaar_No:'' , Guardian_Education:'' ,
   Guardian_Birth_Date:'' , Guardian_Occupation :'', Guardian_Annual_Income :'', Guardian_Blood_Group:''  
  } 
 
   ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      // gradeId :[null],
      // divisionId:[null]
      classId: [null], 
     });

     this.getLocalStorageFilter();
    const that = this;
    
   

this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  serverSide: true,
  searchDelay: 1000,
  language: {
    searchPlaceholder:this.translate.instant('SEARCH'),
search: '<i class="bi bi-search"></i>',
    lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",

    //lengthMenu:"Show entries MENU",
  },
  ajax: (getCustomerListModel: any, callback : any) => {
    that.http
      .post<DatatableResponseModel>(
        environment.API_BASE_URL+"/api/Student/GetStudentList",
        {getListModel:getCustomerListModel,academicYearId:this.academicYearId,gradeId:this.gradeId,
        divisionId:this.divisionId}
      ).subscribe(resp => {
        that.students = resp.data;
        callback({
          recordsTotal: resp.recordsTotal,
          recordsFiltered: resp.recordsFiltered,
          data: []
        });
      });
  },order: [[ 4, "asc" ]],
  columns: [ 
            { data: 'rollNumber', searchable: true, orderable: true },
            { data: 'fullName', searchable: true, orderable: true },
            { data: 'generalRegistrationNo',searchable:true,orderable:true  },
            { data: 'adharNo', searchable: true, orderable: true },
            { data: 'gradeName', searchable: true, orderable: true },
            { data: 'appAccessUserId',searchable:false,orderable:false  },
            { data: 'emergContactNo',searchable:false,orderable:false  },
            {data:null,searchable:false,orderable:false }]
};
  

   
  
  this.studentForm.get('gradeId')?.valueChanges.subscribe((gradeId:string) => {
    this.divisionFilteredDropdownList =[];
    let divisionList= this.divisionGradeMapping.filter(x=>x.gradeId===parseInt(gradeId)).map(x=>x.divisionId);
   if(divisionList && divisionList.length>0){
    this.divisionFilteredDropdownList = this.divisionDropdownList
    .filter(division => divisionList.includes(division.divisionId));
  
   }
   this.studentForm.get('divisionId')?.setValue(null); 
  });
    
    }
      
  getMasterDropdownData(){
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
      this.gradeDropdownList=gradeMaster.grades as Grade[];
      this.divisionDropdownList=gradeMaster.divisions as Division[];
      this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
      this.getLocalStorageFilter();
      
   });
  }
  
  getLocalStorageFilter(){
    let storedClassId = sessionStorage.getItem("StudentListing");
    if(storedClassId != null && storedClassId != undefined && storedClassId != ""){
      this.studentForm.get('classId')?.patchValue(storedClassId.split('_')[0]);
      this.gradeId = parseInt(storedClassId.split('_')[1]);
      this.divisionId = parseInt(storedClassId.split('_')[2]);
    }
  }

  deleteStudentConfirmBox(student:StudentDto) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.studentService.studentProfileDelete(student.studentId,this.academicYearId).subscribe(data=>{
        if(data.affectedRows>0){
         this.studentDeleteSuccessNotification();
         this.rerender(true); 
         }   
        else{
        this.studentDeleteSuccessUnNotification();
         }  
      
    });
     }
     
    });
  }

  studentDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  studentDeleteSuccessUnNotification()
  {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_STUDENT');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
  }
  


academicYearId:number;
ngAfterViewInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.getMasterDropdownData();
      this.dtTrigger.next(null);
      setTimeout(() => {
        this.setPage();
      }, 500);
  });
 
}
get f() { return this.studentForm.controls; }

searchStudent(){
  if(!this.studentForm.valid){
   return;
  }
  const selectedClassId = this.studentForm.get('classId')?.value;
  const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    sessionStorage.setItem('StudentListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
  }else {
    // If the selected class mapping is not found, set both gradeId and divisionId to null
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('StudentListing');
    sessionStorage.removeItem('student-page-number');
    sessionStorage.removeItem('student-student-id');
    sessionStorage.removeItem('student-search');
    this.hlighlightedStudentId = 0;
  }
 
  this.rerender();
}

onReset(){
  this.studentForm.reset();
  this.searchStudent();
  sessionStorage.removeItem('StudentListing');
  sessionStorage.removeItem('student-page-number');
    sessionStorage.removeItem('student-student-id');
    sessionStorage.removeItem('student-search');
    this.hlighlightedStudentId = 0;
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

rerender(hardClear : boolean = false): void {
  this.dtElement.dtInstance.then((dtInstance: any) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next(null);
  });
}


addStudent():void{
this.router.navigate(['students/add-edit-student']);

}

viewStudent(student:StudentDto):void{
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentId:student.studentId,
      isViewMode:true,
  }), environment.ENCRYPTION_PASSWORD).toString();

let pageNo = 0;
      this.dtElement.dtInstance.then((x)=>{
        pageNo = x.page.info().page;
        sessionStorage.setItem('student-search',x.search());
        sessionStorage.setItem('student-page-number',pageNo.toString());
        sessionStorage.setItem('student-student-id',student.studentId!.toString());
this.router.navigate(['students/add-edit-student',encryptedString]);
              });
}
editStudent(student:StudentDto):void{

  
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentId:student.studentId,
      }), environment.ENCRYPTION_PASSWORD).toString();

let pageNo = 0;
      this.dtElement.dtInstance.then((x)=>{
        pageNo = x.page.info().page;
        sessionStorage.setItem('student-search',x.search());
        sessionStorage.setItem('student-page-number',pageNo.toString());
        sessionStorage.setItem('student-student-id',student.studentId!.toString());
        this.router.navigate(['students/add-edit-student',encryptedString]);

              });
}
isImportDisabled=false;
importData(){
  this.isImportDisabled=true;

  const addressRequest =this.masterService.getAddressMasterData();
  const academicYearDataRequest =this.masterService.getAcademicYearData();

  forkJoin([addressRequest,academicYearDataRequest]).subscribe(data=>{
    const result=data[0];
    const Data=data[1];

    const modalRef = this.modalService.open(ImportStudentsFileComponent, { size: 'sm',backdrop:'static', centered: true });
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.componentInstance.countryDropdownList = result.countryList;
    modalRef.componentInstance.stateDropdownList = result.stateList;
    modalRef.componentInstance.districtDropdownList = result.districtList;
    modalRef.componentInstance.talukaDropdownList= result.talukaList;

    modalRef.componentInstance.grades= this.gradeDropdownList;
    modalRef.componentInstance.divisions= this.divisionDropdownList;
    modalRef.componentInstance.divisionGradeMapping=  this.divisionGradeMapping;
    modalRef.componentInstance.academicYearList=Data.academicYears as AcademicYear[]

    modalRef.result.then((result) => {
      if(result==true)
      {
       
        this.rerender();
  
      }
      this.isImportDisabled=false;
    }, (reason) => {
      this.isImportDisabled=false;
    });
  });

 
}

isExportDisabled=false;
ExportData(){
  this.isExportDisabled=true;
  this.masterService.getAddressMasterData().subscribe(masterData=>{
    this.countryDropdownList = masterData.countryList as CountryMasterDto[];
    this.stateDropdownList = masterData.stateList as StateMasterDto[];
    this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
    this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
    this.ExportDataWithCountryAndDistrict();
   });
}
ExportDataWithCountryAndDistrict(){

  this.studentExportService.exportStudentData(this.academicYearId).subscribe(masterData => {
    this.studentExportData = masterData.students!;
  
    this.studentExportData.forEach((student: any) => {
      if( student.isAppAccess || student.isNewStudent || student.isArchive || student.isRTEStudent || student.isConsationApplicable){
        const columnsToCheck = [
          { name: 'isAppAccess', value: 'Y' },
          { name: 'isNewStudent', value: 'Y' },
          { name: 'isArchive', value: 'Y' },
          { name: 'isRTEStudent', value: 'Y' },
          { name: 'isConsationApplicable', value: 'Y' },
          { name: 'isAppAccess', value: 'N' },
          { name: 'isNewStudent', value: 'N' },
          { name: 'isArchive', value: 'N' },
          { name: 'isRTEStudent', value: 'N' },
          { name: 'isConsationApplicable', value: 'N' }
        ];
        columnsToCheck.forEach((column) => {
          if (student[column.name] === column.name) {
            student[column.name] = this.translate.instant(column.name);
          }
        });
      }
      if( student.gender ||student.fatherGender || student.motherGender  || student.GuardianGender){
        const columnsToCheck = [
          { name: 'gender', value: 'M' },
          { name: 'fatherGender', value: 'M' },
          { name: 'motherGender', value: 'M' },
          { name: 'GuardianGender', value: 'M' },
          { name: 'gender', value: 'F' },
          { name: 'fatherGender', value: 'F' },
          { name: 'motherGender', value: 'F' },
          { name: 'GuardianGender', value: 'F' }
        ];

        columnsToCheck.forEach((column) => {
          if (student[column.name] === column.name) {
            student[column.name] = this.translate.instant(column.value);
          }
        });
    }
    });


   const headings1=[['Student_First_Name','Student_Middle_Name','Student_Last_Name','Gen_Reg_No','Admission_No','Roll_No','Grade','Division','Admission_Date','CBSC_Student_Id','Gender','Adhaar_No','Religion','Category','Caste','Sub_Caste','Nationality','Mother_Tongue','Emergency_Contact_Person_Name','Emergency_Contact_No','Family_Doctor_Name','Family_Doctor_No','Birth_Place','Birth_Date','Date_Of_Birth_In_Words','Birth_Country','Birth_State','Birth_District','Birth_Taluka','Current_Address_Line_1','Current_Address_Line_2','Current_Pincode','Current_Country','Current_State','Current_District','Current_Taluka','Blood_Group','Height','Weight','Medical_History_Notes','Previous_School_Name','Previous_School_Standard','Previous_School_Division','Progress_Note_From_Last_School','Conduct_Note_From_Last_School','Reason_of_Leaving_School','Date_of_Leaving_of_Previous_School','Remark','Is_New_Student','Is_Deactive','Is_RTE','Apply_Concession','Concession_Fee','Academic_Year','PreviousAcademicYearPendingFeeAmount','Do_you_required_parent_mobile_app_access','Mobile_Number_for_Application_Access','Father_First_Name','Father_Middle_Name','Father_Last_Name','Father_Gender','Father_Mobile_No','Father_Alternate_Contact_No','Father_Email_Id','Father_Address_Line_1','Father_Address_Line_2','Father_Country','Father_State','Father_District','Father_Taluka','Father_Pincode','Father_Adhaar_No','Father_Education','Father_Birth_Date','Father_Occupation','Father_Annual_Income','Father_Blood_Group','Mother_First_Name','Mother_Middle_Name','Mother_Last_Name','Mother_Gender','Mother_Mobile_No','Mother_Alternate_Contact_No','Mother_Email_Id','Mother_Address_Line_1','Mother_Address_Line_2','Mother_Country','Mother_State','Mother_District','Mother_Taluka','Mother_Pincode','Mother_Adhaar_No','Mother_Education','Mother_Birth_Date','Mother_Occupation','Mother_Annual_Income','Mother_Blood_Group','Guardian_First_Name','Guardian_Middle_Name','Guardian_Last_Name','Guardian_Gender','Guardian_Mobile_No','Guardian_Alternate_Contact_No','Guardian_Email_Id','Guardian_Address_Line_1','Guardian_Address_Line_2','Guardian_Country','Guardian_State','Guardian_District','Guardian_Taluka','Guardian_Pincode','Guardian_Adhaar_No','Guardian_Education','Guardian_Birth_Date','Guardian_Occupation','Guardian_Annual_Income','Guardian_Blood_Group']];
  const wb = utils.book_new();
  const ws: any = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws,headings1,{ origin: 'A1'})
  utils.sheet_add_json(ws, this.studentExportData, { origin: 'A2', skipHeader: true});

  Object.keys(this.expectedColumns1).forEach((key, index) => {
    // Check if the column is required
    if (this.expectedColumns1[key] === 'required') {
      // Set style for required columns
      let cell = ws[utils.encode_cell({ r: 0, c: index })];
      cell.s = {
        font: {
          bold: true,
          color: { rgb: 'FF0000' } // Red color for required columns
        }
      };
    }
    else{
      let cell = ws[utils.encode_cell({ r: 0, c: index })];
      cell.s = {
        font: {
          bold: true,
       }
      };
    }
  });
  utils.book_append_sheet(wb, ws, 'Students');

  
  const wsCountry: any = utils.json_to_sheet([]);
  this.countryDropdownList.forEach((country, index) => {
  let translatedCountry=this.translate.instant(country.countryKey!);
  utils.sheet_add_aoa(wsCountry, [[translatedCountry]], { origin: `A${index + 1}` });
  });
  utils.book_append_sheet(wb, wsCountry, 'CountryList');


// Add state list sheet
  const wsState: any = utils.json_to_sheet([]);
  this.stateDropdownList.forEach((state, index) => {
  let translatedState=this.translate.instant(state.stateKey!);
  utils.sheet_add_aoa(wsState, [[translatedState]], { origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsState, 'StateList');
  // Add district list sheet
  const wsDistrict: any = utils.json_to_sheet([]);
  this.districtDropdownList.forEach((district,index) => {
  let translatedDistrict=this.translate.instant(district.districtKey!);
  utils.sheet_add_aoa(wsDistrict, [[translatedDistrict]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsDistrict, 'DistrictList');

// Add taluka list sheet
  const wsTaluka: any = utils.json_to_sheet([]);
  this.talukaDropdownList.forEach((taluka,index) => {
  let translatedTaluka=this.translate.instant(taluka.talukaKey!);
  utils.sheet_add_aoa(wsTaluka, [[ translatedTaluka]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsTaluka, 'TalukaList');
  const genderList = [
    { name: 'Gender', key: 'M' },
    { name: 'Gender', key: 'F' },
  ];
  const wsGender: any = utils.json_to_sheet([]);
  genderList.forEach((gender,index) => {
  let translatedgender=this.translate.instant(gender.key);
  utils.sheet_add_aoa(wsGender, [[ translatedgender]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsGender, 'Gender');

  const checklist = [
    { name: 'check', key: 'Y' },
    { name: 'check', key: 'N' },
  ];
  const wsCheck: any = utils.json_to_sheet([]);
  checklist.forEach((check,index) => {
  let translatedCheck=this.translate.instant(check.key);
  utils.sheet_add_aoa(wsCheck, [[ translatedCheck]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsCheck, 'CheckBox');


  writeFile(wb, 'Student_Records.xlsx');
  this.isExportDisabled=false;

});
}

resetPassword(student:StudentDto ){
  const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('Are you sure you want reset password for ' + ""+ student.fullName + " student?" )
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      // let userNameEncrpty=CryptoJS.AES.encrypt(JSON.stringify(
      //   student.appAccessMobileNo), environment.ENCRYPTION_PASSWORD).toString();
      this.authClient.resetPasswordByAdmin(student.appAccessMobileNo, 5).subscribe(data=>{
        const modalRef = this.modalService1.open(ErrorModalPopupComponent, { size: 'lg',backdrop:'static' });
        // modalRef.componentInstance.requiredItemsArray= this.oneTimePwArray;
        modalRef.componentInstance.message = 'One time password for ' + ""+ student.fullName + " is "+ "<strong>" + data + "</strong>";
        modalRef.componentInstance.title = 'Password reset successfully!'
        modalRef.componentInstance.modelRef=modalRef;
        modalRef.result.then((result) => {
          if(result==true)
          {
          }
      });
     });
     }
     
    });
    
}

setPage(){
  this.dtElement.dtInstance.then((dtInstance: any) => {
    if(sessionStorage.getItem('student-page-number') && sessionStorage.getItem('student-page-number') != null
    && sessionStorage.getItem('student-page-number') != undefined &&
    sessionStorage.getItem('student-page-number') != ""){
      if(parseInt(sessionStorage.getItem('student-page-number')?.toString()!)){
        dtInstance.page(parseInt(sessionStorage.getItem('student-page-number')?.toString()!)).draw('page');
      }
    }
    if(sessionStorage.getItem('student-search') && sessionStorage.getItem('student-search') != null
    && sessionStorage.getItem('student-search') != undefined &&
    sessionStorage.getItem('student-search') != ""){
      if(sessionStorage.getItem('student-search')?.toString()!){
        dtInstance.search(sessionStorage.getItem('student-search')?.toString()!).draw();
      }
    }
  });
  if(sessionStorage.getItem('student-student-id') && sessionStorage.getItem('student-student-id') != null
    && sessionStorage.getItem('student-student-id') != undefined &&
    sessionStorage.getItem('student-student-id') != ""){
      if(parseInt(sessionStorage.getItem('student-student-id')?.toString()!)){
        this.hlighlightedStudentId = parseInt(sessionStorage.getItem('student-student-id')?.toString()!);
      }
    }
    
}

DownloadQRCodeSheet(){
  const classId=  this.studentForm.get('classId')?.value as number;
  this.studentService.getQRCodeDetailForAllStudent(this.academicYearId,classId??0).subscribe(result=>{
    window.open(result,"_");
});
}

DownloadQRCode(student:StudentDto){
  this.studentService.getQRCodeDetailByStudentId(student.studentId,this.academicYearId).subscribe(result=>{
       window.open(result,"_");
  });
}

// SendNotification(){
//   this.authClient.sendNotificationToAll().subscribe(result=>{
//     console.log("Notification Sent to All!")

//   });
// }

}
