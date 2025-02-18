import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CBSE_ExamMasterDto, CBSE_ExamObjectServiceProxy, DatatableResponseModel } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditExamMasterComponent } from '../add-edit-exam-master/add-edit-exam-master.component';
import { hide } from '@popperjs/core';

@Component({
  selector: 'app-exam-master',
  templateUrl: './exam-master.component.html',
  styleUrls: ['./exam-master.component.scss']
})
export class ExamMasterComponent {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  examMasterList: CBSE_ExamMasterDto[];
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private cbsc_ExamObjectService:CBSE_ExamObjectServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {}

  ngOnInit(): void {

    const that = this;

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
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/CBSE_ExamObject/CBSE_ExamMasterGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            
            that.examMasterList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[3 , "desc" ]],
      columns: [        
              
                { data: 'examTypeName', searchable: true, orderable: true },
                { data: 'termName', searchable: true, orderable: true },
                { data: 'examName', searchable: true, orderable: true },
                { data: 'createdDate', searchable: true, orderable: true},
                {data:null,searchable:false,orderable:false },
              ]
                
    };

  }

  examMasterDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  examMasterDeleteUnSuccessNotification(examMappingCount:number, examObjectCount:number ) {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message1 = this.translate.instant('CLEAR_RECORD_EXAM_MASTER');
    const message2 = this.translate.instant('EXAM_MAPPING_EXIT');
    const message3= this.translate.instant('EXAM_OBJECT_EXIT');
    if(examMappingCount>0 && examObjectCount>0){
      this.toastEvokeService.danger(title,message1).subscribe();

    }
    else{
      if(examMappingCount>0)
      {
        this.toastEvokeService.danger(title,message2).subscribe();
      }
     else if (examObjectCount>0){
      this.toastEvokeService.danger(title,message3).subscribe();    }
    }
    
  }

  confirmExamMasterDelete(examMaster:CBSE_ExamMasterDto) {
    debugger;
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), 
      declineLabel: this.translate.instant('NO'),
    });
    
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      debugger;
      this.cbsc_ExamObjectService.cBSE_ExamMasterDelete(examMaster.examMasterId).subscribe(data=>{
      
        if(data.affectedRows>0){
            this.examMasterDeleteSuccessNotification();
            this.rerender(true); 
          }   
          else{
            this.examMasterDeleteUnSuccessNotification(data.examMappingCount,data.examObjectCount);
            this.rerender(true); 

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
   
    this.dtTrigger.unsubscribe();
  }
  
  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      if(hardClear == true){
        dtInstance.state.clear();
      }
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  examMasterSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('EXAM_MASTER_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  examMasterNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('EXAM_MASTER_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  addexamMaster(){
    const modalRef = this.modalService.open(AddEditExamMasterComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.examMasterForm.patchValue({examMasterId:0});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender(true);
        this.examMasterNotification();
  
      }
      
    }, (reason) => {
        
    });
  }
  
editExamMasterRalation(examMaster:CBSE_ExamMasterDto){
  debugger;
  const modalRef = this.modalService.open(AddEditExamMasterComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.examMasterForm.patchValue(examMaster);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.examMasterSuccessNotification();

    }

  }, (reason) => {

  });

}
}

