import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CBSE_ExamObjectServiceProxy, CBSE_MarksGradeRelationDto, DatatableResponseModel, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditMarksGradeRelationComponent } from '../add-edit-marks-grade-relation/add-edit-marks-grade-relation.component';

@Component({
  selector: 'app-marks-grade',
  templateUrl: './marks-grade-relation.component.html',
  styleUrls: ['./marks-grade-relation.component.scss']
})

export class MarksGradeRelationComponent {
    @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  marksGradeList: CBSE_MarksGradeRelationDto[];
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private CBSE_ExamObjectService:CBSE_ExamObjectServiceProxy,
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
            environment.API_BASE_URL+"/api/CBSE_ExamObject/CBSE_MarksGradeRelationGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            
            that.marksGradeList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
              
                
                { data: 'Grade', searchable: true, orderable: true },
                { data: 'MinMark', searchable: true, orderable: true },
                { data: 'MaxMark', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }
 
  MarksGradeRelationDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }

  MarksGradeRelationDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_MARKS_GRADE_RELATION_THERE_IS_MARKS_GRADE_RELATION_ALREADY_ASSOCIATED');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe(); 
  }


  confirmAreaDelete(MarksGradeRelation:CBSE_MarksGradeRelationDto) {
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
      this.CBSE_ExamObjectService.cBSE_MarksGradeRelationDelete(MarksGradeRelation.marksGradeRelationId).subscribe(data=>{ 

        if(data.affectedRows>0){
            this.MarksGradeRelationDeleteSuccessNotification();
            this.rerender(true); 
        }
        else{
          this.MarksGradeRelationDeleteUnSuccessNotification();
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

  markGradeRalationSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GRADE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  markGradeRalationNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GRADE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  addMarkGradeRalation(){
    const modalRef = this.modalService.open(AddEditMarksGradeRelationComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.marksGradeForm.patchValue({markGradeRalationId:0});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.markGradeRalationNotification();
        this.rerender();
  
      }
      
  
    }, (reason) => {
        
    });
  }
 
editMarkGradeRalation(marksGrade:CBSE_MarksGradeRelationDto){
  const modalRef = this.modalService.open(AddEditMarksGradeRelationComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.marksGradeForm.patchValue(marksGrade);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.markGradeRalationSuccessNotification();

    }

  }, (reason) => {

  });

}
   
}
