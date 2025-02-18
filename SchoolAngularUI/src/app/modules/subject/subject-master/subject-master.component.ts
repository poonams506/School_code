import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, SubjectMasterDto, SubjectMasterServiceProxy } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditSubjectMasterComponent } from '../add-edit-subject-master/add-edit-subject-master.component';
import { ImportSubjectFileComponent } from '../import-subject-file/import-subject-file.component';

@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.scss']
})
export class SubjectMasterComponent {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  subjects: any[];

  dtTrigger: Subject<any> = new Subject();
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private subjectMasterService: SubjectMasterServiceProxy,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    
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
            environment.API_BASE_URL+"/api/SubjectMaster/GetSubjectMasterList",
            {getListModel:requestListModel,academicYearId:1},{}
          ).subscribe(resp => {
            
            that.subjects = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                { data: 'subjectName', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }
  

 
  subjectDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  subjectDeleteUnSuccessNotification(subjectMappingCount:number,teacherSubjectMappingCount:number,objectCount:number) {
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message1 = this.translate.instant('CLEAR_RECORD');
    const message2 = this.translate.instant('SUBJECT_MAPPING_EXIT');
    const message3= this.translate.instant('TEACHER_SUBJECT_MAPPING_EXIT');
    const message4= this.translate.instant('OBJECT_SUBJECT_EXIT'); 
 
    if(subjectMappingCount>0 && teacherSubjectMappingCount>0 && objectCount>0){
      this.toastEvokeService.danger(title,message1).subscribe();

    }
    else{
      if(subjectMappingCount>0)
      {
        this.toastEvokeService.danger(title,message2).subscribe();
      }
     else if (teacherSubjectMappingCount>0){
      this.toastEvokeService.danger(title,message3).subscribe();    }
      else if (objectCount>0){
        this.toastEvokeService.danger(title,message4).subscribe();    }
    }
  }
  
  confirmSubjectDelete(subjectMasterDto:SubjectMasterDto) {
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
      debugger;
      this.subjectMasterService.subjectMasterDelete(subjectMasterDto.subjectMasterId).subscribe(data=>{
      
        if(data.affectedRows>0){
            this.subjectDeleteSuccessNotification();
            this.rerender(true); 
          }   
          else{
            this.subjectDeleteUnSuccessNotification(data.subjectMappingCount,data.teacherSubjectMappingCount,data.objectCount);
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

  subjectSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SUBJECT_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  subjectUpdatedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SUBJECT_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }


  addSubject(){
    const modalRef = this.modalService.open(AddEditSubjectMasterComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.subjectMasterForm.patchValue({subjectMasterId:0,subjectName:''});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.subjectSuccessNotification();
  
      }
      
  
    }, (reason) => {
        
    });
  }
  
  
editSubject(subject:SubjectMasterDto){
  const modalRef = this.modalService.open(AddEditSubjectMasterComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.subjectMasterForm.patchValue(subject);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.subjectUpdatedSuccessNotification();
      this.rerender();
 

    }

  }, (reason) => {

  });
}

importData(){
  
  const modalRef = this.modalService.open(ImportSubjectFileComponent, { size: 'sm', backdrop:'static', centered: true });
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();

    }

  }, (reason) => {

  });
}
}


