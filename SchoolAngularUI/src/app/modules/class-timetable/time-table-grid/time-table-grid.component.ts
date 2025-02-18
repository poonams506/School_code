import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastEvokeService, ToastNotificationInitializer, ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {  ClassTimeTableServiceProxy, DatatableResponseModel, IMarkTimeTableActiveRequestModel, IMarkTimeTableActiveSelectModel, MarkTimeTableActiveRequestModel, MarkTimeTableActiveSelectModel } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { ClassTimeTableErrorModalComponent } from '../class-time-table-error-modal/class-time-table-error-modal.component';

@Component({
  selector: 'app-time-table-grid',
  templateUrl: './time-table-grid.component.html',
  styleUrls: ['./time-table-grid.component.scss']
})
export class TimeTableGridComponent {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  classTimeTables: any[];
  dtTrigger: Subject<any> = new Subject();
  academicYearId:number;

  constructor( private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private timeTableService:ClassTimeTableServiceProxy,
    private http: HttpClient,
    private router:Router,
    private userService:UserService,
    public sharedPermissionServiceService : SharedPermissionServiceService) {
  }

 ngOnInit(): void {
   
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
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/ClassTimeTable/GetClassTimeTableList",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            that.classTimeTables = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                
                { data: 'className', searchable: true, orderable: true },
                { data: null, searchable: false, orderable: false },
                {data:null,searchable:false,orderable:false }]
    };  
  
  }
  
  

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.rerender();
  });
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
   

  }
  
  rerender(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      });
    }
  }

  addClassTimeTable(){
    this.router.navigate(['timetable/add-timetable']);
  }
  
  editClassTimeTable(classTimeTable:any){
  let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
    {
      classId:classTimeTable.classId,
  }), environment.ENCRYPTION_PASSWORD).toString();

this.router.navigate(['timetable/add-timetable',encryptedString]);
}

markActiveTimeTableSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('ACTIVE_MARKED_TIMETABLE'));
    newToastNotification.openToastNotification$();
    this.rerender();
}
markInActiveTimeTableSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('INACTIVE_MARKED_TIMETABLE'));
    newToastNotification.openToastNotification$();
    this.rerender();
}



// start : code for select all Class

selectAllOptionTimeTable(timeTable:any) {
  if(timeTable.selectAllClass){
    timeTable.lstActiveTimeTable = timeTable.timeTableIsActiveSelectList.map((item:any) => item.classTimeTableId);
    
  }
  else{
    timeTable.lstActiveTimeTable=[];
  }
}

checkSelectAllTimeTable(timeTable:any){
  let selectedClassList= timeTable.lstActiveTimeTable as number[];
  if(selectedClassList.length == timeTable.timeTableIsActiveSelectList.length){
    timeTable.selectAllClass = true;
  }
  else{
    timeTable.selectAllClass = false;
  }
}
// end : code for select all
 arraysAreEqual(array1: any[], array2: any[]): boolean {
  if (array1.length !== array2.length) {
      return false;
  }

  return array1.every(element => array2.includes(element));
}

markIsActiveTimeTable(timeTable:any,event:any,isAllClear:boolean ){
  if(isAllClear || event){
    this.confirmmarkIsActiveTimeTable(timeTable,event,isAllClear);
  }else{
    this.UpdatemarkIsActiveTimeTable(timeTable,event);

  }
  this.rerender();
}


UpdatemarkIsActiveTimeTable(timeTable:any,event:any){
if(this.arraysAreEqual(timeTable.timeTableIsActiveSelectList
  .filter((x:any)=>x.isActive)
  .map((x:any)=>x.classTimeTableId),timeTable.lstActiveTimeTable))
 {
  return;
}
this.timeTableService.validateTimeTable(this.academicYearId,timeTable.lstActiveTimeTable).subscribe(result=>{
  let lstActiveTimeTableId= timeTable.lstActiveTimeTable as number[];
  let requestDto = {lstActiveTimeTableId:[]} as IMarkTimeTableActiveRequestModel;
  timeTable.timeTableIsActiveSelectList.forEach((element:any) => {
     let isActiveModel= {classTimeTableId:element.classTimeTableId,
                  isActive:lstActiveTimeTableId.filter(x=>x==element.classTimeTableId).length>0
    } as IMarkTimeTableActiveSelectModel;
    requestDto.lstActiveTimeTableId.push(new MarkTimeTableActiveSelectModel(isActiveModel))
  });
  if(result.isSuccess){
    this.timeTableService.markTimeTableActiveUpsert(new MarkTimeTableActiveRequestModel(requestDto)).subscribe(result=>{
      if (event) {
        this.markInActiveTimeTableSuccessNotification();
      } else {
        this.markActiveTimeTableSuccessNotification();
      }
      
  });
  }
  else
  {
    const modalRef = this.modalService.open(ClassTimeTableErrorModalComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.errors= result.lstOverlapPeriod;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result:any) => {
      if(result==true)
      {
        this.timeTableService.markTimeTableActiveUpsert(new MarkTimeTableActiveRequestModel(requestDto)).subscribe(result=>{
          this.markActiveTimeTableSuccessNotification();
          
      });
      }
  
    }, () => {
  
    });
  }

  

 
});

 
}
confirmmarkIsActiveTimeTable(timeTable:any,event:any,isAllClear:boolean) {
  const newConfirmBox = new ConfirmBoxInitializer();
  newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
  newConfirmBox.setMessage(
    this.translate.instant('DO_YOU_WANT_TO_INACTIVE_THIS_TIME_TABLE')
  );
  newConfirmBox.setConfig({
    confirmLabel: this.translate.instant('YES'), // default confirmation button label
    declineLabel: this.translate.instant('NO'),
  });
  // Simply open the popup and observe button click
  newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
   if(resp?.success)
   {
    this.UpdatemarkIsActiveTimeTable(timeTable,event)
   }
   else
   {
    if(isAllClear){
     let existingArr:any[]= timeTable.lstActiveTimeTableId.split(",");
      let updatedList= existingArr.filter(x => x.length>0).map(x=> parseInt(x));
      timeTable.timeTableIsActiveSelectList=[];
      timeTable.timeTableIsActiveSelectList=updatedList;
    
    }
    else
    {
      if(timeTable.timeTableIsActiveSelectList?.length>0)
      {
        let updatedList=[...timeTable.timeTableIsActiveSelectList,event.lstActiveTimeTableId]
        timeTable.timeTableIsActiveSelectList=[];
        timeTable.timeTableIsActiveSelectList=updatedList;
      }
      else
      {
        timeTable.timeTableIsActiveSelectList=[];
        timeTable.timeTableIsActiveSelectList.push(event.lstActiveTimeTableId );
      }
    }
   }
  });
}


}
