import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, FeeParticularCloneDto, FeeParticularServiceProxy, PublishUnpublishParticularDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { IFeeStructureUrlDto } from '../fee-structure-url-dto.interface';
import * as CryptoJS from 'crypto-js/';  
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { CloneFeeParticularStructureComponent } from '../clone-fee-particular-structure/clone-fee-particular-structure.component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { CloneStudentKitFeeParticularStructureComponent } from '../clone-student-kit-fee-particular-structure/clone-student-kit-fee-particular-structure.component';


@Component({
  selector: 'app-view-fee-structure',
  templateUrl: './view-student-kit-fee-structure.component.html',
  styleUrls: ['./view-student-kit-fee-structure.component.scss']
})
export class ViewStudentKitFeeStructureComponent implements OnInit{

  
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  feeStructures: any[];

  dtTrigger: Subject<any> = new Subject();


  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private particularService:FeeParticularServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

  }

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
            environment.API_BASE_URL+"/api/FeeParticular/GetStudentKitFeeParticularGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            that.feeStructures = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [ 
                { data: 'gradeName', searchable: true, orderable: true },
                { data: 'status', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };
  }

  

academicYearId:number;
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

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: any) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next(null);
  });
}

viewFeeStructure(classId:number,status:string){
  let feeStructureURLDto:IFeeStructureUrlDto={classId,isEditMode:false,isAlreadyExist:status!='Not-Created', title : 'View'};
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(feeStructureURLDto), environment.ENCRYPTION_PASSWORD).toString();

this.router.navigate(['fee-management/create-student-kit-fee-structure',encryptedString]);
}

editFeeStructure(classId:number,status:string, title:string){
  let feeStructureURLDto:IFeeStructureUrlDto={classId,isEditMode:true,isAlreadyExist:status!='Not-Created', title : title}
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(feeStructureURLDto), environment.ENCRYPTION_PASSWORD).toString();

  this.router.navigate(['fee-management/create-student-kit-fee-structure',encryptedString]);
}


feeParticularPublishSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_PARTICULAR_PUBLISHED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


feeParticularUnPublishSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_PARTICULAR_UNPUBLISHED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

publishFeeParticular(gradeId:number,divisionId:number){
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
  newConfirmBox.setMessage(
    this.translate.instant('ARE_YOU_SURE_YOU_WANT_DO_PUBLISH_FEE_STRUCTURE')
  );
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'), // default confirmation button label
    declineLabel: this.translate.instant('NO'),
  });
  // Simply open the popup and observe button click
  newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
   if(resp?.success){
    let requestDto=new PublishUnpublishParticularDto();
    requestDto.gradeId=gradeId;
    requestDto.divisionId=divisionId;
    requestDto.academicYearId=this.academicYearId;
    requestDto.isPublish=true;
    this.particularService.publishUnpublishGradeDivisionStudentKitParticulars(requestDto).subscribe(result=>{
      this.feeParticularPublishSuccessNotification();
      this.rerender();
    });
    }
  });
 
}
unPublishFeeParticular(gradeId:number,divisionId:number)
{
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
  newConfirmBox.setMessage(
    this.translate.instant('ARE_YOU_SURE_YOU_WANT_DO_UNPUBLISH_FEE_STRUCTURE')
  );
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'), // default confirmation button label
    declineLabel: this.translate.instant('NO'),
  });
  // Simply open the popup and observe button click
  newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
   if(resp?.success){
    let requestDto=new PublishUnpublishParticularDto();
      requestDto.gradeId=gradeId;
      requestDto.divisionId=divisionId;
      requestDto.academicYearId=this.academicYearId;
      requestDto.isPublish=false;
      this.particularService.publishUnpublishGradeDivisionStudentKitParticulars(requestDto).subscribe(result=>{
        this.feeParticularUnPublishSuccessNotification();
        this.rerender();
      },error=>{
        console.log('log => ', error);
      });
    }
  });
}

cloneFeeParticular(item:any){
  const modalRef = this.modalService.open(CloneStudentKitFeeParticularStructureComponent, { size: 'md',backdrop:'static' });
  let feeParticularCloneDto:FeeParticularCloneDto=new FeeParticularCloneDto();
  feeParticularCloneDto.academicYearId=this.academicYearId;
  feeParticularCloneDto.fromClassId =item.classId
  feeParticularCloneDto.fromClassName=item.gradeName;
  modalRef.componentInstance.academicYearId=this.academicYearId;
  modalRef.componentInstance.cloneFeeParticularForm.patchValue(feeParticularCloneDto);
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result) => {
    if(result==true)
    {
      this.feeParticularCloneSuccessNotification();
      this.rerender();

    }

  }, () => {

  });
}

feeParticularCloneSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_PARTICULAR_CLONED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


feeParticularDeleteSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

feeParticularCopiedFromLastAYSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_PARTICULAR_COPIED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

feeParticularNotFound() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
  newToastNotification.setMessage(this.translate.instant('OOPS_NO_FEE_PARTICULAR_DATA_FOUND_FOR_LAST_YEAR'));
  newToastNotification.openToastNotification$();
}

confirmFeeParticularDelete(gradeId:number,divisionId:number) {
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
    this.particularService.studentKitFeeParticularDelete(gradeId,divisionId,this.academicYearId).subscribe(data=>{
    this.feeParticularDeleteSuccessNotification();
    this.rerender();
     });
    }
  });
}

copyFeeParticularsFromLastAY(gradeId:number,divisionId:number) {
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
  newConfirmBox.setMessage(
    this.translate.instant('COPY_FEE_PARTICULARS_FROM_LAST_YEAR')
  );
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'), // default confirmation button label
    declineLabel: this.translate.instant('NO'),
  });
  // Simply open the popup and observe button click
  newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
   if(resp?.success){
    this.particularService.copyStudentKitFeeParticularsFromLastAY(gradeId,divisionId).subscribe(data=>{
    if(data == 1){
      this.feeParticularCopiedFromLastAYSuccessNotification();
    }
    else if(data == -1){
      this.feeParticularNotFound();
    }
    this.rerender();
     });
    }
  });
}

}
