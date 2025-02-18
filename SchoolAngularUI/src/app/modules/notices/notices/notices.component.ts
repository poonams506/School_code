import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Division, SchoolGradeDivisionMatrixDto, Grade, MasterServiceProxy, GradeDivisionMasterDto, DatatableResponseModel, NoticeServiceProxy, PublishUnpublishNoticeDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { AddEditNoticeComponent } from '../../notices/add-edit-notice/add-edit-notice.component';
import { INoticeStructure } from '../notice-description-structure.interface';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js/';  
import { ViewNoticeComponent } from '../view-notice/view-notice.component';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit{
  academicYearId:number;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  notices: any [];
  dtTrigger: Subject<any> = new Subject();
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  submitted:boolean=false;
  isEditMode:boolean;
  noticeToDropdownList: ISelectListItem[]=[];
  noticeToType:string;
  selectedNoticeToId:number=1;
  refId:number;
  roleId : number;
  noticeTypeTo = 1;
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private userService:UserService,
    private httpClient:HttpClient,
    private masterService:MasterServiceProxy,
    private noticeService:NoticeServiceProxy,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService

  ) {}

  ngAfterViewInit(): void {
    this.refId = this.userService.getUserRefId();
    this.roleId = this.userService.getUserRoleId();
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.dtTrigger.next(null);
    });
   
  }

    getNoticeTypeNameById(id: number): string {
    const foundItem = this.noticeToDropdownList.find(item => item.id === id);
    return foundItem ? foundItem.value : '';
  }


  ngOnInit(): void {

    this.noticeToDropdownList=[
      {id:1,value:'Student'},
      {id:2,value:'Class'},
      {id:3,value:'Teacher'},
      {id:4,value:'Clerk'},
      {id:5,value:'Cab Driver'},
  ];
  
 

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
            environment.API_BASE_URL+"/api/Notice/GetNoticeGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId, noticeTypeTo: this.noticeTypeTo, refId : this.refId, roleId : this.roleId},{}
          ).subscribe(resp => {
            that.notices = resp.data; 
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 6, "desc" ]],
      columns: [ 
                 { data: 'noticeToType', searchable: true, orderable: true },
                { data: 'noticeTitle', searchable: true, orderable: true },
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


  addNotice(){
    const modalRef = this.modalService.open(AddEditNoticeComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.noticeAddedSuccessNotification();
      }
  
    },(reason) =>{

    });
  }

  noticeSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('NOTICE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  noticeAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('NOTICE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  editNotice(noticeId: number) {
    const modalRef = this.modalService.open(AddEditNoticeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.noticeId = noticeId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.noticeSuccessNotification();
      }
    }, (reason) => {

    });
  }

  
  noticeProfileUpdatedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('NOTICE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  confirmNoticeDelete(noticeId: number) {
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
        // Call the service method to delete the notice by ID
        this.noticeService.noticeDelete(noticeId).subscribe(() => {
          // Show success notification
          this.noticeDeleteSuccessNotification();
          // Rerender the data table
          this.rerender();
        });
      }
    });
  }

  noticeDeleteSuccessNotification() {
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

  
  viewNoticeDescription(noticeId:number){
    const modalRef = this.modalService.open( AddEditNoticeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.noticeId = noticeId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
         this.noticeProfileUpdatedNotification();
      }
    }, (reason) => {

    });
  }
 
  publishNotice(noticeId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_NOTICE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishNoticeDto();
      requestDto.noticeId=noticeId;
      requestDto.isPublished = true;
      this.noticeService.publishUnpublishNoticeParticulars(requestDto).subscribe(result=>{
        this.noticePublishSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }

  noticePublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('NOTICE_PUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  unPublishNotice(noticeId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_NOTICE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishNoticeDto();
        requestDto.noticeId=noticeId;
        requestDto.isPublished=false;
        this.noticeService.publishUnpublishNoticeParticulars(requestDto).subscribe(result=>{
          this.noticeUnPublishSuccessNotification();
          this.rerender();
        });
      }
    });
  
  }
   
  noticeUnPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('NOTICE_UNPUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

}



