import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StudentAttendanceReportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-attendance-report',
  templateUrl: './student-attendance-report.component.html',
  styleUrls: ['./student-attendance-report.component.scss']
})
export class StudentAttendanceReportComponent implements OnInit {
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;
  studentAttendanceReportForm:FormGroup;
  submitted = false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  attendanceReports:any[];
  classIds:any;
  gradeId:any;
  divisionId:any;
  ngbfromDate:any;
  ngbtillDate:any;
  academicYearId:number;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
 
  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private masterService:MasterServiceProxy,
    private formBuilder: FormBuilder,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {

  }
  
  ngOnInit(): void {
    debugger;
    this.studentAttendanceReportForm = this.formBuilder.group({
      classId:[null],
      ngbfromDate:  [{   day: 1,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as NgbDateStruct,],
     ngbtillDate:  [{day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as NgbDateStruct,]
      });
      this.minEndDate = null;
    // throw new Error('Method not implemented.');
    this.processRequest();
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
        debugger
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/StudentAttendanceReport/GetStudentAttendanceReportGridList",
            {getListModel:requestListModel,academicYearId:this.academicYearId,
              classIds:this.classIds,
              ngbfromDate: this.ngbfromDate,
              ngbtillDate: this.ngbtillDate
            },{}
          ).subscribe(resp => {
            
              that.attendanceReports = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
      columns: [
                { data: 'className', searchable: true, orderable: true },
                { data: 'rollNumber', searchable: true, orderable: true },
                { data: 'studentName', searchable: true, orderable: true },
                { data: 'totalDay', searchable: false, orderable: true },
                { data: 'presentDay', searchable: true, orderable: true },
                { data: 'halfDay', searchable: true, orderable: true },
                { data: 'absentDay', searchable: true, orderable: true },
                { data: 'attendancePercentage', searchable: true, orderable: true }
              ]
    };
    const today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    
    // Subscribe to start date changes
    this.studentAttendanceReportForm.get('ngbfromDate')?.valueChanges.subscribe(startDate => {
      // Update the minimum selectable end date whenever the start date changes
      this.minEndDate = startDate;
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

  processRequest(){
    if(!this.studentAttendanceReportForm.valid){
      return;
     }
     this.ngbfromDate =  this.studentAttendanceReportForm.get('ngbfromDate')?.value;
     this.ngbtillDate = this.studentAttendanceReportForm.get('ngbtillDate')?.value;
     const selectedClassId = this.studentAttendanceReportForm.get('classId')?.value;
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
  
  onReset(){
    this.studentAttendanceReportForm.reset();
    this.classIds=null;
    this.selectAllClass = false;
    this.rerender();
    } 
      
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
 
      get f() { return this.studentAttendanceReportForm.controls; }

      // start : code for select all Class
     selectAllClass : boolean = false;
     selectAllOptionClass() {
       if(this.selectAllClass){
         const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
         this.studentAttendanceReportForm.get('classId')?.patchValue(selected);
       }
       else{
         this.studentAttendanceReportForm.get('classId')?.patchValue([]);
       }
     }
 
     checkSelectAllClass(){
       let selectedClassList= this.studentAttendanceReportForm.get('classId')?.getRawValue() as number[];
       if(selectedClassList.length == this.divisionGradeMapping.length){
         this.selectAllClass = true;
       }
       else{
         this.selectAllClass = false;
       }
     }
   // end : code for select all
}
