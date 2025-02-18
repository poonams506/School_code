import { Division } from './../../../services/school-api-service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { forEach } from 'jszip';
import { Subject } from 'rxjs';
import { DatatableResponseModel, FeeParticularCloneDto, ISubjectMappingCloneDto, MasterServiceProxy, SubjectIndexNumberDetailsDto, SubjectMappingCloneDto, SubjectMappingDto, SubjectMappingServiceProxy, SubjectMasterDropdownDto, TeacherGradeDivisionMappingDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditSubjectMappingComponent } from '../add-edit-subject-mapping/add-edit-subject-mapping.component';
import { SubjectMappingCloneComponent } from '../subject-mapping-clone/subject-mapping-clone.component';

@Component({
  selector: 'app-subject-mapping',
  templateUrl: './subject-mapping.component.html',
  styleUrls: ['./subject-mapping.component.scss']
})
export class SubjectMappingComponent {
  submitted = false;
  subjectMappings:SubjectMappingDto[];
  subjectMappingsClone:SubjectMappingDto[];
  subjectDropdownList:SubjectMasterDropdownDto[];
  academicYearId:any;
  gradeId:any;
  divisionId:any;
  subjectList:number[];
  subjectMasterIds:[];
  responseList:any[];
  modalRef:any
  subjectMasterIndexList: any[]=[]
  gradeName:any;
  divisionName:any;
  subjectMappingId:any;
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  subjectMappingForm: FormGroup;
  constructor(
  public translate: TranslateService, 
  private modalService: NgbModal,
  private http: HttpClient,
  private userService:UserService,
  private router:Router,
  private masterService:MasterServiceProxy,
  private formBuilder: FormBuilder,
  private subjectMappingService: SubjectMappingServiceProxy,
  private toastEvokeService: ToastEvokeService,
  public sharedPermissionServiceService : SharedPermissionServiceService,

) {
}
ngOnInit(): void {
  this.subjectMappingForm = this.formBuilder.group({
    gradeId:[null],
    divisionId:[null], 
    subjectMasterIds:[[]]
  
  });
   
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
            environment.API_BASE_URL+"/api/SubjectMapping/GetSubjectMappingList",
            {getListModel:requestListModel,
              academicYearId:this.academicYearId
               },{}
          ).subscribe(resp => {
            that.subjectMappings = resp.data;
            that.subjectMappingsClone = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
      columns: [
                { data: 'className', searchable: true, orderable: true },
                { data: 'subjectName', searchable: false, orderable: false }
              ]
    };
    
  }
  getSubjectDropdownData() { 
    this.subjectMappingService.getSubjectMasterDropDown().subscribe(result => {
    this.subjectDropdownList = result.subjectDropdownList;
  });
 }


 isDisabled(item : any, gradeId : number, divisionId : number){
  var result = false;
  if(this.subjectMappingsClone && this.subjectMappingsClone.length > 0){
   let obj =  this.subjectMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId);
   if(obj && obj[0]){
    if(obj[0]["subjectList"] && obj[0]["subjectList"].length > 0){
        let array = obj[0]["subjectList"];
        if(array.filter(x=>x == item.subjectMasterId).length > 0){
          result = true;
        }
    }
   }
  }
  return result;
 }
 onDropDownAdd(subjectMapping:SubjectMappingDto,event:any, gradeId : number, divisionId : number){
  this.gradeId = gradeId;
  this.divisionId = divisionId;
  if(this.canItemAdd(this.subjectMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].subjectMasterIds,subjectMapping.subjectList)){
    this.UpdateSubjectMasterDropdownSelectedList(subjectMapping,event);
  }
 }
 onDropDownClose(subjectMapping:SubjectMappingDto,event:any, gradeId : number, divisionId : number)
  
 {
  this.gradeId = gradeId;
  this.divisionId = divisionId;
  if(this.subjectList == undefined || this.subjectList == null){
    subjectMapping.subjectMasterIds = this.subjectMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].subjectMasterIds;
    this.subjectList  = subjectMapping.subjectMasterIds.split(",").map(Number).sort();
    this.subjectList = this.subjectList.filter(x=>x != null && x !=  undefined && x != 0);
  } 

  this.submitted = true;
  this.subjectMappingService.subjectMappingDelete(this.academicYearId, gradeId, divisionId,event.subjectMasterId || event.value.subjectMasterId ).subscribe(data => {
    debugger;
    let success = true;
    this.responseList = data.subjectExistResposeList;
    this.responseList.forEach((item: any) => {
      if (item.existsInHomeWork === 1) {
      
        success = false;
      } else if (item.existsInClassTimeTable === 1) {
     
        success = false;
      }
    });
    if (success) {
      this.subjectMappingAddedSuccessNotification();
      this.rerender();
    } else {
      subjectMapping.subjectMasterIds = this.subjectMappingsClone.filter(x=>x.gradeId == gradeId && x.divisionId == divisionId)[0].subjectMasterIds;
      var subjectMasterIdsIntArray = subjectMapping.subjectMasterIds.split(",").map(Number).sort();
      subjectMasterIdsIntArray = subjectMasterIdsIntArray.filter(x=>x != null && x !=  undefined && x != 0);
      subjectMapping.subjectList = subjectMasterIdsIntArray;
      this.rerender();
      this.subjectMappingUnSuccessNotification(this.responseList);
    }
  });

} 

canItemAdd(subjectMasterIds : string, subjectList: number[]){
if(this.subjectList != undefined && this.subjectList != null){
  subjectList = this.subjectList;
}
var subjectMasterIdsIntArray = subjectMasterIds.split(",").sort();
subjectMasterIdsIntArray = subjectMasterIdsIntArray.filter(x=>x != "");
var subjectMasterIdsString = subjectMasterIdsIntArray.join(",");
var subjectListString = subjectList.sort().join(",");
if(subjectMasterIdsString == subjectListString){
  return false;  
}
else{
  return true;
}
}

UpdateSubjectMasterDropdownSelectedList(subjectMapping: SubjectMappingDto, event: any) {
  this.submitted = true;
  let subjectMappingDto = new SubjectMappingDto();
  subjectMappingDto.academicYearId = this.academicYearId;
  subjectMappingDto.gradeId = subjectMapping.gradeId;
  subjectMappingDto.divisionId = subjectMapping.divisionId;
  subjectMappingDto.subjectList = subjectMapping.subjectList;
  this.subjectMappingService.subjectMappingInsert(this.academicYearId, this.gradeId, this.divisionId, subjectMappingDto).subscribe(data => {
    let success = true;
    this.responseList = data.subjectExistResposeList;
    this.responseList.forEach((item: any) => {
      if (item.ExistsInHomeWork === 1) {
      
        success = false;
      } else if (item.ExistsInClassTimeTable === 1) {
     
        success = false;
      }
    });
    if (success) {
      this.subjectMappingAddedSuccessNotification();
      this.rerender();
    } else {
      this.subjectMappingUnSuccessNotification(this.responseList);
    }
  });
}

DeleteSubjectMasterDropdownSelectedList(subjectMapping: SubjectMappingDto, event: any) {
  
}


subjectMappingUnSuccessNotification(responseList:any[]) {
  debugger;
  const title = this.translate.instant('FAILED_TO_DELETE_!');
  const message1 = this.translate.instant('CLEAR_RECORD_ALL');
  const message2 = this.translate.instant('HOMEWORK_EXIT');
  const message3=  this.translate.instant('CLASS_TIMETABLE_EXIT');
  this.responseList.forEach((item: any) => {
  if(item.existsInHomeWork==1 && item.existsInClassTimeTable==1 ){
    this.toastEvokeService.danger(title,message1).subscribe();
  }
  else{
    if(item.existsInHomeWork==1)
    {
      this.toastEvokeService.danger(title,message2).subscribe();
    }
   else if (item.existsInClassTimeTable==1  ){
    this.toastEvokeService.danger(title,message3).subscribe();    }
  }}); 
}

 subjectMappingAddedSuccessNotification() {
   const newToastNotification = new ToastNotificationInitializer();
   newToastNotification.setTitle(this.translate.instant('SUCCESS'));
   newToastNotification.setMessage(this.translate.instant('SUBJECT_MAPPING_SAVE_SUCCESSFULLY'));
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
 
 this.dtTrigger.unsubscribe();
}

rerender(hardClear : boolean = false): void {
  this.dtElement.dtInstance.then((dtInstance: any) => {
    
    if(hardClear == true){
      dtInstance.state.clear();
    }
    
    dtInstance.destroy();
    
    this.dtTrigger.next(null);
  });
}

   get f() { return this.subjectMappingForm.controls; }

   
   editSubjectMapping(subjectMapping:any, event: any){
    debugger
    const modalRef = this.modalService.open(AddEditSubjectMappingComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.gradeId = subjectMapping.gradeId;
    modalRef.componentInstance.divisionId = subjectMapping.divisionId;
    modalRef.componentInstance.academicYearId = subjectMapping.academicYearId;
    modalRef.componentInstance.className = subjectMapping.className;
    modalRef.componentInstance.subjectList = subjectMapping.subjectList;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.subjectMappingSuccessNotification();
      }
      
    }, (reason) => {
        
    });
  }
  
  
  subjectMappingSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('INDEX_NUMBER_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  cloneSubjectMapping(item: any, event: any) {
    debugger;
  
    
    const modalRef = this.modalService.open(SubjectMappingCloneComponent, { size: 'md', backdrop: 'static' });
  
    
    const subjectMappingCloneDto: SubjectMappingCloneDto = new SubjectMappingCloneDto();
    subjectMappingCloneDto.academicYearId = item.academicYearId;
    subjectMappingCloneDto.fromClassId = item.classId;
    subjectMappingCloneDto.fromClassName = item.className;
    modalRef.componentInstance.academicYearId = item.academicYearId;
    modalRef.componentInstance.cloneSubjectMappingForm.patchValue(subjectMappingCloneDto);
    modalRef.componentInstance.modelRef = modalRef;
  
    
    modalRef.result.then(
      (result) => {
        if (result == true) {
          this.subjectMappingCloneSuccessNotification();
          this.rerender();
        }
      },
      () => {
        
      }
    );
  }
  
  subjectMappingCloneSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('SUCCESS');
    newToastNotification.setMessage(this.translate.instant('SUBJECT_MAPPING_CLONED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  
}  
