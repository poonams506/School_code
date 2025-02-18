import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CBSE_ExamObjectServiceProxy, CBSE_ExamReportCardNameDto, CBSE_ExamReportCardServiceProxy, DatatableResponseModel } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditExamReportcardTemplateComponent } from '../add-edit-exam-reportcard-template/add-edit-exam-reportcard-template.component';
import { DateTime } from 'luxon';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-reportcard-template',
  templateUrl: './exam-reportcard-template.component.html',
  styleUrls: ['./exam-reportcard-template.component.scss']
})
export class ExamReportcardTemplateComponent {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  academicYearId:number;
  examReportCardList: CBSE_ExamReportCardNameDto[]=[];
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private http: HttpClient,
    private userService:UserService,
    private examReportCardService:CBSE_ExamReportCardServiceProxy,
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
            environment.API_BASE_URL+"/api/CBSE_ExamReportCard/GetExamReportCardGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            
            that.examReportCardList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 3, "desc" ]],
      columns: [{ data: 'reportCardName', searchable: true, orderable: true },
                { data: 'examNames', searchable: true, orderable: false },
                { data: 'classes', searchable: true, orderable: false },
                { data: 'createdDate', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }

  examReportCardDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }

  confirmDelete(report:any) {
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
      this.examReportCardService.examReportCardDelete(report.examReportCardNameId).subscribe(data=>{
       
        // if(data.affectedRows>0){
            this.examReportCardDeleteSuccessNotification();
            this.rerender(true); 
          
          }  
      //}
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

  examReportCardUpdateSuccessNotification(){
    debugger;
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('EXAM_REPORTCARD_TEMPLATE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  examReportCardAddNotification(){
    debugger;
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('EXAM_REPORTCARD_TEMPLATE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  addexamReport(){
    const modalRef = this.modalService.open(AddEditExamReportcardTemplateComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.examReportCardForm.patchValue({examReportCardNameId:0});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result===true)
      {
        this.examReportCardAddNotification();
        this.rerender();
      }
      
    }, (reason) => {
        
    });
  }
  
  editExamReport(report:CBSE_ExamReportCardNameDto){
    debugger;
  const modalRef = this.modalService.open(AddEditExamReportcardTemplateComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.examReportCardNameId=report.examReportCardNameId;
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result===true)
    {
      this.examReportCardUpdateSuccessNotification();
      this.rerender();
    }

  }, (reason) => {

  });

}
getDate(date: moment.Moment | undefined): string | null {
  return date ? moment(date).format('DD/MM/YYYY') : null;
}
}
