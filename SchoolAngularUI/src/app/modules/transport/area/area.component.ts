import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AreaDto, DatatableResponseModel, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditAreaComponent } from '../add-edit-area/add-edit-area.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  areaList: AreaDto[];
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private transportService:TransportServiceProxy,
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
            environment.API_BASE_URL+"/api/Transport/GetAreaGridListSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            
            that.areaList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                // { data: 'gradeId', searchable: true, orderable: true },
                { data: 'areaName', searchable: true, orderable: true },
                { data: 'pickPrice', searchable: true, orderable: true },
                { data: 'dropPrice', searchable: true, orderable: true },
                { data: 'pickAndDropPrice', searchable: true, orderable: true },
                { data: 'description', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }

 

 
  areaDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  areaDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_AREA_THERE_IS_AREA_ALREADY_ASSOCIATED');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
  }

  confirmAreaDelete(area:AreaDto) {
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
      this.transportService.areaDelete(area.areaId, this.academicYearId).subscribe(data=>{
       
        if(data.affectedRows>0){
            this.areaDeleteSuccessNotification();
            this.rerender(true); 
          }   
          else{
            this.areaDeleteUnSuccessNotification();
          }  
      }
      );
     }
    });
  }
 

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

  areaSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('AREA_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  areaAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('AREA_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  

  

  addArea(){
    const modalRef = this.modalService.open(AddEditAreaComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.areaForm.patchValue({areaId:0});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.areaAddedSuccessNotification();
  
      }
      
  
    }, (reason) => {
        
    });
  }
  
editArea(area:AreaDto){
  const modalRef = this.modalService.open(AddEditAreaComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.areaForm.patchValue(area);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.areaSuccessNotification();

    }

  }, (reason) => {

  });
}
}

