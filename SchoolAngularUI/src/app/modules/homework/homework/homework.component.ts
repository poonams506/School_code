import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, HomeworkServiceProxy, MasterServiceProxy, PublishUnpublishHomeworkDto, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { AddEditHomeworkComponent } from '../add-edit-homework/add-edit-homework.component';
import { UserService } from 'src/app/services/user-service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ViewHomeworkComponent } from '../view-homework/view-homework.component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit{
  academicYearId:number;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  homeworks: any [];
  dtTrigger: Subject<any> = new Subject();
  homeworkSearchForm: FormGroup;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  submitted:boolean=false;
  gradeId:any;
  divisionId:any;
  roleId : number;



  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private userService:UserService,
    private httpClient:HttpClient,
    private masterService:MasterServiceProxy,
    private homeworkService: HomeworkServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

    
    this.homeworkSearchForm = this.formBuilder.group({
      // gradeId:[null,Validators.required],
      // divisionId:[null,Validators.required]
      classId: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.roleId = this.userService.getUserRoleId();
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.getMasterDropdownData();
        this.dtTrigger.next(null);
    });
   
  }


  getMasterDropdownData(){
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
      this.gradeDropdownList=gradeMaster.grades as Grade[];
      this.divisionDropdownList=gradeMaster.divisions as Division[];
      this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
      this.getLocalStorageFilter();
    
    });
    
  }

  ngOnInit(): void {


    this.getLocalStorageFilter();

    this.homeworkSearchForm.get('gradeId')?.valueChanges.subscribe((gradeId:string) => {
      this.divisionFilteredDropdownList =[];
      let divisionList= this.divisionGradeMapping.filter(x=>x.gradeId===parseInt(gradeId)).map(x=>x.divisionId);
     if(divisionList && divisionList.length>0){
      this.divisionFilteredDropdownList = this.divisionDropdownList.filter(division => divisionList.includes(division.divisionId));
     }
     this.homeworkSearchForm.get('divisionId')?.setValue(null); 
    });
    const that = this;
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // stateSave: true,
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
            environment.API_BASE_URL+"/api/Homework/GetHomeworkGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId,gradeId:this.gradeId,
             divisionId:this.divisionId,  roleId : this.roleId},{}
          ).subscribe(resp => {
            that.homeworks = resp.data; 
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 7, "desc" ]],
      columns: [ 
                { data: 'classId', searchable: true, orderable: true },
                { data: 'subjectName', searchable: true, orderable: true },
                { data: 'homeworkTitle', searchable: true, orderable: true },
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

  getLocalStorageFilter(){
    let storedClassId = sessionStorage.getItem("HomeworkListing");
    if(storedClassId != null && storedClassId != undefined && storedClassId != ""){
      this.homeworkSearchForm.get('classId')?.patchValue(storedClassId.split('_')[0]);
      this.gradeId = parseInt(storedClassId.split('_')[1]);
      this.divisionId = parseInt(storedClassId.split('_')[2]);
    }
  }

  homeworkSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('HOMEWORK_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  homeworkSuccessAddedNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('HOMEWORK_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
 

  addHomework(){
    const modalRef = this.modalService.open(AddEditHomeworkComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.homeworkSuccessAddedNotification();

      }
  
    },(reason) =>{

    });
  }

  editHomework(homeworkId: number) {
    const modalRef = this.modalService.open(AddEditHomeworkComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.homeworkId = homeworkId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.homeworkSuccessNotification();
      }
    }, (reason) => {

    });
  }


  homeworkProfileUpdatedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('HOMEWORK_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  get f() { return this.homeworkSearchForm.controls; }

  searchHomework(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.homeworkSearchForm.invalid) {
        return;
    }
    const selectedClassId = this.homeworkSearchForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);

  // Find the corresponding SchoolGradeDivisionMatrixDto for the selected classId
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);

  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    sessionStorage.setItem('HomeworkListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
  }
  else{
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('HomeworkListing');
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
    this.homeworkSearchForm.reset();
    this.gradeId=null;
    this.divisionId=null;
    sessionStorage.removeItem('HomeworkListing');
    this.rerender();
  }
  
  homeworkDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  confirmHomeworkDelete(homeworkId: number) {
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
        this.homeworkService.homeWorkDelete(homeworkId).subscribe(() => {
          // Show success notification
          this.homeworkDeleteSuccessNotification();
          // Rerender the data table
          this.rerender();
        });
      }
    });
  }

  // viewHomeworkDescription(homeworkId:number){
  //   // debugger
  //   // let noticeDescriptionStructure:INoticeStructure={noticeDescription,isEditMode:false,isAlreadyExist:status!='Not-Created', title : 'View'};
  //   // let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(noticeDescriptionStructure), environment.ENCRYPTION_PASSWORD).toString();
  
  //   // this.router.navigate(['/notice/add-edit-notice',encryptedString]);

  //   const modalRef = this.modalService.open( ViewHomeworkComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.academicYearId = this.academicYearId;
  //   modalRef.componentInstance.homeworkId = homeworkId;

  //   modalRef.componentInstance.modelRef = modalRef;
  //   modalRef.result.then((result) => {
  //     if (result === true) {
  //       this.rerender();
  //       this.homeworkProfileUpdatedNotification();
  //     }
  //   }, (reason) => {

  //   });
  // }
  viewHomeworkDescription(homeworkId:number){
    const modalRef = this.modalService.open( AddEditHomeworkComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.homeworkId = homeworkId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
         this.homeworkProfileUpdatedNotification();
      }
    }, (reason) => {

    });
  }

  homeworkPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('HOMEWORK_PUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  
  homeworkUnPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('HOMEWORK_UNPUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  publishHomework(homeworkId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_HOMEWORK')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishHomeworkDto();
      requestDto.homeworkId=homeworkId;
      requestDto.isPublished = true;
      this.homeworkService.publishUnpublishHomeworkParticulars(requestDto).subscribe(result=>{
        this.homeworkPublishSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }
  unPublishHomework(homeworkId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_HOMEWORK?')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishHomeworkDto();
        requestDto.homeworkId=homeworkId;
        requestDto.isPublished=false;
        this.homeworkService.publishUnpublishHomeworkParticulars(requestDto).subscribe(result=>{
          this.homeworkUnPublishSuccessNotification();
          this.rerender();
        });
      }
    });
  
  }


  
}
