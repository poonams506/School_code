import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StudentAttendanceServiceProxy, TeacherDropDownDto, TeacherGradeDivisionMappingDto, TeacherGradeDivisionMappingServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-grade-division-mapping',
  templateUrl: './teacher-grade-division-mapping.component.html',
  styleUrls: ['./teacher-grade-division-mapping.component.scss']
})
export class TeacherGradeDivisionMappingComponent {
  submitted = false;
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  teacherDropdownList: TeacherDropDownDto[] = [];
  gradeId:any;
  divisionId:any;
  academicYearId:any;
  classId:any;
  teacherList:number[];
  teacherIds:[];
  responseList:any[];
  teacherMappings:TeacherGradeDivisionMappingDto[];
  teacherMappingsClone:TeacherGradeDivisionMappingDto[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  teacherGradeDivisionMappingForm: FormGroup;
 
  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    private masterService:MasterServiceProxy,
    private formBuilder: FormBuilder,
    private teacherGradeDivisionMappingService:TeacherGradeDivisionMappingServiceProxy,
    private studentAttendanceService: StudentAttendanceServiceProxy,
    // public sharedPermissionServiceService : SharedPermissionServiceService
  ) {
}
ngOnInit(): void {
  this.teacherGradeDivisionMappingForm = this.formBuilder.group({
    teacherIds:[[]],
    gradeId:[null],
    divisionId:[null], 
    teacherDropdownList: [] = [],
  
  });
   //this.getTeacherDropdownData();
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      stateSave: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder:this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/TeacherGradeDivisionMapping/GetTeacherGradeDivisionMappingList",
            {getListModel:requestListModel,
              academicYearId:this.academicYearId
               },{}
          ).subscribe(resp => {
            that.teacherMappings = resp.data;
            that.teacherMappingsClone = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
      columns: [
                { data: 'className', searchable: true, orderable: true },
                { data: 'fullName', searchable: false, orderable: false }
              ]
    };
    
  }
   getTeacherDropdownData() { 
       this.studentAttendanceService.getAllTeacherForDropDown().subscribe(result => {
       this.teacherDropdownList = result.teacherDropdownList;
     });
    }

    isDisabled(item : any, gradeId : number, divisionId : number){
      var result = false;
      if(this.teacherMappingsClone && this.teacherMappingsClone.length > 0){
       let obj =  this.teacherMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId);
       if(obj && obj[0]){
        if(obj[0]["teacherList"] && obj[0]["teacherList"].length > 0){
            let array = obj[0]["teacherList"];
            if(array.filter(x=>x == item.teacherId).length > 0){
              result = true;
            }
        }
       }
      }
      return result;
     }
    onDropDownAdd(teacherMapping:TeacherGradeDivisionMappingDto,event:TeacherDropDownDto, gradeId : number, divisionId : number){
      this.gradeId = gradeId;
      this.divisionId = divisionId;
      if(this.canItemAdd(this.teacherMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].teacherIds,teacherMapping.teacherList)){
        this.UpdateTeacherDropdownSelectedList(teacherMapping,event);
      }
     }
    

    onDropDownClose(teacherMapping:TeacherGradeDivisionMappingDto,event:TeacherDropDownDto, gradeId : number, divisionId : number) 
      {
        this.gradeId = gradeId;
        this.divisionId = divisionId;
          if(this.teacherList == undefined || this.teacherList == null){
            teacherMapping.teacherIds = this.teacherMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].teacherIds;
            this.teacherList  = teacherMapping.teacherIds.split(",").map(Number).sort();
            this.teacherList = this.teacherList.filter(x=>x != null && x !=  undefined && x != 0);
          } 
           this.submitted = true;
           this.teacherGradeDivisionMappingService.teacherMappingDelete(this.academicYearId, gradeId, divisionId,event.teacherId ).subscribe(data => {
           let success = true;
           this.responseList;
           if (success) {
           this.teacherGradeDivisionMappingAddedSuccessNotification();
           this.rerender();
           } else {
            teacherMapping.teacherIds = this.teacherMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].teacherIds;
            var teacherIdsIntArray = teacherMapping.teacherIds.split(",").map(Number).sort();
            teacherIdsIntArray = teacherIdsIntArray.filter(x=>x != null && x !=  undefined && x != 0);
            teacherMapping.teacherList = teacherIdsIntArray;
          }
       })
      }
                  
    
    canItemAdd(teacherIds : string, teacherList: number[]){
      if(this.teacherList != undefined && this.teacherList != null){
        teacherList = this.teacherList;
      }
      var teacherIdsIntArray = teacherIds.split(",").sort();
      teacherIdsIntArray = teacherIdsIntArray.filter(x=>x != "");
      var teacherIdsString = teacherIdsIntArray.join(",");
      var teacherListString = teacherList.sort().join(",");
      if(teacherIdsString == teacherListString){
        return false;  
      }
      else{
        return true;
      }
    }

    UpdateTeacherDropdownSelectedList(teacherMapping:TeacherGradeDivisionMappingDto,event:TeacherDropDownDto){
      this.submitted = true;
      let teacherGradeDivisionMappingDto = new TeacherGradeDivisionMappingDto();
      teacherGradeDivisionMappingDto.academicYearId= this.academicYearId
      teacherGradeDivisionMappingDto.gradeId = teacherMapping.gradeId;
      teacherGradeDivisionMappingDto.divisionId =teacherMapping. divisionId;
      teacherGradeDivisionMappingDto.teacherList = teacherMapping.teacherList;
      this.teacherGradeDivisionMappingService.teacherGradeDivisionMappingInsert(teacherGradeDivisionMappingDto).subscribe(data => {
        this.teacherGradeDivisionMappingAddedSuccessNotification();
        this.rerender();
    
      });
    }
   
 
    teacherGradeDivisionMappingAddedSuccessNotification() {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('CLASS_TEACHER_MAPPING_SAVE_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }

  ngAfterViewInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
       this.academicYearId= academicYearId as number;
       this.studentAttendanceService.getAllTeacherForDropDown().subscribe(result => {
        this.teacherDropdownList = result.teacherDropdownList;
        this.dtTrigger.next(null);
      });
      
    });
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
 
      get f() { return this.teacherGradeDivisionMappingForm.controls; }
}

          


