import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-class-attendance-report',
  templateUrl: './class-attendance-report.component.html',
  styleUrls: ['./class-attendance-report.component.scss']
})

export class ClassAttendanceReportComponent implements OnInit {
  submitted = false;
  gradeId:any;
  divisionId:any;
  classAttendanceReportForm:FormGroup;
  ngbtakenOn:any;
  classAttendanceReport:any[];
  academicYearId:number;
  minDate = {year:new Date().getFullYear() - 100, month: 1, day: 1};
  maxDate = {year:new Date().getFullYear() + 10, month: 1, day: 1};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  errorMessage:string;
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
    debugger
    this.classAttendanceReportForm = this.formBuilder.group({
      ngbtakenOn:  [{day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      } as NgbDateStruct,],
     
     });
     this.requestProcess();
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
    },
    ajax: (requestListModel: any, callback : any) => {
      debugger
      that.http
        .post<DatatableResponseModel>(
          environment.API_BASE_URL+"/api/StudentAttendanceDateWise/StudentAttendanceReportDateWise",
          {getListModel:requestListModel,academicYearId:this.academicYearId,
             gradeId:this.gradeId,
            divisionId:this.divisionId,
            ngbtakenOn: this.ngbtakenOn,
          },{}
        ).subscribe(resp => { 
          if(resp.data!=1){
              that.classAttendanceReport = resp.data;
          }
          else{
            this.errorMessage="SELECTED_DAY_IS_HOLIDAY";
          }
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
    columns: [
              { data: 'className', searchable: true, orderable: true },
              { data: 'status', searchable: true, orderable: true },
              { data: 'takenBy', searchable: true, orderable: true },
              { data: 'takenOn', searchable: false, orderable: true },
              ]
  };
}
search(){
  this.requestProcess();
  this.rerender();
}
requestProcess(){
  debugger;
  if(!this.classAttendanceReportForm.valid){
   return;
  }
  this.ngbtakenOn =  this.classAttendanceReportForm.get('ngbtakenOn')?.value;
   //this.rerender();
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
  
  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
    
      this.dtTrigger.next(null);
      this.errorMessage = '';
    });
  }
  clearErrorMessage() {
    // Clear the error message when the input is cleared
    if (this.classAttendanceReportForm.get('ngbtakenOn')?.value == '') {
      this.errorMessage = '';
    }
  }
  onReset(){
        this.classAttendanceReportForm.reset();
        this.search();
      }  
  get f() { return this.classAttendanceReportForm.controls; }
     
}