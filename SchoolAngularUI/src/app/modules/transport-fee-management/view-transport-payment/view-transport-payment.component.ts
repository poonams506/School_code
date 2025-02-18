import { Component, Injector, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import library classes
import {
  ToastEvokeService,
  ConfirmBoxInitializer,
  ToastNotificationInitializer} from '@costlydeveloper/ngx-awesome-popup';
import { TranslateLoader} from '@ngx-translate/core';
import { BaseComponent } from '../../base/base-component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatatableResponseModel , Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StudentDto, TransportFeePaymentServiceProxy, TransportFeePaymentStoppageDto, TransportFeePaymentStoppageGridDto }  from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js/'; 
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
@Component({
  selector: 'app-view-transport-payment',
  templateUrl: './view-transport-payment.component.html',
  styleUrls: ['./view-transport-payment.component.scss']
})
export class ViewTransportPaymentComponent implements OnInit{
  transportFeePaymentStoppageDtoList : TransportFeePaymentStoppageDto[]=[];
  hlighlightedConsumerId = 0;
  expand(item:any)
  {
    this.transportFeePaymentStoppageDtoList = [];
    let current = item.isExpand;
    this.transportFeePaymentsStudents.forEach(feePayment => {
      feePayment.isExpand=false;
    });
    item.isExpand=!current;
    this.transportFeePaymentService.getTransportFeePaymentStoppageGridLIst(this.academicYearId,item.studentId,5).subscribe((result:TransportFeePaymentStoppageGridDto)=>{
      this.transportFeePaymentStoppageDtoList=result.transportFeePaymentStoppageDtoList as TransportFeePaymentStoppageDto[];
   });
   let pageNo = 0;
        this.dtElements.first.dtInstance.then((x)=>{
          pageNo = x.page.info().page;
          sessionStorage.setItem('transport-payment-search',x.search());
          sessionStorage.setItem('transport-payment-page-number',pageNo.toString());
          sessionStorage.setItem('transport-payment-student-id',item.studentId.toString());
          });
  }

  expandTwo(item:any)
  {
    this.transportFeePaymentStoppageDtoList = [];
    let current = item.isExpandT;
    this.transportFeePaymentsStaff.forEach(feePayment => {
      feePayment.isExpandT=false;
    });
    item.isExpandT=!current;
    this.transportFeePaymentService.getTransportFeePaymentStoppageGridLIst(this.academicYearId,item.consumerId,item.roleId).subscribe((result:TransportFeePaymentStoppageGridDto)=>{
      this.transportFeePaymentStoppageDtoList=result.transportFeePaymentStoppageDtoList as TransportFeePaymentStoppageDto[];
   });
   let pageNo = 0;
        this.dtElements.last.dtInstance.then((x)=>{
          pageNo = x.page.info().page;
          sessionStorage.setItem('transport-payment-search',x.search());
          sessionStorage.setItem('transport-payment-page-number',pageNo.toString());
          sessionStorage.setItem('transport-payment-student-id',item.studentId.toString());
          });
  }


  
  
  paymentForm: FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  transportFeePaymentsStaff: any[];
  transportFeePaymentsStudents: any[];
  gradeId:any;
  divisionId:any;
  roleId = 5 ;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions1: any = {};
  dtOptions2: any = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  

  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private formBuilder: FormBuilder,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private transportFeePaymentService:TransportFeePaymentServiceProxy,
  ) {

  }

  ngOnInit(): void {
    
    //const that = this;
    this.paymentForm = this.formBuilder.group({
      // gradeId :[null],
      // divisionId:[null]
      roleId: [5],
      classId: [null],
     });

  
  
    //this.clearFilter();
  
  

    this.getLocalStorageFilter();
    let that=this;
    
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder:this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
  
        //lengthMenu:"Show entries _MENU_",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/TransportFeePayment/GetTransportFeePaymentStudentGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId, gradeId:this.gradeId,
              divisionId:this.divisionId}
          ).subscribe(resp => {
          
            that.transportFeePaymentsStudents = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          },
          error=>{
          
          });
      },order: [[ 0, "asc" ]],
      columns: [
                { data: 'gradeName', searchable: false, orderable: true },
                { data: 'fullName', searchable: true, orderable: true },
                { data: 'generalRegistrationNo', searchable: true, orderable: true },
                { data: 'isRTEStudent', searchable: false, orderable: false },
                { data: 'totalFee', searchable: true, orderable: true },
                { data: 'discountedFee', searchable: true, orderable: true },
                { data: 'paidAmount', searchable: true, orderable: true },
                { data: 'dueAmount', searchable: true, orderable: true },
                { data: 'chequeUnclearAmount', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder:this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
  
        //lengthMenu:"Show entries _MENU_",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/TransportFeePayment/GetTransportFeePaymentStaffGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId}
          ).subscribe(resp => {
          
            that.transportFeePaymentsStaff = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          },
          error=>{
          
          });
      },order: [[ 0, "asc" ]],
      columns: [
                { data: 'fullName', searchable: true, orderable: true },
                { data: 'RoleName', searchable: true, orderable: true },
                { data: 'totalFee', searchable: true, orderable: true },
                { data: 'discountedFee', searchable: true, orderable: true },
                { data: 'paidAmount', searchable: true, orderable: true },
                { data: 'dueAmount', searchable: true, orderable: true },
                { data: 'chequeUnclearAmount', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

    this.paymentForm.get('gradeId')?.valueChanges.subscribe((gradeId:string) => {
      this.divisionFilteredDropdownList =[];
      let divisionList= this.divisionGradeMapping.filter(x=>x.gradeId===parseInt(gradeId)).map(x=>x.divisionId);
     if(divisionList && divisionList.length>0){
      this.divisionFilteredDropdownList = this.divisionDropdownList
      .filter(division => divisionList.includes(division.divisionId));
    
     
    }
    this.paymentForm.get('divisionId')?.setValue(null); 
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

getLocalStorageFilter(){
  let storedClassId = sessionStorage.getItem("TransportPaymentListing");
  if(storedClassId != null && storedClassId != undefined && storedClassId != ""){
    this.paymentForm.get('classId')?.patchValue(storedClassId.split('_')[0]);
    this.gradeId = parseInt(storedClassId.split('_')[1]);
    this.divisionId = parseInt(storedClassId.split('_')[2]);
  }
}

academicYearId:number;
ngAfterViewInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.getMasterDropdownData();
      this.dtTrigger1.next(null);
      this.dtTrigger2.next(null);
      setTimeout(() => {
        this.setPage();
      }, 500);
  });
 
}

search(){
  if(!this.paymentForm.valid){
   return;
  }
  const selectedClassId = this.paymentForm.get('classId')?.value;
  const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    sessionStorage.setItem('TransportPaymentListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
  }else {
    // If the selected class mapping is not found, set both gradeId and divisionId to null
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('TransportPaymentListing');
    sessionStorage.removeItem('transport-payment-page-number');
    sessionStorage.removeItem('transport-payment-student-id');
    sessionStorage.removeItem('transport-payment-search');
    this.hlighlightedConsumerId = 0;
  }
  this.rerender();
}
    
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger1.unsubscribe();
      this.dtTrigger2.unsubscribe();
    }
    
    rerender(): void {
      this.dtElements.forEach((dtElement:DataTableDirective)=>{
        dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.ajax.reload();
        });
      });
    }
    onReset(){
      const oldRoleId = this.paymentForm.get('roleId')?.value;
      this.paymentForm.reset();
      sessionStorage.removeItem('TransportPaymentListing');
      sessionStorage.removeItem('transport-payment-page-number');
      sessionStorage.removeItem('transport-payment-student-id');
      sessionStorage.removeItem('transport-payment-search');
      this.hlighlightedConsumerId = 0;
      this.paymentForm.get('roleId')?.patchValue(oldRoleId);
      this.search();
    }  
    get f() { return this.paymentForm.controls; }


    pay(item : any){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          consumerId: item.consumerId,
          roleId : item.roleId,
          academicYearId:this.academicYearId,
          gradeId : item.roleId == 5 ? item.gradeId : 0,
          divisionId : item.roleId == 5 ? item.divisionId : 0,
          dueAmount : item.dueAmount,
          routeId : item.routeId,
          transportConsumerStoppageMappingId : item.transportConsumerStoppageMappingId
      }), environment.ENCRYPTION_PASSWORD).toString();
      this.router.navigate(['transport-fee-management/transport-fee-payment',encryptedString]);

      
              
    }

    paymentHistory (item : any){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          consumerId: item.consumerId,
          roleId : item.roleId,
          academicYearId:this.academicYearId,
          gradeId : item.roleId == 5 ? item.gradeId : 0,
          divisionId : item.roleId == 5 ? item.divisionId : 0,
          dueAmount : item.dueAmount,
          routeId : item.routeId,
          transportConsumerStoppageMappingId : item.transportConsumerStoppageMappingId
      }), environment.ENCRYPTION_PASSWORD).toString();
      this.router.navigate(['transport-fee-management/transport-payment-history',encryptedString]);
    }

    setPage(){
      this.dtElements.forEach((dtElement:DataTableDirective)=>{
        dtElement.dtInstance.then((dtInstance: any) => {
          if(sessionStorage.getItem('transport-payment-page-number') && sessionStorage.getItem('transport-payment-page-number') != null
          && sessionStorage.getItem('transport-payment-page-number') != undefined &&
          sessionStorage.getItem('transport-payment-page-number') != ""){
            if(parseInt(sessionStorage.getItem('transport-payment-page-number')?.toString()!)){
              dtInstance.page(parseInt(sessionStorage.getItem('transport-payment-page-number')?.toString()!)).draw('page');
            }
          }
          if(sessionStorage.getItem('transport-payment-search') && sessionStorage.getItem('transport-payment-search') != null
          && sessionStorage.getItem('transport-payment-search') != undefined &&
          sessionStorage.getItem('transport-payment-search') != ""){
            if(sessionStorage.getItem('transport-payment-search')?.toString()!){
              dtInstance.search(sessionStorage.getItem('transport-payment-search')?.toString()!).draw();
            }
          }
        });
      });
      
      if(sessionStorage.getItem('transport-payment-student-id') && sessionStorage.getItem('transport-payment-student-id') != null
        && sessionStorage.getItem('transport-payment-student-id') != undefined &&
        sessionStorage.getItem('transport-payment-student-id') != ""){
          if(parseInt(sessionStorage.getItem('transport-payment-student-id')?.toString()!)){
            this.hlighlightedConsumerId = parseInt(sessionStorage.getItem('transport-payment-student-id')?.toString()!);
          }
        }
        
    }

}
     

