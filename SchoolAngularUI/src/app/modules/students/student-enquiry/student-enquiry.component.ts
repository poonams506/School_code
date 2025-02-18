import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, StudentEnquiryDto, StudentEnquiryServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-student-enquiry',
  templateUrl: './student-enquiry.component.html',
  styleUrls: ['./student-enquiry.component.scss']
})
export class StudentEnquiryComponent {
  studentEnquiryForm:FormGroup
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  studentEnquiryList:StudentEnquiryDto[];
  StudentEnquiryId:number;
  academicYearId:number;
  isViewMode:boolean;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private studentEnquiryService:StudentEnquiryServiceProxy,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {}

  ngOnInit(): void {
    const that = this;
    //this.clearFilter();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      stateSave: true,
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
            environment.API_BASE_URL+"/api/StudentEnquiry/StudentEnquiryGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            that.studentEnquiryList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "desc" ]],
      columns: [
                { data: 'enquiryDate', searchable: true, orderable: true },
                { data: 'studentFullName', searchable: true, orderable: true },
                { data: 'fatherFullName', searchable: true, orderable: true },
                { data: 'adharNo', searchable: true, orderable: true },
                { data: 'className', searchable: true, orderable: true },
                { data: 'mobileNumber', searchable: true, orderable: true },
                { data: 'paidAmount', searchable: true, orderable: true },
                { data: 'paymentStatus', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };
  }

  studentEnquiryDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  studentEnquiryDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_STUDENT');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
  }

  confirmStudentEnquiryDelete(studentEnquiry:StudentEnquiryDto) {
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
      this.studentEnquiryService.studentEnquiryDelete(studentEnquiry.studentEnquiryId).subscribe(data=>{
        if(data.exist==0){
            this.studentEnquiryDeleteSuccessNotification();
            this.rerender(true); 
          }
          else{
            this.studentEnquiryDeleteUnSuccessNotification();
          }}
      );
     }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.dtTrigger.next(null);
    });
  }
  
  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // hard clear table first
      if(hardClear == true){
        dtInstance.state.clear();
      }
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
  
  addStudentEnquiry(){
    this.router.navigate(['students/add-edit-student-enquiry']);
  }

  addeditStudentEnquiry(studentEnquiry:StudentEnquiryDto){
    let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
      {
        studentEnquiryId:studentEnquiry.studentEnquiryId,
        academicYearId:this.academicYearId
    }), environment.ENCRYPTION_PASSWORD).toString();
  
    this.router.navigate(['students/add-edit-student-enquiry',encryptedString]);
 
}
viewStudentEnquiry(studentEnquiry:StudentEnquiryDto){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentEnquiryId:studentEnquiry.studentEnquiryId,
      academicYearId:this.academicYearId,
      isViewMode:true,
  }), environment.ENCRYPTION_PASSWORD).toString();

  this.router.navigate(['students/add-edit-student-enquiry',encryptedString]);

}
formatDate(date: any): string {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  if (date) {
    return new Date(date).toLocaleDateString('en-GB'); 
  } else {
    return ''; 
  }
}

pay(item : any){
  debugger;
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentEnquiryId:item.studentEnquiryId,
      academicYearId:this.academicYearId,
      dueAmount : item.dueAmount,
      intrestedClass:item.intrestedClass
  }), environment.ENCRYPTION_PASSWORD).toString();
 this.router.navigate(['registration-fee-management/registration-fee-payment',encryptedString]);
    
}

viewHistory (item : any){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      studentEnquiryId:item.studentEnquiryId,
      academicYearId:this.academicYearId,
  }), environment.ENCRYPTION_PASSWORD).toString();
  this.router.navigate(['registration-fee-management/registration-fee-history',encryptedString]);
  // let pageNo = 0;
  // this.dtElement.dtInstance.then((x)=>{
  //   pageNo = x.page.info().page;
  //   sessionStorage.setItem('academic-payment-search',x.search());
  //   sessionStorage.setItem('academic-payment-page-number',pageNo.toString());
  //   sessionStorage.setItem('academic-payment-student-id',item.studentId.toString());
  //   this.router.navigate(['fee-management/payment-history',encryptedString]);
  // });
  
}
}
