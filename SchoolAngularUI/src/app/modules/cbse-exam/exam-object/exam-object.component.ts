import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { ajax, get } from 'jquery';
import { Subject } from 'rxjs';
import { CBSE_ExamObjectDto, CBSE_ExamObjectServiceProxy, DatatableRequestModel, DatatableResponseModel, PublishUnpublishExamObjectDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditExamObjectComponent } from '../add-edit-exam-object/add-edit-exam-object.component';

@Component({
  selector: 'app-exam-object',
  templateUrl: './exam-object.component.html',
  styleUrls: ['./exam-object.component.scss']
})
export class ExamObjectComponent {
  @ViewChild(DataTableDirective,{static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  examObjectList: CBSE_ExamObjectDto[];
  academicYearId:number;
  examObjectId:number;
  examMasterId:number;
  subjectMasterId:number;
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private CBSE_ExamObjectService:CBSE_ExamObjectServiceProxy, 
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
            environment.API_BASE_URL+"/api/CBSE_ExamObject/CBSE_ExamObjectGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            
            that.examObjectList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 1, "asc" ]],
      columns: [
                // { data: 'gradeId', searchable: true, orderable: true },
                { data: 'name', searchable: true, orderable: true },
                { data: 'subjectName', searchable: true, orderable: true },
                { data: 'examName', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };
  }
  
  examObjectDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  examObjectDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_EXAM_OBJECT_THERE_IS_EXAM_OBJECT_ALREADY_ASSOCIATED');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe(); 
  }

  
  confirmExamObjectDelete(examMasterId:number,subjectMasterId:number) {
    debugger;
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
 
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
      if(resp?.success){
       this.CBSE_ExamObjectService.cBSE_ExamObjectDelete(examMasterId, subjectMasterId, this.academicYearId).subscribe((data) => {
        
        if(data.affectedRows>0){
          this.examObjectDeleteSuccessNotification();
          this.rerender(); 
        }   
        else{
          this.examObjectDeleteUnSuccessNotification();
        }  


          //  this.examObjectDeleteSuccessNotification();
          //    this.rerender(); 
       }
       );
      }
     });  
  }


  

  viewExamObjectDescription(examObject:CBSE_ExamObjectDto){
    const modalRef = this.modalService.open( AddEditExamObjectComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.subjectMasterId = examObject.subjectMasterId;
    modalRef.componentInstance.examMasterId = examObject.examMasterId; 
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.examObjectProfileUpdatedNotification();
      }
    }, (reason) => {

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


examObjectSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('EXAM_OBJECT_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
examObjectAddedSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('EXAM_OBJECT_ADDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}




addExamObject(){
  const modalRef = this.modalService.open(AddEditExamObjectComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.academicYearId=this.academicYearId;
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.examObjectAddedSuccessNotification();

    }
    

  }, (reason) => {
      
  });
}

editExamObject(examObject: CBSE_ExamObjectDto){
  debugger;
const modalRef = this.modalService.open(AddEditExamObjectComponent, { size: 'lg',backdrop:'static' });
modalRef.componentInstance.academicYearId = this.academicYearId;
modalRef.componentInstance.examObjectId = this.examObjectId;
modalRef.componentInstance.subjectMasterId = examObject.subjectMasterId;
modalRef.componentInstance.examMasterId = examObject.examMasterId;

//modalRef.componentInstance.examObjectForm.patchValue(examObject);
modalRef.componentInstance.modelRef=modalRef;
modalRef.result.then((result) => {
  if(result === true)
  {
    this.rerender();
    this.examObjectSuccessNotification();

  }

}, (reason) => {

});
}

examObjectProfileUpdatedNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('EXAM_OBJECT_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

}


