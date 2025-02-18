import { Component, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableResponseModel, DivisionDto, DivisionServiceProxy, GradeServiceProxy } from 'src/app/services/school-api-service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddEditDivisionComponent } from '../add-edit-division/add-edit-division.component';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-division-listing',
  templateUrl: './division-listing.component.html',
  styleUrls: ['./division-listing.component.scss']
})
export class DivisionListingComponent {

  
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  divisions: DivisionDto[];

  dtTrigger: Subject<any> = new Subject();
  academicYearId:number;
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    public divisionService:DivisionServiceProxy,
    private http: HttpClient,
    private userService:UserService,
    public sharedPermissionServiceService : SharedPermissionServiceService  ) {}

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
          environment.API_BASE_URL+"/api/Division/GetDivisionList",
          {getListModel:requestListModel,academicYearId:this.academicYearId},{}
        ).subscribe(resp => {
          that.divisions = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [ 
              // { data: 'divisionId', searchable: true, orderable: true },
              { data: 'divisionName', searchable: true, orderable: true },
              {data:null,searchable:false,orderable:false }]
  };

  }

 

  addDivision(){
    const modalRef = this.modalService.open(AddEditDivisionComponent, { size: 'md',backdrop:'static' });
    modalRef.componentInstance.divisionForm.patchValue({divisionId:0,divisionName:''});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.divisionAddedSuccessNotification();
  
      }
  
    }, () => {
  
    });
  }

  
  divisionSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('DIVISION_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  divisionAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('DIVISION_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  
editDivision(division:DivisionDto){
  const modalRef = this.modalService.open(AddEditDivisionComponent, { size: 'md',backdrop:'static' });
  modalRef.componentInstance.divisionForm.patchValue(division);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.divisionSuccessNotification();

    }

  }, () => {

  });
}


 
divisionDeleteSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
divisionDeleteUnSuccessNotification() {
  const title = this.translate.instant('FAILED_TO_DELETE_!');
  const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_DIVISION_THERE_IS_ALREADY_ASSOCIATION_WITH_THIS_GRADE_DIVISION_MAPPING');
  this.toastEvokeService.danger(
    title,
    message
  ).subscribe();

}

confirmDivisionDelete(divisionDto:DivisionDto) {
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
    this.divisionService.divisionDataDelete(divisionDto.divisionId, this.academicYearId).subscribe(data=>{
      if(data.affectedRows>0){
          this.divisionDeleteSuccessNotification();
          this.rerender(); 
        }   
        else{
          this.divisionDeleteUnSuccessNotification();
        }  
    }
    );
   }
   
  });
}


  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        
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

  importData(importModal: any) {
    this.modalService.open(importModal, { size: 'lg' });
  }

// import data 

files: File[] = [];

onSelect(event: { addedFiles: any; }) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
  
}
