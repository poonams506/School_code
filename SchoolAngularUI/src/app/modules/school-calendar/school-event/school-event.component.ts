import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, PublishUnpublishSchoolEventDto, SchoolEventDto, SchoolEventServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditSchoolEventComponent } from '../add-edit-school-event/add-edit-school-event.component';

@Component({
  selector: 'app-school-event',
  templateUrl: './school-event.component.html',
  styleUrls: ['./school-event.component.scss']
})
export class SchoolEventComponent implements OnInit {
  academicYearId:number;
  // SchoolEventId:any;
  isViewMode:boolean
  schoolEvents: any [];
  schoolEventSearchForm: FormGroup;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  submitted:boolean=false;
  gradeId:any;
  divisionId:any;
  classIds:any;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
 
  dtTrigger: Subject<any> = new Subject();



  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private userService:UserService,
    private httpClient:HttpClient,
    private masterService:MasterServiceProxy,
    private schoolEventService: SchoolEventServiceProxy,
   
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

  }

  ngOnInit(): void {
    this.schoolEventSearchForm = this.formBuilder.group({
      
      classId: [],
    });

    // this.getMasterDropdownData();
    this.getLocalStorageFilter();

   
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
        that.httpClient
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/SchoolEvent/SchoolEvent",
            {getListModel:requestListModel,academicYearId:this.academicYearId,gradeId:this.gradeId,
             divisionId:this.divisionId},{}
          ).subscribe(resp => {
            that.schoolEvents = resp.data; 
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 1, "asc" ]],
      columns: [ 
                { data: 'eventTitle', searchable: true, orderable: true },
                { data: 'eventFees', searchable: true, orderable: true },
                { data: 'eventVenue', searchable: true, orderable: true },
                { data: 'eventCoordinator', searchable: true, orderable: true },
                { data: 'startDate', searchable: true, orderable: true },
                { data: 'endDate', searchable: true, orderable: true },
                { data: 'isPublished', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }

  getLocalStorageFilter(){
    let storedClassId = sessionStorage.getItem("SchoolEventListing");
    if(storedClassId != null && storedClassId != undefined && storedClassId != ""){
      this.schoolEventSearchForm.get('classId')?.patchValue(storedClassId.split('_')[0]);
      this.gradeId = parseInt(storedClassId.split('_')[1]);
      this.divisionId = parseInt(storedClassId.split('_')[2]);
    }
  }

  schoolEventSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SCHOOL_EVENT_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
 

  addSchoolEvent(){
    const modalRef = this.modalService.open(AddEditSchoolEventComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.schoolEventProfileAddedNotification();
      }
  
    },(reason) =>{

    });
  }

  editSchoolEvent(schoolEventId: number){
    const modalRef = this.modalService.open(AddEditSchoolEventComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.schoolEventId = schoolEventId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.schoolEventSuccessNotification();
      }
    }, (reason) => {

    });
  }


  schoolEventProfileUpdatedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SCHOOL_EVENT_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  schoolEventProfileAddedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SCHOOL_EVENT_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  get f() { return this.schoolEventSearchForm.controls; }

  searchSchoolEvent(){
    debugger
    this.submitted = true;

    // stop here if form is invalid
    if (this.schoolEventSearchForm.invalid) {
        return;
    }
    
    const selectedClassId = this.schoolEventSearchForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);
    this.classIds = [];

  // Find the corresponding SchoolGradeDivisionMatrixDto for the selected classId
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);

  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    sessionStorage.setItem('SchoolEventListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
   
  }
  
  else{
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('SchoolEventListing');
  }
    this.rerender();
    
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
  
  onReset(){
    this.submitted = false;
    this.schoolEventSearchForm.reset();
    this.gradeId=null;
    this.divisionId=null;
    sessionStorage.removeItem('SchoolEventListing');
    this.rerender();
  }
  
  schoolEventDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  confirmSchoolEventDelete(SchoolEventId: number) {
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
        // Call the service method to delete the homework by ID
        this.schoolEventService.schoolEventDelete(SchoolEventId).subscribe(() => {
          // Show success notification
          this.schoolEventDeleteSuccessNotification();
          // Rerender the data table
          this.rerender();
        });
      }
    });
  }

  viewSchoolEventDescription(schoolEventId:number){
    const modalRef = this.modalService.open( AddEditSchoolEventComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.schoolEventId = schoolEventId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.schoolEventProfileUpdatedNotification();
      }
    }, (reason) => {

    });
  }

  schoolEventPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SCHOOL_EVENT_PUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  
  schoolEventUnPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('SCHOOL_EVENT_UNPUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  publishSchoolEvent(schoolEventId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_SCHOOL_EVENT')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishSchoolEventDto();
      requestDto.schoolEventId=schoolEventId;
      requestDto.isPublished = true;
      this.schoolEventService.publishUnpublishSchoolEventParticular(requestDto).subscribe(result=>{
        this.schoolEventPublishSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }
  unPublishSchoolEvent(schoolEventId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_SCHOOL_EVENT')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishSchoolEventDto();
        requestDto.schoolEventId=schoolEventId;
        requestDto.isPublished=false;
        this.schoolEventService.publishUnpublishSchoolEventParticular(requestDto).subscribe(result=>{
          this.schoolEventUnPublishSuccessNotification();
          this.rerender();
        });
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
  
 
}
