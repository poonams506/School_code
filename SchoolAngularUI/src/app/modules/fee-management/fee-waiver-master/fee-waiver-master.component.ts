import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, FeeWavierTypeServiceProxy } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import { AddEditFeeWaiverMasterComponent } from '../add-edit-fee-waiver-master/add-edit-fee-waiver-master.component';
import { ToastNotificationInitializer, ConfirmBoxInitializer, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-fee-waiver-master',
  templateUrl: './fee-waiver-master.component.html',
  styleUrls: ['./fee-waiver-master.component.scss']
})
export class FeeWaiverMasterComponent implements OnInit{

  
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  feeWaiverTypes: any[];

  dtTrigger: Subject<any> = new Subject();


  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private userService:UserService,
    private feeWavierMasterService:FeeWavierTypeServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

  }

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

      //lengthMenu:"Show entries _MENU_",
    },
    ajax: (requestListModel: any, callback : any) => {
      that.http
        .post<DatatableResponseModel>(
          environment.API_BASE_URL+"/api/FeeWavierType/GetFeeWavierTypeList",
          {getListModel:requestListModel,academicYearId:this.academicYearId},{}
        ).subscribe(resp => {
          that.feeWaiverTypes = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [
              { data: 'feeWavierTypeName', searchable: true, orderable: true },
              { data: 'feeWavierDisplayName', searchable: true, orderable: true },
              { data: 'description', searchable: true, orderable: true },
              { data: 'numberOfInstallments', searchable: true, orderable: true },
              { data: 'discountInPercent', searchable: true, orderable: true },
              { data: 'isActive', searchable: true, orderable: true },
              {data:null,searchable:false,orderable:false }]
  };


  }

  feeWavierTypeUpdateSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('FEE_WAVIER_DETAIL_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  feeWavierTypeAddSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('FEE_WAVIER_DETAIL_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  feeWavierTypeUpdateUnsuccessNotification(feeWavierTypeName : string){
    var message = 'you can not edit '+feeWavierTypeName+'. '+feeWavierTypeName+' is already uesd in fee payment.';
    this.toastEvokeService.danger('Failed to Update!', message).subscribe();
  }
  
  addFeeWavier(){
    const modalRef = this.modalService.open(AddEditFeeWaiverMasterComponent, { size: 'xl',backdrop:'static' });
    modalRef.componentInstance.feeWavierTypeId=0;
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.feeWavierTypeAddSuccessNotification();
  
      }
  
    }, () => {
  
    });
  }


editFeeWavier(feeWavierType:any){
  const modalRef = this.modalService.open(AddEditFeeWaiverMasterComponent, { size: 'xl',backdrop:'static' });
  modalRef.componentInstance.feeWavierTypeId=feeWavierType.feeWavierTypeId;
  modalRef.componentInstance.academicYearId=this.academicYearId;
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==1)
    {
      this.feeWavierTypeUpdateSuccessNotification();
      this.rerender();
    }
    else if(result==0){
      this.feeWavierTypeUpdateUnsuccessNotification(feeWavierType.feeWavierTypeName);
      this.rerender();
    }
  }, () => {

  });
}

wavierDeleteSuccessNotification() {
const newToastNotification = new ToastNotificationInitializer();
newToastNotification.setTitle(this.translate.instant('SUCCESS'));
newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
newToastNotification.openToastNotification$();
}

wavierDeleteUnSuccessNotification() {
  const title = this.translate.instant('FAILED_TO_DELETE_!');
  const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS');
  this.toastEvokeService.danger(
    title,
    message
  ).subscribe();
  }
confirmWavierDelete(wavierDto:any) {
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
  this.feeWavierMasterService.feeWavierTypeDelete(wavierDto.feeWavierTypeId).subscribe(data=>{
       
    if(data.affectedRows>0){
        this.wavierDeleteSuccessNotification();
        this.rerender(); 
      }   
      else{
        this.wavierDeleteUnSuccessNotification();
        this.rerender(); 
      }  
  }
  );
 }
 
});
}


academicYearId:number;
ngAfterViewInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.dtTrigger.next(null);
  });
 
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
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
}
