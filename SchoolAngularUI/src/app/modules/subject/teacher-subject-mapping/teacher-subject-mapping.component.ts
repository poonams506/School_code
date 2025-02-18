import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { forEach } from 'jszip';
import { Subject } from 'rxjs';
import { DatatableResponseModel, MasterServiceProxy, SubjectMappingServiceProxy, SubjectMasterDropdownDto, TeacherSubjectMappingDto, TeacherSubjectMappingServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-subject-mapping',
  templateUrl: './teacher-subject-mapping.component.html',
  styleUrls: ['./teacher-subject-mapping.component.scss']
})
export class TeacherSubjectMappingComponent {
  submitted = false;
  subjectDropdownList:SubjectMasterDropdownDto[];
  academicYearId:any;
  teacherSubjectMappings:TeacherSubjectMappingDto[];
  teacherSubjectMappingsClone:TeacherSubjectMappingDto[];
  lecturePerWeek:any;
  teacherSubjectList:number[];
  subjectMasterIds:[];
  responseList:any[];
  teacherId:any;
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
    private TeacherSubjectMappingService: TeacherSubjectMappingServiceProxy,
    private subjectMappingService: SubjectMappingServiceProxy,
    private toastEvokeService: ToastEvokeService,
  ) {
  }
  ngOnInit(): void {
    
     //this.getSubjectDropdownData();
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
              environment.API_BASE_URL+"/api/TeacherSubjectMapping/GetTeacherSubjectMappingList",
              {getListModel:requestListModel,
                academicYearId:this.academicYearId
                 },{}
            ).subscribe(resp => {
              that.teacherSubjectMappings = resp.data;
              that.teacherSubjectMappingsClone = resp.data;
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: []
                });
              });
          },order: [[ 0, "asc" ]],
        columns: [
                  { data: 'fullName', searchable: true, orderable: true },
                  { data: 'lecturePerWeek', searchable: false, orderable: false },
                  { data: 'subjectName', searchable: false, orderable: false }
                ]
      };
      
    }
    getSubjectDropdownData() { 
      this.subjectMappingService.getSubjectMasterDropDown().subscribe(result => {
      this.subjectDropdownList = result.subjectDropdownList;
    });
   }

   isDisabled(item : any, teacherId : number){
    var result = false;
    if(this.teacherSubjectMappingsClone && this.teacherSubjectMappingsClone.length > 0){
     let obj =  this.teacherSubjectMappingsClone.filter(x=>x.teacherId == teacherId);
     if(obj && obj[0]){
      if(obj[0]["teacherSubjectList"] && obj[0]["teacherSubjectList"].length > 0){
          let array = obj[0]["teacherSubjectList"];
          if(array.filter(x=>x == item.subjectMasterId).length > 0){
            result = true;
          }
      }
     }
    }
    return result;
   }

   onDropDownAdd(teacherSubjectMapping:TeacherSubjectMappingDto,event:any,teacherId : number,){
    debugger;
    this.teacherId = teacherId;
    if(this.canItemAdd(this.teacherSubjectMappingsClone.filter(x=>x.teacherId == teacherId )[0].subjectMasterIds,teacherSubjectMapping.teacherSubjectList)){
      this.UpdateTeacherSubjectDropdownSelectedList(teacherSubjectMapping,event);
    }
   }

   onInputChange(teacherId : number, selectedSubjectList : any, lecturePerWeek:any) 
   {  
     this.submitted = true;
     let teacherSubjectMappingDto = new TeacherSubjectMappingDto();
     teacherSubjectMappingDto.academicYearId= this.academicYearId
     teacherSubjectMappingDto.teacherId = teacherId;
     teacherSubjectMappingDto.lecturePerWeek = lecturePerWeek == '' ? null : lecturePerWeek; 
     teacherSubjectMappingDto.teacherSubjectList = selectedSubjectList;
     
     this.TeacherSubjectMappingService.teacherSubjectMappingInsert(this.academicYearId, this.teacherId, teacherSubjectMappingDto).subscribe(data => {
       this.lecturePerWeekAddedSuccessNotification();
     });
  
     
 }
   
   onDropDownClose(teacherSubjectMapping:TeacherSubjectMappingDto,event:any,teacherId : number) 
   
   {
    debugger;
    this.teacherId = teacherId;
      if(this.teacherSubjectList == undefined || this.teacherSubjectList == null){
        teacherSubjectMapping.subjectMasterIds = this.teacherSubjectMappingsClone.filter(x=>x.teacherId == teacherId)[0].subjectMasterIds;
        this.teacherSubjectList  = teacherSubjectMapping.subjectMasterIds.split(",").map(Number).sort();
        this.teacherSubjectList = this.teacherSubjectList.filter(x=>x != null && x !=  undefined && x != 0);
      } 
    
  this.submitted = true;
  this.TeacherSubjectMappingService.teacherSubjectMappingDelete(this.academicYearId, teacherId, event.subjectMasterId || event.value.subjectMasterId).subscribe(data => {
    let success = true;
    debugger;
    this.responseList = data.teacherSubjectExistResposeList;
    this.responseList.forEach((item: any) => {
    if (item.existsInClassTimeTable === 1) {
        success = false;
      }
    });
       if(success)
       {
        this.teacherSubjectMappingAddedSuccessNotification();
        this.rerender();
       }
       else
       {
        teacherSubjectMapping.subjectMasterIds = this.teacherSubjectMappingsClone.filter(x=>x.teacherId == teacherId)[0].subjectMasterIds;
        var subjectMasterIdsIntArray = teacherSubjectMapping.subjectMasterIds.split(",").map(Number).sort();
        subjectMasterIdsIntArray = subjectMasterIdsIntArray.filter(x=>x != null && x !=  undefined && x != 0);
        teacherSubjectMapping.teacherSubjectList = subjectMasterIdsIntArray;
        this.rerender();
        this.teacherSubjectMappingUnSuccessNotification(this.responseList);
      }
      });
    
}
  
  canItemAdd(subjectMasterIds : string, teacherSubjectList: number[]){
    debugger;
  if(this.teacherSubjectList != undefined && this.teacherSubjectList != null){
    teacherSubjectList = this.teacherSubjectList;
  }
  var subjectMasterIdsIntArray = subjectMasterIds.split(",").sort();
  subjectMasterIdsIntArray = subjectMasterIdsIntArray.filter(x=>x != "");
  var subjectMasterIdsString = subjectMasterIdsIntArray.join(",");
  var teacherSubjectListString = teacherSubjectList.sort().join(",");
  if(subjectMasterIdsString == teacherSubjectListString){
    return false;  
  }
  else{
    return true;
  }
  }
  
   
 UpdateTeacherSubjectDropdownSelectedList(teacherSubjectMapping:TeacherSubjectMappingDto,event:any){
  {  
     this.submitted = true;
     let teacherSubjectMappingDto = new TeacherSubjectMappingDto();
     teacherSubjectMappingDto.academicYearId= this.academicYearId
     teacherSubjectMappingDto.teacherId =teacherSubjectMapping. teacherId;
     teacherSubjectMappingDto.lecturePerWeek = teacherSubjectMapping.lecturePerWeek;
     teacherSubjectMappingDto.teacherSubjectList = teacherSubjectMapping.teacherSubjectList;
     
     this.TeacherSubjectMappingService.teacherSubjectMappingInsert(this.academicYearId, this.teacherId, teacherSubjectMappingDto).subscribe(data => {
       let success = true;
       this.responseList = data.teacherSubjectExistResposeList;
       this.responseList.forEach((item: any) => {
          if (item.ExistsInClassTimeTable === 1) {
           success = false;
         }
        });
      
       if (success) {
        this.teacherSubjectMappingAddedSuccessNotification();
        this.rerender();
      }
       else {
        this.teacherSubjectMappingUnSuccessNotification(this.responseList);
      }
    });
  }
}

  DeleteTeacherSubjectMasterDropdownSelectedList(teacherSubjectMapping:TeacherSubjectMappingDto, event:any) {
  
  }

  teacherSubjectMappingUnSuccessNotification(responseList:any[]) {
    debugger;
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message1=  this.translate.instant('CLASS_TIMETABLE_EXIT_2');
    this.responseList.forEach((item: any) => {
      if (item.existsInClassTimeTable==1  ){
      this.toastEvokeService.danger(title,message1).subscribe();    }
    })
  }


 teacherSubjectMappingAddedSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('SUBJECT_SAVED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
lecturePerWeekAddedSuccessNotification () {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('LACTURES_SAVED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
ngAfterViewInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
     this.academicYearId= academicYearId as number;
     this.subjectMappingService.getSubjectMasterDropDown().subscribe(result => {
      this.subjectDropdownList = result.subjectDropdownList;
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
   
}
