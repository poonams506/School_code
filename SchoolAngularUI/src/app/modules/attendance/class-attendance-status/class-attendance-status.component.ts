import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BulkAttendanceUpdateDto, BulkAttendanceUpdateServiceProxy, DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditBulkAtteandanceComponent } from '../add-edit-bulk-atteandance/add-edit-bulk-atteandance.component';

@Component({
  selector: 'app-class-attendance-status',
  templateUrl: './class-attendance-status.component.html',
  styleUrls: ['./class-attendance-status.component.scss']
})
export class ClassAttendanceStatusComponent {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  classAttendanceList:any[];
  academicYearId:number;
  dtTrigger: Subject<any> = new Subject();
  classAttendanceForm:FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  classIds:any;
  gradeId:any;
  divisionId:any;
  className: string = ''; 
  month: string = ''; 

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private  attendanceStatusService:BulkAttendanceUpdateServiceProxy ,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private formBuilder: FormBuilder,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {}

  ngOnInit(): void {
    this.classAttendanceForm = this.formBuilder.group({
      classId:[null]
      });
      this.processRequest();
    const that = this;


    //this.clearFilter();

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
        //lengthMenu:"Show entries MENU",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/BulkAttendanceUpdate/ClassAttendanceStatusGridSelect",
            {getListModel:requestListModel,academicYearId:this.academicYearId,
              classIds:this.classIds
            },{}
          ).subscribe(resp => {
            
            that.classAttendanceList= resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                 
                { data: 'className', searchable: true, orderable: true },
                { data: 'month', searchable: true, orderable: true },
                { data: 'status', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };

  }
  ngAfterViewInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number
        this.getMasterDropdownData();
        this.dtTrigger.next(null);
    });
  }
  getMasterDropdownData(){
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
      this.gradeDropdownList=gradeMaster.grades as Grade[];
      this.divisionDropdownList=gradeMaster.divisions as Division[];
      this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
   });   
  }
  
    search(){
      this.processRequest();
      this.rerender();
    }
  
  onReset(){
    this.classAttendanceForm.reset();
    this.classIds=null;
    this.selectAllClass = false;
    this.rerender();
    } 
    rerender(hardClear : boolean = false): void {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
      
        this.dtTrigger.next(null);
      });
    }
    processRequest(){
      debugger;
      if(!this.classAttendanceForm.valid){
        return;
       }
       const selectedClassId = this.classAttendanceForm.get('classId')?.value;
       this.classIds = [];
       if(selectedClassId && selectedClassId.length > 0){
         selectedClassId.forEach((classId: number) => {
           const parsedSelectedClassId = parseInt(classId.toString(), 10);
           const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
           if (selectedClassMapping) {
             this.classIds.push(selectedClassMapping.schoolGradeDivisionMatrixId);
           }
         });  
       }
    }
    get f() { return this.classAttendanceForm.controls; }

      // start : code for select all Class
     selectAllClass : boolean = false;
     selectAllOptionClass() {
       if(this.selectAllClass){
         const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
         this.classAttendanceForm.get('classId')?.patchValue(selected);
       }
       else{
         this.classAttendanceForm.get('classId')?.patchValue([]);
       }
     }
     
     checkSelectAllClass(){
       let selectedClassList= this.classAttendanceForm.get('classId')?.getRawValue() as number[];
       if(selectedClassList.length == this.divisionGradeMapping.length){
         this.selectAllClass = true;
       }
       else{
         this.selectAllClass = false;
       }
     }

     ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
   
confirmAttendanceDelete(classAttendance:any){}

editBulkAttendance(bulkAttendance: BulkAttendanceUpdateDto) {
  debugger;
  const modalRef = this.modalService.open(AddEditBulkAtteandanceComponent, { size: 'xl', backdrop: 'static' });
  modalRef.componentInstance.gradeId = bulkAttendance.gradeId;
  modalRef.componentInstance.divisionId = bulkAttendance.divisionId;
  modalRef.componentInstance.monthId = bulkAttendance.monthId;
  modalRef.componentInstance.year = bulkAttendance.year;
  modalRef.componentInstance.academicYearId = bulkAttendance.academicYearId;
  modalRef.componentInstance.className = bulkAttendance.className;
  modalRef.componentInstance.month = bulkAttendance.month;
  modalRef.componentInstance.status = bulkAttendance.status;
  modalRef.componentInstance.modelRef = modalRef;
  modalRef.result.then((result) => {
    if (result === true) {
      this.rerender();
      this.editBulkAttendanceUpdateNotification();
    }
    else{
      this.rerender();
    }
  },(reason) => {
  });
  }

editBulkAttendanceUpdateNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('BULK_ATTENDANCE_SAVED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

}