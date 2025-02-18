import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicYear, DatatableResponseModel, AdhocFeePaymentSelectDto, AdhocFeePaymentServiceProxy, MasterServiceProxy, RegistrationFeePaymentSelectDto, RegistrationFeePaymentServiceProxy, FeePaymentSelectDto, FeePaymentServiceProxy, StudentEnquiryServiceProxy, StudentEnquiryDto } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/'; 
import { ConfirmBoxInitializer, DialogLayoutDisplay, IToastNotificationPublicResponse, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { ViewRegistrationFeeHistoryComponent } from '../view-registration-fee-history/view-registration-fee-history.component';

  @Component({
    selector: 'app-registration-fee-history',
    templateUrl: './registration-fee-history.component.html',
    styleUrls: ['./registration-fee-history.component.scss']
  })
  export class RegistrationFeeHistoryComponent implements OnInit {
   
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    feePayments: any[];
  
    dtTrigger: Subject<any> = new Subject();
    
    studentEnquiryId : number;
    academicYearId : number;
    gradeId : number;
    divisionId : number;
    fetchedInfo : StudentEnquiryDto;
    academicYearDropdownList:AcademicYear[]=[];
  
    constructor(
      public translate: TranslateService, 
      private modalService: NgbModal,
      private http: HttpClient,
      private userService:UserService,
      private router:Router,
      private route: ActivatedRoute,
      private studentEnquiryService:StudentEnquiryServiceProxy,
      private registartionFeePaymentService:RegistrationFeePaymentServiceProxy,
      private masterService:MasterServiceProxy,
      public sharedPermissionServiceService : SharedPermissionServiceService
    ) {
  
    }
  
    getAcademicYearMasterData(){
      this.masterService.getAcademicYearData().subscribe(academicYear=>{
        this.academicYearDropdownList = academicYear.academicYears as AcademicYear[];
      })
    }
  
    getAcademicYearValue(){
      if(this.academicYearDropdownList.filter(x=>x.academicYearId == this.academicYearId).length>0)
      return this.academicYearDropdownList.filter(x=>x.academicYearId == this.academicYearId)[0].academicYearKey;
      else
      return null;
    }
  
    getStudentFeePayment(){
      if(this.studentEnquiryId && this.studentEnquiryId>0 && this.academicYearId && this.academicYearId > 0){
        this.studentEnquiryService.studentEnquirySelect(this.studentEnquiryId).
        subscribe((feePaymentDetail:StudentEnquiryDto)=>{
          this.fetchedInfo = feePaymentDetail;
  
        });
      }
    }
    ngOnInit(): void {
      this.route.params.subscribe((data:any) =>{
        const queryParamValue = data.studentRouteParameter; 
        if(queryParamValue){
          let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
          let decryptedValues = JSON.parse(decryptedString) as any;
          this.studentEnquiryId = decryptedValues.studentEnquiryId as number;
          this.academicYearId = decryptedValues.academicYearId as number;
          this.getAcademicYearMasterData();
          this.getStudentFeePayment();
        }
      });
      
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
        ajax: (requestListModel: any, callback : any) => {
          that.http
            .post<DatatableResponseModel>(
              environment.API_BASE_URL+"/api/RegistrationFeePayment/GetRegistrationFeePaymentHistoryGridList",
              {getListModel:requestListModel,academicYearId:this.academicYearId,studentEnquiryId:this.studentEnquiryId},{}
            ).subscribe(resp => {
              that.feePayments = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            },
            error=>{
         
            });
        },order: [[ 0, "asc" ]],
        columns: [{ data: 'registrationInvoiceNumber', searchable: true, orderable: true },
                  { data: 'onlineTransactionDateTime', searchable: true, orderable: true },
                  { data: 'paidAmount', searchable: true, orderable: true },
                  { data: 'paymentTypeName', searchable: true, orderable: true },
                  { data: 'onlineTransactionId', searchable: true, orderable: true },
                  {data:null,searchable:false,orderable:false }]
      };
    
      }
  
  
      
      ngAfterViewInit(): void {
        this.dtTrigger.next(null);
      }
      
      ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
      
      rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: any) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next(null);
        });
      }
  
      
      back (){
        this.router.navigate(['students/student-enquiry']);
      }
  
  
    viewHistory(item : any){
      debugger;
      const modalRef = this.modalService.open(ViewRegistrationFeeHistoryComponent, { size: 'lg',backdrop:'static' });
      modalRef.componentInstance.academicYearId=this.academicYearId;
      modalRef.componentInstance.studentEnquiryId=this.studentEnquiryId;
      modalRef.componentInstance.registrationFeeId=item.registrationFeeId;
      modalRef.componentInstance.modelRef=modalRef;
    }
  
    deleteNotification()
    {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('INVOICE_DELETED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }
    
    deleteFeePayment(item : any){
      debugger;
      const newConfirmBox = new ConfirmBoxInitializer();
      newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
      newConfirmBox.setMessage(
        this.translate.instant("DO_YOU_WANT_TO_DELETE_INVOICE_NUMBER") + ' ' + item.registrationInvoiceNumber+ '?'
      );
      newConfirmBox.setConfig({
        confirmLabel: this.translate.instant('YES'), // default confirmation button label
        declineLabel: this.translate.instant('NO'),
      });
      // Simply open the popup and observe button click
      newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
       if(resp?.success){
        this.registartionFeePaymentService.registrationFeePaymentDelete(item.registrationFeeId,this.academicYearId).subscribe(()=>
        {
            this.deleteNotification();
            this.rerender();
        });
       }
      });
    }
  }
  