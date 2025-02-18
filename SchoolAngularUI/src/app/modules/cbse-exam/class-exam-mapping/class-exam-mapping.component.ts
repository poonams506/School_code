import { HttpClient } from '@angular/common/http';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CBSE_ClassExamMappingDto, CBSE_ExamObjectServiceProxy, DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SubjectMappingDto, SubjectMappingServiceProxy, SubjectMasterDropdownDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-class-exam-mapping',
  templateUrl: './class-exam-mapping.component.html',
  styleUrls: ['./class-exam-mapping.component.scss']
})
export class ClassExamMappingComponent {
  submitted = false;
  classExamMappings:CBSE_ClassExamMappingDto[];
  classExamMappingsClone:CBSE_ClassExamMappingDto[];
  examNameLists:any;
  academicYearId:any;
  classExamMappingId:any;
  gradeId:any;
  divisionId:any;
  schoolGradeDivisionMatrixId:any;
  examNameList:number[];
  classIds:any;
  schoolGradeDivisionMatrixCascadeList:any;
  examMasterId:any;
  classList:number[];
  classDropdownList:any;
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  responseList:any[];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  classExamMappingForm: FormGroup;

  constructor(
  public translate: TranslateService, 
  private modalService: NgbModal,
  private http: HttpClient,
  private userService:UserService,
  private router:Router,
  private masterService:MasterServiceProxy,
  private formBuilder: FormBuilder,
  private classMappingService: CBSE_ExamObjectServiceProxy,
  private toastEvokeService: ToastEvokeService,
) {
}
ngOnInit(): void {
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
            environment.API_BASE_URL+"/api/CBSE_ExamObject/CBSE_ClassExamMappingGridSelect",
            {getListModel:requestListModel,
              academicYearId:this.academicYearId
               },{}
          ).subscribe(resp => {
            that.classExamMappings = resp.data;
            that.classExamMappingsClone = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
      columns: [
                { data: 'examTypeName', searchable: true, orderable: true },
                { data: 'termName', searchable: true, orderable: true },
                { data: 'examName', searchable: true, orderable: true },
                { data: 'className', searchable: false, orderable: false }
              ]
    };
  }

getMasterDropdownData(){
  this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
    this.gradeDropdownList=gradeMaster.grades as Grade[];
    this.divisionDropdownList=gradeMaster.divisions as Division[];
    this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
    
 });
}

isDisabled(item : any, examMasterId : number){
  var result = false;
  if(this.classExamMappingsClone && this.classExamMappingsClone.length > 0){
   let obj =  this.classExamMappingsClone.filter(x=>x.examMasterId == examMasterId);
   if(obj && obj[0]){
    if(obj[0]["classList"] && obj[0]["classList"].length > 0){
        let array = obj[0]["classList"];
        if(array.filter(x=>x == item.schoolGradeDivisionMatrixId).length > 0){
          result = true;
        }
    }
   }
  }
  return result;
 }


 onDropDownAdd(classExamMapping:CBSE_ClassExamMappingDto,event:any, examMasterId : number){
  this.examMasterId = examMasterId;
  if(this.canItemAdd(this.classExamMappingsClone.filter(x=>x.examMasterId == examMasterId)[0].classIds,classExamMapping.classList)){
    this.UpdateClassExamMappingSelectedList(classExamMapping,event);
  }
 }

 onDropDownClose(classExamMapping:CBSE_ClassExamMappingDto,event:any, examMasterId : number)
 {
  this.examMasterId = examMasterId;
  if(this.classList == undefined || this.classList == null){
    classExamMapping.classIds = this.classExamMappingsClone.filter(x=>x.examMasterId == examMasterId)[0].classIds;
    this.classList  = classExamMapping.classIds.split(",").map(Number).sort();
    this.classList = this.classList.filter(x=>x != null && x !=  undefined && x != 0);
  } 
  
  this.submitted = true;
  this.classMappingService.cBSE_ClassExamMappingDelete(examMasterId, this.academicYearId,  event.gradeId || event.value.gradeId, event.divisionId || event.value.divisionId).subscribe(data => {
    let success = true;
    //this.responseList = data.subjectExistResposeList;
    // this.responseList.forEach((item: any) => {
    //   if (item.existsInHomeWork === 1) {
      
    //     success = false;
    //   } else if (item.existsInClassTimeTable === 1) {
     
    //     success = false;
    //   }
    // });
    if (success) {
      this.classExamMappingAddedSuccessNotification();
      this.rerender();
    } else {
      classExamMapping.classIds = this.classExamMappingsClone.filter(x=>x.examMasterId == examMasterId )[0].classIds;
      var classIdsIntArray = classExamMapping.classIds.split(",").map(Number).sort();
      classIdsIntArray = classIdsIntArray.filter(x=>x != null && x !=  undefined && x != 0);
      classExamMapping.classList = classIdsIntArray;
      this.rerender();
      //this.classExamMappingUnSuccessNotification(this.responseList);
    }
  });

} 

canItemAdd(classIds : string, classList: number[]){
if(this.classList != undefined && this.classList != null){
  classList = this.classList;
}
var classIdsIntArray = classIds.split(",").sort();
classIdsIntArray = classIdsIntArray.filter(x=>x != "");
var classIdsString = classIdsIntArray.join(",");
var classListString = classList.sort().join(",");
if(classIdsString == classListString){
  return false;  
}
else{
  return true;
}
}

UpdateClassExamMappingSelectedList(classExamMapping:CBSE_ClassExamMappingDto, event: SchoolGradeDivisionMatrixDto) {
  this.submitted = true;
  let cBSE_ClassExamMappingDto = new CBSE_ClassExamMappingDto();
  cBSE_ClassExamMappingDto.academicYearId = this.academicYearId;
  cBSE_ClassExamMappingDto.examMasterId = classExamMapping.examMasterId;
  cBSE_ClassExamMappingDto.classList = classExamMapping.classList;
  this.classMappingService.cBSE_ClassExamMappingUpsert( this.academicYearId, this.examMasterId, classExamMapping).subscribe(data => {
    let success = true;
    // this.responseList = data.subjectExistResposeList;
    // this.responseList.forEach((item: any) => {
    //   if (item.ExistsInHomeWork === 1) {
      
    //     success = false;
    //   } else if (item.ExistsInClassTimeTable === 1) {
     
    //     success = false;
    //   }
    // });
    if (success) {
      this.classExamMappingAddedSuccessNotification();
      this.rerender();
    } else {
      // this.classExamMappingUnSuccessNotification(this.responseList);
    }
  });
}

DeleteSubjectMasterDropdownSelectedList(subjectMapping: SubjectMappingDto, event: any) {
  
}


// classExamMappingUnSuccessNotification(responseList:any[]) {
//   debugger;
//   const title = this.translate.instant('FAILED_TO_DELETE_!');
//   const message1 = this.translate.instant('CLEAR_RECORD_ALL');
//   const message2 = this.translate.instant('HOMEWORK_EXIT');
//   const message3=  this.translate.instant('CLASS_TIMETABLE_EXIT');
//   this.responseList.forEach((item: any) => {
//   if(item.existsInHomeWork==1 && item.existsInClassTimeTable==1 ){
//     this.toastEvokeService.danger(title,message1).subscribe();
//   }
//   else{
//     if(item.existsInHomeWork==1)
//     {
//       this.toastEvokeService.danger(title,message2).subscribe();
//     }
//    else if (item.existsInClassTimeTable==1  ){
//     this.toastEvokeService.danger(title,message3).subscribe();    }
//   }}); 
// }

 classExamMappingAddedSuccessNotification() {
   const newToastNotification = new ToastNotificationInitializer();
   newToastNotification.setTitle(this.translate.instant('SUCCESS'));
   newToastNotification.setMessage(this.translate.instant('CLASS_EXAM_MAPPING_SAVE_SUCCESSFULLY'));
   newToastNotification.openToastNotification$();
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

   get f() { return this.classExamMappingForm.controls; }

   selectAllClass: boolean = false;

   selectAllOptionClass(classExamMapping: any) {
     if (this.selectAllClass) {
       const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
       classExamMapping.classList = selected;
     } else {
       classExamMapping.classList = []; 
     }
   }
   
   checkSelectAllClass(classExamMapping: any) {
     const selectedClassList = classExamMapping.classList || [];
     if (selectedClassList.length === this.divisionGradeMapping.length) {
       this.selectAllClass = true;
     } else {
       this.selectAllClass = false;
     }
     
   }

   
}