import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ParentServiceProxy, DatatableResponseModel, ParentDto, MasterServiceProxy, Grade, Division, SchoolGradeDivisionMatrixDto, GradeDivisionMasterDto } from 'src/app/services/school-api-service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user-service';


@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent  implements OnInit{

@ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  parents: ParentDto[];
  dtTrigger: Subject<any> = new Subject();
  parentForm: FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  gradeId:any;
  divisionId:any;


  constructor( private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private parentService:ParentServiceProxy,
    private http: HttpClient,
    private router:Router,
    private formBuilder: FormBuilder,
    private masterService:MasterServiceProxy,
    private userService:UserService,
    public sharedPermissionServiceService : SharedPermissionServiceService) {
  }

 ngOnInit(): void {
  this.parentForm = this.formBuilder.group({
    classId: [null], 
   });
   
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
      //lengthMenu:"Show entries MENU",
    },
    ajax: (requestListModel: any, callback : any) => {
      that.http
        .post<DatatableResponseModel>(
          environment.API_BASE_URL+"/api/Parent/GetParentList",
          {getListModel:requestListModel,academicYearId:this.academicYearId,gradeId:this.gradeId,
            divisionId:this.divisionId},{}
        ).subscribe(resp => {
          that.parents = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [
              { data: 'studentFullName', searchable: true, orderable: true },
              { data: 'parentFullName', searchable: true, orderable: true },
              { data: 'parentType', searchable: true, orderable: true },
              { data: 'mobileNumber', searchable: true, orderable: true },
              { data: 'address', searchable: true, orderable: true },
              { data: 'emailId', searchable: true, orderable: true },
              {data:null,searchable:false,orderable:false }]
  };
  }
   
  parentDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  parentDeleteUnSuccessNotification() {
    this.toastEvokeService.danger('FAILED_TO_DELETE_!', 'You Cannot Delete Parent').subscribe();
  }

  confirmParentDelete(parent:ParentDto) {
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
      this.parentService.parentProfileDelete(parent.parentId).subscribe(data=>{
        if(data.affectedRows>0){
            this.parentDeleteSuccessNotification();
             this.rerender(true); 
           }   
           else{
             this.parentDeleteUnSuccessNotification();
           }      
    });
     }
     
    });
  }
 

  academicYearId:number;
  ngAfterViewInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.getMasterDropdownData();
        this.dtTrigger.next(null);
    });
   
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  parentSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('PARENT_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  addParent(){
    this.router.navigate(['parents/add-edit-parent']);
  }
  
editParent(parent:ParentDto){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      parentId:parent.parentId,
  }), environment.ENCRYPTION_PASSWORD).toString();

this.router.navigate(['parents/add-edit-parent',encryptedString]);
}

getMasterDropdownData(){
  this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
    this.gradeDropdownList=gradeMaster.grades as Grade[];
    this.divisionDropdownList=gradeMaster.divisions as Division[];
    this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
    
    
 });
}

get f() { return this.parentForm.controls; }

searchParent(){
  debugger;
  if(!this.parentForm.valid){
   return;
  }
  const selectedClassId = this.parentForm.get('classId')?.value;
  const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    sessionStorage.setItem('ParentListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
  }else {
    // If the selected class mapping is not found, set both gradeId and divisionId to null
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('ParentListing');
  }
 
  this.rerender();
}
onReset(){
  this.parentForm.reset();
  this.searchParent();
  sessionStorage.removeItem('ParentListing');
}
  
}

  

