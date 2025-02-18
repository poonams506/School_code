import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbCalendar, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableResponseModel, IWeeklyDayOffDto, SchoolHolidayServiceProxy, SchoolVacationDto, SchoolVacationServiceProxy, WeeklyDayOffDto, WeeklyDayOffListDto, WeeklyDayOffServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditSchoolHolidayComponent } from '../add-edit-school-holiday/add-edit-school-holiday.component';
import * as CryptoJS from 'crypto-js/';  
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddEditSchoolVacationComponent } from '../add-edit-school-vacation/add-edit-school-vacation.component';


@Component({
  selector: 'app-school-holiday',
  templateUrl: './school-holiday.component.html',
  styleUrls: ['./school-holiday.component.scss']
})
export class SchoolHolidayComponent implements OnInit {
  academicYearId:number;
  schoolHolidayId:number;
  schoolHolidayList:any[];
  schoolVacationList:SchoolVacationDto[];
  weeklyDayOffForm:FormGroup;
  dayPartYAxis: any[] = [];
  WeeklyDayOffDto:any[];
  submitted = false;
  modelRef:NgbModalRef;
  schoolVacationId:any

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions1: any = {};
  dtOptions2: any = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  constructor( private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private http: HttpClient,
    private router:Router,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private weeklyDayOffService:WeeklyDayOffServiceProxy,
    private schoolHolidayService:SchoolHolidayServiceProxy,
    private schoolVacationService:SchoolVacationServiceProxy,
    private calendar: NgbCalendar,
    public sharedPermissionServiceService : SharedPermissionServiceService) {
    }

  ngOnInit(): void {
    this.weeklyDayOffForm = this.formBuilder.group({
      multipleDayList: this.formBuilder.array([]),
      Sunday: [false],
      Monday: [false],
      Tuesday: [false],
      Wednesday: [false],
      Thursday: [false],
      Friday: [false],
      Saturday: [false]
    });
    this.dayPartYAxis = [
      { id: 1, value: 'Sunday' },
      { id: 2, value: 'Monday' },
      { id: 3, value: 'Tuesday' },
      { id: 4, value: 'Wednesday' },
      { id: 5, value: 'Thursday' },
      { id: 6, value: 'Friday' },
      { id: 7, value: 'Saturday' },
    ];
    const that = this;
      this.dtOptions2 = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
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
              environment.API_BASE_URL+"/api/SchoolHoliday/GetHolidayDetails",
              {getListModel:requestListModel,academicYearId:this.academicYearId},{}
            ).subscribe(resp => {
              that.schoolHolidayList = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
        columns: [
                  { data: 'calendarDate', searchable: true, orderable: true },
                  { data: 'holidayReason', searchable: true, orderable: true },
                  { data: 'dayNo', searchable: true, orderable: true },
                  {data:null,searchable:false,orderable:false }]
      }; 
      
      this.dtOptions1 = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
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
              environment.API_BASE_URL+"/api/SchoolVacation/SchoolVacationDetails",
              {getListModel:requestListModel,academicYearId:this.academicYearId,
              schoolVacationId:this.schoolVacationId},{}
            ).subscribe(resp => {
              that.schoolVacationList = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 1, "asc" ]],
        columns: [
                  { data: 'vacationName', searchable: true, orderable: true },
                  { data: 'startDate', searchable: true, orderable: true },
                  { data: 'endDate', searchable: true, orderable: true },
                  {data:null,searchable:false,orderable:false }]
      };  
    }

    formatDate(date: any): string {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };
      if (date) {
        return new Date(date).toLocaleDateString('en-GB'); 
      } else {
        return ''; 
      }
    }
    
    getSchoolHolidayDayNo(academicYearId:number) {
      this.weeklyDayOffService.weeklyDayOffSelect(academicYearId).subscribe((dayMaster: WeeklyDayOffDto) => {
            dayMaster.multipleDayList!.forEach(day => {
              let selectedDay =  this.dayPartYAxis.find(d => d.id === day.dayNo);
              this.weeklyDayOffForm.controls[selectedDay.value].setValue(true);
            });
      });  
    }
    
    schoolHolidayDeleteSuccessNotification() {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }

    confirmSchoolHolidayDelete(schoolHolidayId: number) {
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
      newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
        if (resp?.success) {
          this.schoolHolidayService.schoolHolidayDelete(schoolHolidayId).subscribe(data => {
            this.schoolHolidayDeleteSuccessNotification();
            // Reload DataTable data after deletion
            this.rerender();
          });
        }
      });
    }

    rerender(hardClear: boolean = false): void {
      debugger;
      this.dtElements.forEach((dtElement:DataTableDirective)=>{
        dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.ajax.reload();
        });
      });
      
    }

    addSchoolHoliday() {
      const modalRef = this.modalService.open(AddEditSchoolHolidayComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.academicYearId = this.academicYearId;
      modalRef.componentInstance.modelRef = modalRef;
      modalRef.result.then((result) => {
        if (result === true) {
          this.schoolHolidaySuccessNotification(); 
          this.rerender(); 

        }
      }, (reason) => {
      });
    }
    
    schoolHolidaySuccessNotification() {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('SCHOOL_HOLIDAY_CREATED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }
    
    saveWeeklyyDayOffData(){
      this.submitted = true;
      if (this.weeklyDayOffForm.invalid) {
          return;
      }
      let temp=this.weeklyDayOffForm.getRawValue() as any;
      let weeklyDayOffDto = {} as IWeeklyDayOffDto;
      weeklyDayOffDto.multipleDayList = [];
      this.dayPartYAxis!.forEach(day => {
       if(temp[day.value] === true){
        weeklyDayOffDto.multipleDayList?.push({dayNo: day.id} as WeeklyDayOffListDto);
       }
      });
      weeklyDayOffDto.academicYearId = this.academicYearId;
      weeklyDayOffDto.weeklyOffId = 0;
      this.weeklyDayOffService.weeklyDayOffInsert(weeklyDayOffDto as WeeklyDayOffDto).subscribe(result=>{
          this.weeklyDayOffNotification();
          this.rerender();
        })
    }

    weeklyDayOffNotification(){
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('WEEKLY_DAY_OFF_UPDATED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }

    addSchoolVacation(){
      const modalRef = this.modalService.open(AddEditSchoolVacationComponent, { size: 'lg',backdrop:'static' });
      modalRef.componentInstance.academicYearId=this.academicYearId;
      modalRef.componentInstance.schoolVacationId =0;
      modalRef.componentInstance.modelRef=modalRef;
      modalRef.result.then((result) => {
        if(result==true)
        {
          this.schoolVacationAddedSuccessNotification();
          this.rerender();

        }
    
      },(reason) =>{
  
      });
    }

    editSchoolVacation(schoolVacationId: number) {
      debugger;
      const modalRef = this.modalService.open(AddEditSchoolVacationComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.academicYearId = this.academicYearId;
      modalRef.componentInstance.schoolVacationId = schoolVacationId;
      modalRef.componentInstance.modelRef = modalRef;
      modalRef.result.then((result) => {
        if (result === true) {
          this.schoolVacationSuccessNotification();
          this.rerender();
        }
      }, (reason) => {
  
      });
    }

    schoolVacationSuccessNotification(){
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('SCHOOL_VACATION_UPDATED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }
    schoolVacationAddedSuccessNotification(){
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('SCHOOL_VACATION_ADDED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }

    schoolVacationDeleteSuccessNotification() {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }


    confirmSchoolVactionDelete(schoolVacationId:number) {
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
        this.schoolVacationService.schoolVacationDelete(schoolVacationId).subscribe(data=>{
              this.schoolVacationDeleteSuccessNotification();
              this.rerender();
            }); 
       }
      });
    }

    ngAfterViewInit(): void {
      this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.getSchoolHolidayDayNo(this.academicYearId);
        this.dtTrigger1.next(null);
        this.dtTrigger2.next(null);

      });
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger1.unsubscribe();
      this.dtTrigger2.unsubscribe();

    }
}
