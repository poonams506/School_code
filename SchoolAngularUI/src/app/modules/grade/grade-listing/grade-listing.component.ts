
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

// import library classes
import {
  ToastEvokeService,
  ConfirmBoxInitializer,
  ToastNotificationInitializer,
} from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { DatatableResponseModel, GradeDto, GradeServiceProxy } from 'src/app/services/school-api-service';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddEditGradeComponent } from '../add-edit-grade/add-edit-grade.component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-grade-listing',
  templateUrl: './grade-listing.component.html',
  styleUrls: ['./grade-listing.component.scss'],
})
export class GradeListingComponent {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  grades: GradeDto[];
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private gradeService:GradeServiceProxy,
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
            environment.API_BASE_URL+"/api/Grade/GetGradeList",
            {getListModel:requestListModel,academicYearId:1},{}
          ).subscribe(resp => {
            
            that.grades = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                // { data: 'gradeId', searchable: true, orderable: true },
                { data: 'gradeName', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }

 

 
  gradeDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  gradeDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_GRADE_THERE_IS_ALREADY_ASSOCIATION_WITH_THIS_GRADE_DIVISION_MAPPING');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
  }

  confirmGradeDelete(grade:GradeDto) {
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
      this.gradeService.gradeDataDelete(grade.gradeId, this.academicYearId).subscribe(data=>{
       
        if(data.affectedRows>0){
            this.gradeDeleteSuccessNotification();
            this.rerender(true); 
          }   
          else{
            this.gradeDeleteUnSuccessNotification();
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

  gradeSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GRADE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  gradeAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GRADE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  

  

  addGrade(){
    const modalRef = this.modalService.open(AddEditGradeComponent, { size: 'md',backdrop:'static' });
    modalRef.componentInstance.gradeForm.patchValue({gradeId:0,gradeName:''});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.gradeAddedSuccessNotification();
  
      }
      
  
    }, (reason) => {
        
    });
  }
  
editGrade(grade:GradeDto){
  const modalRef = this.modalService.open(AddEditGradeComponent, { size: 'md',backdrop:'static' });
  modalRef.componentInstance.gradeForm.patchValue(grade);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.rerender();
      this.gradeSuccessNotification();

    }

  }, (reason) => {

  });
}
}
