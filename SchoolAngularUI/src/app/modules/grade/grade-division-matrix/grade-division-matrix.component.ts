import { Component, OnInit, ViewChild } from '@angular/core';

// import library classes
import { CommonDivisionWithDisabled, DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, GradeDivisionMatrixDto, GradeDivisionMatrixServiceProxy, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolGradeDivisionMatrixWithDisabledDto } from 'src/app/services/school-api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-grade-division-matrix',
  templateUrl: './grade-division-matrix.component.html',
  styleUrls: ['./grade-division-matrix.component.scss']
})
export class GradeDivisionMatrixComponent implements OnInit{
  showDivision = true;
  gradeDivisionForm: FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  //divisionDropdownList:Division[]=[];

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  gradeDivisions:GradeDivisionMatrixDto[]=[];
  
  dtTrigger: Subject<any> = new Subject();

  divisionDropdownList: CommonDivisionWithDisabled[]=[];
  divisionFilteredDropdownList: CommonDivisionWithDisabled[];
  divisionGradeMapping: SchoolGradeDivisionMatrixWithDisabledDto[]=[];
   academicYearId : number;
  // multiselect dropdown code here
  
   
 // selectedItems : any[]=[];

  constructor(public translate: TranslateService,  private modalService: NgbModal,
    private formBuilder: FormBuilder, private masterService:MasterServiceProxy,private userService:UserService,
    private gradeDivisionMatrixService:GradeDivisionMatrixServiceProxy,  private toastEvokeService: ToastEvokeService,
    private http: HttpClient,  public sharedPermissionServiceService : SharedPermissionServiceService) 
    {}

   ngOnInit(): void {
    

    this.gradeDivisionForm = this.formBuilder.group({
      gradeId :[null,Validators.required],
      divisionId:[[],Validators.required]
     });


this.getMasterDropdownData();
    this.gradeDivisionForm.get('gradeId')?.valueChanges.subscribe((gradeId:string) => {
    this.bindDivision(gradeId);
    });

    
  const that = this;


  //this.clearFilter();

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
          environment.API_BASE_URL+"/api/GradeDivisionMatrix/GetGradeDivisionMatrixList",
          {getListModel:requestListModel,academicYearId:this.academicYearId},{}
        ).subscribe(resp => {
          that.gradeDivisions = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },order: [[ 0, "asc" ]],
    columns: [
              { data: 'gradeName', searchable: true, orderable: true },
              { data: 'gradeDivisions', searchable: true, orderable: true }]
  };

  }

  onSelectAll(event:any){}

  bindDivision(gradeId : string){
    if(!gradeId || gradeId == null || gradeId == undefined || gradeId == ''){
      return;
    }
    this.showDivision = false;
    this.gradeDivisionForm.get('divisionId')?.setValue([]); 
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
      this.divisionDropdownList=gradeMaster.divisions as [];
      this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as [];
      this.divisionFilteredDropdownList =[];
      let divisionList= this.divisionGradeMapping.filter(x=>x.gradeId===parseInt(gradeId)).map(x=>x.divisionId);
      //if(divisionList && divisionList.length>0){
        this.divisionFilteredDropdownList = this.divisionDropdownList;
      this.divisionFilteredDropdownList.forEach(filterDivision=>{
        let divisionMapping=this.divisionGradeMapping.filter(x=>x.gradeId===parseInt(gradeId)
        && x.divisionId===filterDivision.divisionId);
        if(divisionMapping && divisionMapping.length>0){
          filterDivision.disabled=true;
        }
        else{
          filterDivision.disabled=false;
        }
      });
      setTimeout(() => {
        this.showDivision = true;
      }, 100);  
    });
  }

  gradeDivisionMatrixUpdateSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('GRADE_DIVISION_MAPPING_PROFILE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  saveGradeDivisionProfile(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.gradeDivisionForm.invalid) {
        return;
    }

    this.gradeDivisionMatrixService.gradeDivisionMatrixDataUpsert(this.academicYearId, this.gradeDivisionForm.getRawValue() as GradeDivisionMatrixDto).subscribe(data=>{
      this.gradeDivisionMatrixUpdateSuccessNotification();
      this.bindDivision(this.gradeDivisionForm.get('gradeId')?.getRawValue());
      this.rerender();
      this.onReset();
    });
  }

  get f() { return this.gradeDivisionForm.controls; }
  
getMasterDropdownData(){
  this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
    this.gradeDropdownList=gradeMaster.grades as Grade[];
    this.divisionDropdownList=gradeMaster.divisions as [];
    this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as [];
    
  });
}

onReset(){
  this.submitted=false;
  this.gradeDivisionForm.reset();
}






divisionDeleteSuccessNotification() {
const newToastNotification = new ToastNotificationInitializer();
newToastNotification.setTitle(this.translate.instant('SUCCESS'));
newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
newToastNotification.openToastNotification$();
}
gradeDeleteUnSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  const title = this.translate.instant('FAILED_TO_DELETE_!');
  const message = this.translate.instant('YOU_CAN_NOT_DELETE');
  this.toastEvokeService.danger(
    title,
    message
  ).subscribe();
}

confirmGradeDivisionDelete(divisionDto : any, divisionItem:string, gradeName:string) {
  let divisionName = divisionItem.replace(gradeName,'');
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
  this.gradeDivisionMatrixService.gradeDivisionMatrixDelete(divisionDto.gradeId, divisionName, this.academicYearId).subscribe(data=>{
       
    if(data.affectedRows>0){
        this.divisionDeleteSuccessNotification();
        this.bindDivision(this.gradeDivisionForm.get('gradeId')?.getRawValue());
        this.rerender(); 
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

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: any) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next(null);
  });
}

  
}
