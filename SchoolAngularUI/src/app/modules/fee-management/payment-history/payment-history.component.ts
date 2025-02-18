import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ViewHistoryComponent } from '../view-history/view-history.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicYear, DatatableResponseModel, FeePaymentSelectDto, FeePaymentServiceProxy, MasterServiceProxy } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/'; 
import { ConfirmBoxInitializer, DialogLayoutDisplay, IToastNotificationPublicResponse, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
 
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  feePayments: any[];

  dtTrigger: Subject<any> = new Subject();
  
  studentId : number;
  academicYearId : number;
  gradeId : number;
  divisionId : number;
  fetchedInfo : FeePaymentSelectDto;
  academicYearDropdownList:AcademicYear[]=[];

  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private route: ActivatedRoute,
    private feePaymentService:FeePaymentServiceProxy,
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
    if(this.studentId && this.studentId>0 && this.academicYearId && this.academicYearId > 0){
      this.feePaymentService.getFeePaymentSelect(this.academicYearId, this.studentId, this.gradeId, this.divisionId).
      subscribe((feePaymentDetail:FeePaymentSelectDto)=>{
       // this.paymentSummaryForm.patchValue(feePaymentDetail);
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
        this.studentId = decryptedValues.studentId as number;
        this.academicYearId = decryptedValues.academicYearId as number;
        this.gradeId = decryptedValues.gradeId as number;
        this.divisionId = decryptedValues.divisionId as number;
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
            environment.API_BASE_URL+"/api/FeePayment/GetFeePaymentHistoryGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId, gradeId : this.gradeId,
               divisionId:this.divisionId,studentId:this.studentId},{}
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
      columns: [{ data: 'installmentNumber', searchable: true, orderable: true },
                { data: 'invoiceNumber', searchable: true, orderable: true },
                { data: 'onlineTransactionDateTime', searchable: true, orderable: true },
                { data: 'paidAmount', searchable: true, orderable: true },
                { data: 'paymentTypeName', searchable: true, orderable: true },
                { data: 'chequeDate', searchable: true, orderable: true },
                { data: 'isChequeOrDDClear', searchable: true, orderable: true },
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
      this.router.navigate(['fee-management/view-payment']);
    }


  viewHistory(item : any){
    const modalRef = this.modalService.open(ViewHistoryComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.gradeId=this.gradeId;
    modalRef.componentInstance.divisionId=this.divisionId;
    modalRef.componentInstance.studentId=this.studentId;
    modalRef.componentInstance.feePaymentId=item.feePaymentId;
    modalRef.componentInstance.modelRef=modalRef;
  }

  clearCheque(item : any){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant("DO_YOU_WANT_TO_CLEAR_CHEQUE_NUMBER") + ' ' + item.onlineTransactionId +'?'
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.feePaymentService.clearCheque(item.feePaymentId).
      subscribe((result:boolean)=>{
        const newToastNotification = new ToastNotificationInitializer();
          newToastNotification.setTitle(this.translate.instant('SUCCESS'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('CHECK_CLEARED_SUCCESSFULLY'));
          newToastNotification.openToastNotification$();
        this.rerender();
      });
     }
    });
  }

  deleteFeePayment(item : any){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant("DO_YOU_WANT_TO_DELETE_INVOICE_NUMBER") + ' ' + item.invoiceNumber+ '?'
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.feePaymentService.feePaymentDelete(item.feePaymentId).
      subscribe((result:number)=>{
        if(result > 0){
          const newToastNotification = new ToastNotificationInitializer();
          newToastNotification.setTitle(this.translate.instant('SUCCESS'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('INVOICE_DELETED_SUCCESSFULLY'));
          newToastNotification.openToastNotification$();
          this.rerender();
        }
        else{
          const newToastNotification = new ToastNotificationInitializer();
          newToastNotification.setTitle(this.translate.instant('WARNING'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('YOU_CAN_NOT_DELETE_INVOICES_BECAUSE_DISCOUNT_HAS_BEEN_APPLIED_IF_STILL_YOU_WANT_TO_DELETE_THIS_INVOICE_THEN_PLEASE_DELETE_ALL_CORRESPONDING_INVOICE_FOR_APPLIED_DISCOUNT', item.invoiceNumber));
          newToastNotification.openToastNotification$();
        }
        
      });
     }
    });
  }
}
