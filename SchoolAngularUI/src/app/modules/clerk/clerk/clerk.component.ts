import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AuthServiceProxy, ClerkDto, ClerkServiceProxy, DatatableResponseModel } from 'src/app/services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { ErrorModalPopupComponent } from '../../student-certificates/error-modal-popup/error-modal-popup.component';

@Component({
  selector: 'app-clerk',
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.scss']
})
export class ClerkComponent implements OnInit{

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  clerks: ClerkDto[];
  dtTrigger: Subject<any> = new Subject();

  constructor( private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private clerkService:ClerkServiceProxy,
    private http: HttpClient,
    private router:Router,
    private modalService1: NgbModal,
    private authClient:AuthServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService) {
  }

 ngOnInit(): void {
   
    
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
          environment.API_BASE_URL+"/api/Clerk/GetClerkList",
          {getListModel:requestListModel,academicYearId:1},{}
        ).subscribe(resp => {
          that.clerks = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [
              { data: 'fullname', searchable: true, orderable: true },
              { data: 'mobileNumber', searchable: true, orderable: true },
              { data: 'address', searchable: true, orderable: true },
              { data: 'emailId', searchable: true, orderable: true },
              { data: 'appAccessUserId', searchable: false, orderable: false },
              {data:null,searchable:false,orderable:false }]
  };
  }
  
  
  
 
  clerkDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  confirmClerkDelete(clerk:ClerkDto) {
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
       this.clerkService.clerkProfileDelete(clerk.clerkId).subscribe(data=>{
        
         if(data.affectedRows>0){
              this.clerkDeleteSuccessNotification();
              this.rerender(true); 
            }   
            else{
              this.clerkDeleteUnSuccessNotification();
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

  clerkSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('CLERK_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
 
  clerkDeleteUnSuccessNotification()
  {
    this.toastEvokeService.danger('FAILED_TO_DELETE_!', 'YOU_CAN_NOT_DELETE_THIS_RECORD').subscribe();

  }
  addClerk(){
    this.router.navigate(['clerks/add-edit-clerk']);
  }
  
editClerk(clerk:ClerkDto){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      clerkId:clerk.clerkId,
  }), environment.ENCRYPTION_PASSWORD).toString();

this.router.navigate(['clerks/add-edit-clerk',encryptedString]);
}


resetPassword(clerk:ClerkDto ){
  const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('Are you sure you want reset password for ' + ""+ clerk.fullName + " clerk?" )
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
      this.authClient.resetPasswordByAdmin(clerk.appAccessMobileNo, 4).subscribe(data=>{
        const modalRef = this.modalService1.open(ErrorModalPopupComponent, { size: 'lg',backdrop:'static' });
        // modalRef.componentInstance.requiredItemsArray= this.oneTimePwArray;
        modalRef.componentInstance.message = 'One time password for ' + ""+ clerk.fullName + " is "+ "<strong>" + data + "</strong>";
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
  

  
}
