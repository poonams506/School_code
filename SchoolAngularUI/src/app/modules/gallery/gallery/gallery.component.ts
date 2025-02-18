import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, Division, GalleryServiceProxy, Grade, MasterServiceProxy, PublishUnpublishGalleryDto, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditGalleryComponent } from '../add-edit-gallery/add-edit-gallery.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  academicYearId:number;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  gallerys: any [];
  dtTrigger: Subject<any> = new Subject();
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  submitted:boolean=false;
  isEditMode:boolean;
  galleryToDropdownList: ISelectListItem[]=[];
  galleryToType:string;
  selectedGalleryToId:number=1;
  refId:number;
  roleId : number;
  galleryTypeTo = 1;
  constructor(
    public translate: TranslateService, 
    private userService:UserService,
    private modalService: NgbModal,
    private httpClient:HttpClient,
    private galleryService:GalleryServiceProxy,
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

  getGalleryTypeNameById(id: number): string {
    const foundItem = this.galleryToDropdownList.find(item => item.id === id);
    return foundItem ? foundItem.value : '';
  }



  ngOnInit(): void {
    this.galleryToDropdownList=[
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
          environment.API_BASE_URL+"/api/Gallery/GetGalleryGridList",
          {getListModel:requestListModel,academicYearId:this.academicYearId, galleryTypeTo: this.galleryTypeTo, refId : this.refId, roleId : this.roleId},{}
        ).subscribe(resp => {
          that.gallerys = resp.data; 
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 5, "desc" ]],
    columns: [ 
      { data: 'galleryTypeTo', searchable: true, orderable: true },
     { data: 'galleryTitle', searchable: true, orderable: true },
     { data: 'startDate', searchable: true, orderable: true },
    //  { data: 'endDate', searchable: true, orderable: true },
     { data: 'isPublished', searchable: true, orderable: true },
     { data: 'createdBy', searchable: true, orderable: true },
     { data: 'createdDate', searchable: true, orderable: true },
     { data: 'modifiedBy', searchable: true, orderable: true },
     { data: 'modifiedDate', searchable: true, orderable: true },
     {data:null,searchable:false,orderable:false }]
  }

  }
  addGallery(){
    const modalRef = this.modalService.open(AddEditGalleryComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.galleryAddedSuccessNotification();
      }
  
    },(reason) =>{

    });
  }

  gallerySuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GALLERY_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  galleryAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GALLERY_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  editGallery(galleryId: number) {
    const modalRef = this.modalService.open(AddEditGalleryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.galleryId = galleryId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
        this.gallerySuccessNotification();
      }
    }, (reason) => {

    });
  }

  
  galleryProfileUpdatedNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GALLERY_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  confirmGalleryDelete(galleryId: number) {
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
        this.galleryService.galleryDelete(galleryId).subscribe(() => {
          // Show success notification
          this.galleryDeleteSuccessNotification();
          // Rerender the data table
          this.rerender();
        });
      }
    });
  }

  galleryDeleteSuccessNotification() {
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

  
  viewGalleryDescription(galleryId:number){
    const modalRef = this.modalService.open( AddEditGalleryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.galleryId = galleryId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.componentInstance.isViewMode = true;
    modalRef.result.then((result) => {
      if (result === true) {
        this.rerender();
         this.galleryProfileUpdatedNotification();
      }
    }, (reason) => {

    });
  }
 
  publishGallery(galleryId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_GALLERY')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishGalleryDto();
      requestDto.galleryId=galleryId;
      requestDto.isPublished = true;
      this.galleryService.publishUnpublishGalleryParticulars(requestDto).subscribe(result=>{
        this.galleryPublishSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }

  galleryPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GALLERY_PUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  unPublishGallery(galleryId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_GALLERY')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new PublishUnpublishGalleryDto();
        requestDto.galleryId=galleryId;
        requestDto.isPublished=false;
        this.galleryService.publishUnpublishGalleryParticulars(requestDto).subscribe(result=>{
          this.galleryUnPublishSuccessNotification();
          this.rerender();
        });
      }
    });
  
  }
   
  galleryUnPublishSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GALLERY_UNPUBLISHED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
}
