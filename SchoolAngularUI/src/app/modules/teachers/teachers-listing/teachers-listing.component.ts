import { AcademicYear, AuthServiceProxy, CountryMasterDto, DatatableResponseModel, DistrictMasterDto, MasterServiceProxy, StateMasterDto, TalukaMasterDto, TeacherDto, TeacherExportDataDto, TeacherExportServiceProxy, TeacherServiceProxy } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { Component, OnInit, ViewChild } from '@angular/core';
import {  utils, writeFile} from 'xlsx-js-style';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, forkJoin } from 'rxjs';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { ErrorModalPopupComponent } from '../../student-certificates/error-modal-popup/error-modal-popup.component';
import { ImportTeacherFileComponent } from '../import-teacher-file/import-teacher-file.component';


@Component({
  selector: 'app-teachers-listing',
  templateUrl: './teachers-listing.component.html',
  styleUrls: ['./teachers-listing.component.scss']
})
export class TeachersListingComponent  implements OnInit{

  
 
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  teachers: TeacherDto[];
  dtTrigger: Subject<any> = new Subject();
  teacherExportData:TeacherExportDataDto[]=[];
  countryDropdownList : CountryMasterDto[];
  stateDropdownList : StateMasterDto[];
  districtDropdownList : DistrictMasterDto[];
  talukaDropdownList : TalukaMasterDto[];

  constructor( public translate: TranslateService,
    private http: HttpClient,
    private toastEvokeService: ToastEvokeService,
    private teacherService:TeacherServiceProxy,
    private router:Router,
    private modalService1: NgbModal,
    private authClient:AuthServiceProxy,
    private teacherExportServeice:TeacherExportServiceProxy,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService) {
  }

  expectedColumns1: { [key: string]: string } = { 
    
    First_Name:'required' ,Middle_Name :'required',Last_Name:'required' ,Gender:'required' ,
    Mobile_No :'required',Alternate_Contact_No:'' ,Email_Id:'' ,Address_Line_1 :'required',Address_Line_2:'' ,
    Country:'required' ,State:'required' ,District:'required' ,Taluka:'required' ,Pincode :'required',Adhaar_No:'',
    Education :'',Birth_Date:'required' , Blood_Group:'',IsAppAccess:'' , AppAccessMobileNo:'' 
    }
 ngOnInit(): void {
   
  this.getMasterData();
  const that = this;


  //this.clearFilter();

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
    ajax: (requestListModel: any, callback : any) => {
      that.http
        .post<DatatableResponseModel>(
          environment.API_BASE_URL+"/api/Teacher/GetTeacherList",
          {getListModel:requestListModel,academicYearId:1},{}
        ).subscribe(resp => {
          that.teachers = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [
              { data: 'teacherFullname', searchable: true, orderable: true },
              { data: 'gender', searchable: true, orderable: true },
              { data: 'mobileNumber', searchable: true, orderable: true },
              { data: 'address', searchable: true, orderable: true },
              { data: 'emailId', searchable: true, orderable: true },
              { data: 'appAccessUserId', searchable: false, orderable: false },
              {data:null,searchable:false,orderable:false }]
  };

  }
  
  
  
 
  teacherDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  teacherDeleteUnSuccessNotification(teacherGradeDivisionMappingCount:number,teacherSubjectMappingCount:number)
  {
  const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message1 = this.translate.instant('CLEAR_TEACHER_RECORD');
    const message2 = this.translate.instant('TEACHER_CLASS_MAPPING_EXIST');
    const message3= this.translate.instant('TEACHER_SUBJECT_MAPPING_EXIST_1');
 
    if(teacherGradeDivisionMappingCount>0 && teacherSubjectMappingCount>0){
      this.toastEvokeService.danger(title,message1).subscribe();

    }
    else{
      if(teacherGradeDivisionMappingCount>0)
      {
        this.toastEvokeService.danger(title,message2).subscribe();
      }
     else if (teacherSubjectMappingCount>0){
      this.toastEvokeService.danger(title,message3).subscribe();    }
    }
}
  confirmTeacherDelete(teacher:TeacherDto) {
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
       this.teacherService.teacherProfileDelete(teacher.teacherId).subscribe(data=>{
        
         if(data.affectedRows>0){
             this.teacherDeleteSuccessNotification();
             this.rerender(true); 
           }   
           else{
             this.teacherDeleteUnSuccessNotification(data.teacherGradeDivisionMappingCount, data.teacherSubjectMappingCount);
           }  
       }
       );
      }
     });
   }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
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

  teacherSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('TEACHER_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

 
  addTeacher(){
    this.router.navigate(['teachers/add-edit-teacher']);
  }
  
editTeacher(teacher:TeacherDto){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      teacherId:teacher.teacherId,
  }), environment.ENCRYPTION_PASSWORD).toString();

this.router.navigate(['teachers/add-edit-teacher',encryptedString]);
}

resetPassword(teacher:TeacherDto ){
  const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('Are you sure you want reset password for ' + ""+ teacher.teacherFullName + " teacher?" )
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
      this.authClient.resetPasswordByAdmin(teacher.appAccessMobileNo, 3).subscribe(data=>{
        const modalRef = this.modalService1.open(ErrorModalPopupComponent, { size: 'lg',backdrop:'static' });
        // modalRef.componentInstance.requiredItemsArray= this.oneTimePwArray;
        modalRef.componentInstance.message = 'One time password for ' + ""+ teacher.teacherFullName + " is "+ "<strong>" + data + "</strong>";
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

isImportDisabled=false;
importData(){
  this.isImportDisabled=true;

  const addressRequest =this.masterService.getAddressMasterData();
  const academicYearDataRequest =this.masterService.getAcademicYearData();
  forkJoin([addressRequest,academicYearDataRequest]).subscribe(data=>{
    const result=data[0];
    const Data=data[1];
    const modalRef = this.modalService1.open(ImportTeacherFileComponent, { size: 'sm',backdrop:'static', centered: true });
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.componentInstance.countryDropdownList = result.countryList;
    modalRef.componentInstance.stateDropdownList = result.stateList;
    modalRef.componentInstance.districtDropdownList = result.districtList;
    modalRef.componentInstance.talukaDropdownList= result.talukaList;

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
  this.teacherExportServeice.exportTeacherData().subscribe(masterData => {
    this.teacherExportData=masterData.teachers!;
    
    this.teacherExportData.forEach((teacher: any) => {
      if( teacher.isAppAccess=='Y'){
        teacher.isAppAccess = this.translate.instant('Y');
      }
      else{
      teacher.isAppAccess = this.translate.instant('N');
    }
      if( teacher.gender=='F'){
        teacher.gender = this.translate.instant('F');
      }
      else{
      teacher.gender = this.translate.instant('M');
    }
    });
    const headings1=[['First_Name','Middle_Name','Last_Name','Gender','Mobile_No','Alternate_Contact_No','Email_Id','Address_Line_1','Address_Line_2','Country','State','District','Taluka','Pincode','Adhaar_No','Education','Birth_Date','Blood_Group','IsAppAccess','AppAccessMobileNo',]]
    const wb = utils.book_new();
  const ws: any = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws,headings1,{ origin: 'A1'})
  utils.sheet_add_json(ws, this.teacherExportData, { origin: 'A2', skipHeader: true});

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
  utils.book_append_sheet(wb, ws, 'Teachers');
  
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
  utils.book_append_sheet(wb, wsCheck, 'AppAccess');



  writeFile(wb, 'Teacher_Records.xlsx');

  this.isExportDisabled=false;
});
}

getMasterData()
{
   this.masterService.getAddressMasterData().subscribe(masterData=>{
    this.countryDropdownList = masterData.countryList as CountryMasterDto[];
    this.stateDropdownList = masterData.stateList as StateMasterDto[];
    this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
    this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
      });
      
}


}
