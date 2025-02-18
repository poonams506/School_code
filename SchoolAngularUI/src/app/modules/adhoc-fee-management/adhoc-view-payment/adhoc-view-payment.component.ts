import { Component, Injector, OnInit, ViewChild } from '@angular/core';
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
import { DatatableResponseModel , Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StudentDto }  from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js/'; 
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
@Component({
  selector: 'app-adhoc-view-payment',
  templateUrl: './adhoc-view-payment.component.html',
  styleUrls: ['./adhoc-view-payment.component.scss']
})
export class AdhocViewPaymentComponent implements OnInit{
  paymentForm: FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  adhocFeePayments: any[];
  gradeId:any;
  divisionId:any;

  dtTrigger: Subject<any> = new Subject();
  
  hlighlightedStudentId = 0;
  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private formBuilder: FormBuilder,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
    
  ) {

  }

  ngOnInit(): void {
    
    //const that = this;
    this.paymentForm = this.formBuilder.group({
      // gradeId :[null],
      // divisionId:[null]
      classId: [null],
     });

  
  
    //this.clearFilter();
  
    

    this.getLocalStorageFilter();

    let that=this;
    
    this.dtOptions = {
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
            environment.API_BASE_URL+"/api/AdhocFeePayment/GetAdhocFeePaymentGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId, gradeId:this.gradeId,
              divisionId:this.divisionId}
          ).subscribe(resp => {
          
            that.adhocFeePayments = resp.data;
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
                { data: 'chequeClearedAmount', searchable: true, orderable: true },
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
  let storedClassId = sessionStorage.getItem("AdhocPaymentListing");
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
      this.dtTrigger.next(null);
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
    sessionStorage.setItem('AdhocPaymentListing', selectedClassId + "_" + this.gradeId + "_" + this.divisionId);
  }else {
    // If the selected class mapping is not found, set both gradeId and divisionId to null
    this.gradeId = null;
    this.divisionId = null;
    sessionStorage.removeItem('AdhocPaymentListing');
    sessionStorage.removeItem('adhoc-payment-page-number');
    sessionStorage.removeItem('adhoc-payment-student-id');
    sessionStorage.removeItem('adhoc-payment-search');
    this.hlighlightedStudentId = 0;
  }
  this.rerender();
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
    onReset(){
      this.paymentForm.reset();
      sessionStorage.removeItem('AdhocPaymentListing');
      sessionStorage.removeItem('adhoc-payment-page-number');
      sessionStorage.removeItem('adhoc-payment-student-id');
      sessionStorage.removeItem('adhoc-payment-search');
      this.hlighlightedStudentId = 0;
      this.search();
    }  
    get f() { return this.paymentForm.controls; }


    pay(item : any){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          studentId:item.studentId,
          academicYearId:this.academicYearId,
          gradeId : item.gradeId,
          divisionId : item.divisionId,
          dueAmount : item.dueAmount
      }), environment.ENCRYPTION_PASSWORD).toString();
      
      let pageNo = 0;
      this.dtElement.dtInstance.then((x)=>{
        pageNo = x.page.info().page;
        sessionStorage.setItem('adhoc-payment-search',x.search());
        sessionStorage.setItem('adhoc-payment-page-number',pageNo.toString());
        sessionStorage.setItem('adhoc-payment-student-id',item.studentId.toString());
        this.router.navigate(['adhoc-fee-management/adhoc-fee-payment',encryptedString]);
              });
    }

    paymentHistory (item : any){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          studentId:item.studentId,
          academicYearId:this.academicYearId,
          gradeId : item.gradeId,
          divisionId : item.divisionId
      }), environment.ENCRYPTION_PASSWORD).toString();
      
      let pageNo = 0;
      this.dtElement.dtInstance.then((x)=>{
        pageNo = x.page.info().page;
        sessionStorage.setItem('adhoc-payment-search',x.search());
        sessionStorage.setItem('adhoc-payment-page-number',pageNo.toString());
        sessionStorage.setItem('adhoc-payment-student-id',item.studentId.toString());
        this.router.navigate(['adhoc-fee-management/adhoc-payment-history',encryptedString]);
      });
    }

    setPage(){
      this.dtElement.dtInstance.then((dtInstance: any) => {
        if(sessionStorage.getItem('adhoc-payment-page-number') && sessionStorage.getItem('adhoc-payment-page-number') != null
        && sessionStorage.getItem('adhoc-payment-page-number') != undefined &&
        sessionStorage.getItem('adhoc-payment-page-number') != ""){
          if(parseInt(sessionStorage.getItem('adhoc-payment-page-number')?.toString()!)){
            dtInstance.page(parseInt(sessionStorage.getItem('adhoc-payment-page-number')?.toString()!)).draw('page');
          }
        }
        if(sessionStorage.getItem('adhoc-payment-search') && sessionStorage.getItem('adhoc-payment-search') != null
        && sessionStorage.getItem('adhoc-payment-search') != undefined &&
        sessionStorage.getItem('adhoc-payment-search') != ""){
          if(sessionStorage.getItem('adhoc-payment-search')?.toString()!){
            dtInstance.search(sessionStorage.getItem('adhoc-payment-search')?.toString()!).draw();
          }
        }
      });
      if(sessionStorage.getItem('adhoc-payment-student-id') && sessionStorage.getItem('adhoc-payment-student-id') != null
        && sessionStorage.getItem('adhoc-payment-student-id') != undefined &&
        sessionStorage.getItem('adhoc-payment-student-id') != ""){
          if(parseInt(sessionStorage.getItem('adhoc-payment-student-id')?.toString()!)){
            this.hlighlightedStudentId = parseInt(sessionStorage.getItem('adhoc-payment-student-id')?.toString()!);
          }
        }
        
    }

}
      

