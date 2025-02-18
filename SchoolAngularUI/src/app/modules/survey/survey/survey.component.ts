import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, forkJoin } from 'rxjs';
import { ClassWiseTeacherAndStudentServiceProxy, DatatableResponseModel, Division, Grade, MasterServiceProxy, PublishUnpublishSurveyDto, SchoolGradeDivisionMatrixDto, SurveyServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditSurveyComponent } from '../add-edit-survey/add-edit-survey.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  academicYearId:number;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  survey: any [];
  dtTrigger: Subject<any> = new Subject();
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  submitted:boolean=false;
  isEditMode:boolean;
  surveyToDropdownList: ISelectListItem[]=[];
  surveyToType:any;
  selectedSurveyToId:number=1;
  refId:number;
  roleId : number;
  surveyTypeTo = 1;
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private userService:UserService,
    private httpClient:HttpClient,
    private masterService:MasterServiceProxy,
    private surveyService:SurveyServiceProxy,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private classWiseService: ClassWiseTeacherAndStudentServiceProxy

  ) {}

  ngAfterViewInit(): void {
    this.refId = this.userService.getUserRefId();
    this.roleId = this.userService.getUserRoleId();
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.dtTrigger.next(null);
    });
   
  }

    getSurveyTypeNameById(id: number): string {
    const foundItem = this.surveyToDropdownList.find(item => item.id === id);
    return foundItem ? foundItem.value : '';
  }


  ngOnInit(): void {

    this.surveyToDropdownList=[
      {id:1,value:'Student'},
      {id:2,value:'Class'},
      {id:3,value:'Teacher'},
      {id:4,value:'Clerk'},
      {id:5,value:'Cab Driver'},
      {id:6,value:'Class Teacher'},
  ];
  
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder:this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.httpClient
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/Survey/GetSurveyGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId, surveyTypeTo: this.surveyTypeTo, refId : this.refId, roleId : this.roleId},{}
          ).subscribe(resp => {
            that.survey = resp.data; 
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 6, "desc" ]],
      columns: [ 
                 { data: 'surveyToType', searchable: true, orderable: true },
                { data: 'surveyTitle', searchable: true, orderable: true },
                { data: 'startDate', searchable: true, orderable: true },
                { data: 'endDate', searchable: true, orderable: true },
                { data: 'isPublished', searchable: true, orderable: true },
                { data: 'createdBy', searchable: true, orderable: true },
                { data: 'createdDate', searchable: true, orderable: true },
                { data: 'modifiedBy', searchable: true, orderable: true },
                { data: 'modifiedDate', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }


  addSurvey(){
    const modalRef = this.modalService.open(AddEditSurveyComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.surveySuccessNotification();
      }
  
    },(reason) =>{

    });
  }

  surveySuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SURVEY_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  editSurvey(surveyId: number) {
    const modalRef = this.modalService.open(AddEditSurveyComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.surveyId = surveyId;
    modalRef.componentInstance.modelRef = modalRef;

    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.surveySuccessNotification();
      }
    }, (reason) => {

    });
   
  }

  
  surveyProfileUpdatedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SURVEY_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  confirmSurveyDelete(surveyId: number) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'),
      declineLabel: this.translate.instant('NO'),
    });

    
    
    // Open the confirmation box and subscribe to the button click
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        // Call the service method to delete the survey by ID
        this.surveyService.surveyDelete(surveyId).subscribe(() => {
          // Show success notification
          this.surveyDeleteSuccessNotification();
          // Rerender the data table
          this.rerender();
        });
      }
    });
  }

  surveyDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
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

  viewSurveyDescription(surveyId:number){
    const modalRef = this.modalService.open( AddEditSurveyComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.surveyId = surveyId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.surveyProfileUpdatedNotification();
      }
    }, (reason) => {

    });
  }
 
  publishSurvey(surveyId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_SURVEY')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishSurveyDto();
      requestDto.surveyId=surveyId;
      requestDto.isPublished = true;
      this.surveyService.publishUnpublishSurveyParticulars(requestDto).subscribe(result=>{
        this.surveyPublishSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }

  surveyPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SURVEY_PUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  unPublishSurvey(surveyId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_SURVEY')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishSurveyDto();
        requestDto.surveyId=surveyId;
        requestDto.isPublished=false;
        this.surveyService.publishUnpublishSurveyParticulars(requestDto).subscribe(result=>{
          this.surveyUnPublishSuccessNotification();
          this.rerender();
        });
      }
    });
  
  }
   
  surveyUnPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SURVEY_UNPUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  SubmittedSurvey(surveyId:any){

  }

}
