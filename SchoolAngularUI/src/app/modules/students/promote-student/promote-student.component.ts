import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base-component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service';
import { HttpClient } from '@angular/common/http';
import {
  DatatableResponseModel,
  Division,
  Grade,
  GradeDivisionMasterDto,
  IPromoteGridDto,
  MasterServiceProxy,
  PromoteGridDto,
  PromoteGridRequestDto,
  PromoteGridResponseDto,
  PromoteServiceProxy,
  SchoolGradeDivisionMatrixDto,
} from 'src/app/services/school-api-service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddPromoteStudentComponent } from '../add-promote-student/add-promote-student.component';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'mystudentfilter',
  pure: false,
})
export class MyStudentFilterPipe implements PipeTransform {
  transform(items: any[], statusId: number): any {
    return items.filter((item) => item.statusId == statusId);
  }
}
@Component({
  selector: 'app-promote-student',
  templateUrl: './promote-student.component.html',
  styleUrls: ['./promote-student.component.scss'],
})
export class PromoteStudentComponent implements OnInit {
  promoteStudent: PromoteGridDto[];
  gradeDropdownList: Grade[] = [];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  divisionDropdownList: Division[] = [];
  divisionFilteredDropdownList: Division[];
  promoteForm: FormGroup;
  promoteSubmitted = false;
  academicYearId: number;
  gradeId: any;
  divisionId: any;
  classId: any;
  promoteInterface: IPromoteGridDto;

  isStudentSelectAll: boolean = false;
  isPassSelectAll: boolean = false;
  isFailedSelectAll: boolean = false;

  constructor(
    private modalService: NgbModal,
    public sharedPermissionServiceService: SharedPermissionServiceService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private httpClient: HttpClient,
    private masterService: MasterServiceProxy,
    private http: HttpClient,
    private promoteService: PromoteServiceProxy,public translate: TranslateService
  ) {

    this.promoteForm = this.formBuilder.group({
      classId: [null],
    });
  }

  ngOnInit(): void {
  
  }

  fetchPromoteStudent() {
    let PromoteGridRequestDto = {
      academicYearId: this.academicYearId,
      gradeId: this.gradeId,
      divisionId: this.divisionId,
    } as PromoteGridRequestDto;
    this.promoteService
      .getPromoteList(PromoteGridRequestDto)
      .subscribe((response: PromoteGridResponseDto) => {
        if (response && response.promoteList) {
          this.promoteStudent = response.promoteList;
        }
      });
  }

  getMasterDropdownData() {
    this.masterService
      .getGradeDivisionMasterList(this.academicYearId)
      .subscribe((gradeMaster: GradeDivisionMasterDto) => {
        this.gradeDropdownList = gradeMaster.grades as Grade[];
        this.divisionDropdownList = gradeMaster.divisions as Division[];
        this.divisionGradeMapping =
          gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
      });
  }

  get f() {
    return this.promoteForm.controls;
  }

 

  PromoteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(
      this.translate.instant('Student promoted successfully')
    );
    newToastNotification.openToastNotification$();
  }

  rerender(): void {
    this.fetchPromoteStudent();
  }

  onReset() {
    this.promoteSubmitted = false;
    this.promoteForm.reset();
    this.gradeId = null;
    this.divisionId = null;
    this.promoteStudent = [];
    this.rerender();
  }

  searchPromote() {
    this.promoteSubmitted = true;

    if (this.promoteForm.invalid) {
      return;
    }
    const selectedClassId = this.promoteForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);

    const selectedClassMapping = this.divisionGradeMapping.find(
      (mapping) => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId
    );

    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
    this.fetchPromoteStudent();
    this.rerender();
  }

  ngAfterViewInit(): void {
    this.userService
      .getAcademicYear()
      .subscribe((academicYearId: number | undefined) => {
        this.academicYearId = academicYearId as number;
        this.getMasterDropdownData();
      });
  }

  ngOnDestroy(): void {
   
  }

  toggleStudentSelectAll() {
    this.promoteStudent.forEach((x) => {
      if (x.statusId == 0) {
        if (this.isStudentSelectAll) {
          x.isChecked = true;
        } else {
          x.isChecked = false;
        }
      }
    });
  }
  togglePassSelectAll() {
    this.promoteStudent.forEach((x) => {
      if (x.statusId == 1) {
        if (this.isPassSelectAll) {
          x.isChecked = true;
        } else {
          x.isChecked = false;
        }
      }
    });
  }
  toggleFailedSelectAll() {
    this.promoteStudent.forEach((x) => {
    if (x.statusId == 2) {
      if (this.isFailedSelectAll) {
        x.isChecked = true;
      } else {
        x.isChecked = false;
      }
    }
  });}

  isAllStudentSelected() {
    if (
      this.promoteStudent.filter((x) => x.statusId == 0).length ==
      this.promoteStudent.filter((x) => x.statusId == 0 && x.isChecked == true)
        .length
    ) {
      this.isStudentSelectAll = true;
    } else {
      this.isStudentSelectAll = false;
    }
  }
  isAllPassSelected() {
    if (
      this.promoteStudent.filter((x) => x.statusId == 1).length ==
      this.promoteStudent.filter((x) => x.statusId == 1 && x.isChecked == true)
        .length
    ) {
      this.isPassSelectAll = true;
    } else {
      this.isPassSelectAll = false;
    }
  }
  isAllFailedSelected() {
    if (
      this.promoteStudent.filter((x) => x.statusId == 2).length ==
      this.promoteStudent.filter((x) => x.statusId == 2 && x.isChecked == true)
        .length
    ) {
      this.isFailedSelectAll = true;
    } else {
      this.isFailedSelectAll = false;
    }
  }

  passEvent(){
    var valid = true;
    if(this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 0).length <= 0){
      const newToastNotification = new ToastNotificationInitializer();
          newToastNotification.setTitle(this.translate.instant('WARNING'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('Please select student'));
          newToastNotification.openToastNotification$();
          valid = false;
    }
    if(valid){
      const newConfirmBox = new ConfirmBoxInitializer();
      newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
      newConfirmBox.setMessage(
        this.translate.instant("Do you want to pass selected students?")
      );
      newConfirmBox.setConfig({
        confirmLabel: this.translate.instant('YES'), // default confirmation button label
        declineLabel: this.translate.instant('NO'),
      });
      // Simply open the popup and observe button click
      newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
       if(resp?.success){
        this.promoteService.studentPassOrFailUpdate(this.academicYearId, 'Pass', this.promoteStudent.filter(x=>x.statusId == 0 && x.isChecked == true)).
        subscribe((result:boolean)=>{
          const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('SUCCESS'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
          });
            newToastNotification.setMessage(this.translate.instant('Student marked as pass'));
            newToastNotification.openToastNotification$();
          this.rerender();
        });
       }
      });
    }
    
  }
  failEvent(){
    var valid = true;
    if(this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 0).length <= 0){
      const newToastNotification = new ToastNotificationInitializer();
          newToastNotification.setTitle(this.translate.instant('WARNING'));
          newToastNotification.setConfig({
            toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
        });
          newToastNotification.setMessage(this.translate.instant('Please select student'));
          newToastNotification.openToastNotification$();
          valid = false;
    }
    if(valid){
      const newConfirmBox = new ConfirmBoxInitializer();
      newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
      newConfirmBox.setMessage(
        this.translate.instant("Do you want to fail selected students?")
      );
      newConfirmBox.setConfig({
        confirmLabel: this.translate.instant('YES'), // default confirmation button label
        declineLabel: this.translate.instant('NO'),
      });
      // Simply open the popup and observe button click
      newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
       if(resp?.success){
        this.promoteService.studentPassOrFailUpdate(this.academicYearId, 'Fail', this.promoteStudent.filter(x=>x.statusId == 0 && x.isChecked == true)).
        subscribe((result:boolean)=>{
          const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('SUCCESS'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
          });
            newToastNotification.setMessage(this.translate.instant('Student marked as fail'));
            newToastNotification.openToastNotification$();
          this.rerender();
        });
       }
      });
    }
  }
  promoteEvent(isPass : boolean){
    if(isPass == true){
      var valid = true;
      if(this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 1).length <= 0){
        const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('WARNING'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
          });
            newToastNotification.setMessage(this.translate.instant('Please select student from pass list'));
            newToastNotification.openToastNotification$();
            valid = false;
      }
      if(valid){
        const newConfirmBox = new ConfirmBoxInitializer();
        newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
        newConfirmBox.setMessage(
          this.translate.instant("Do you want to promote selected passed students to next academic year with upper grade & division?")
        );
        newConfirmBox.setConfig({
          confirmLabel: this.translate.instant('YES'), // default confirmation button label
          declineLabel: this.translate.instant('NO'),
        });
        // Simply open the popup and observe button click
        newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
         if(resp?.success){
          const modalRef = this.modalService.open(AddPromoteStudentComponent, {
            size: 'lg',
            backdrop: 'static',
          });
          modalRef.componentInstance.academicYearId = this.academicYearId;
          modalRef.componentInstance.isPass = isPass;
          modalRef.componentInstance.promoteStudent = this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 1);
          modalRef.componentInstance.divisionGradeMapping = this.divisionGradeMapping.filter(x=> x.gradeId != this.gradeId);
          modalRef.componentInstance.modelRef = modalRef;
          modalRef.result.then(
            (result) => {
              if (result == true) {
                this.rerender();
               // this.PromoteSuccessNotification();
              }
            },
            (reason) => {}
          );
         }
        });
      }
    }
    else if(isPass == false)
    {
      var valid = true;
      if(this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 2).length <= 0){
        const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('WARNING'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
          });
            newToastNotification.setMessage(this.translate.instant('Please select student from failed list'));
            newToastNotification.openToastNotification$();
            valid = false;
      }
      if(valid){
        const newConfirmBox = new ConfirmBoxInitializer();
        newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
        newConfirmBox.setMessage(
          this.translate.instant("Do you want to move selected failed students to next academic year but in same grade?")
        );
        newConfirmBox.setConfig({
          confirmLabel: this.translate.instant('YES'), // default confirmation button label
          declineLabel: this.translate.instant('NO'),
        });
        // Simply open the popup and observe button click
        newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
         if(resp?.success){
          const modalRef = this.modalService.open(AddPromoteStudentComponent, {
            size: 'lg',
            backdrop: 'static',
          });
          modalRef.componentInstance.academicYearId = this.academicYearId;
          modalRef.componentInstance.isPass = isPass;
          modalRef.componentInstance.promoteStudent = this.promoteStudent.filter(x=>x.isChecked == true && x.statusId == 2);
          modalRef.componentInstance.divisionGradeMapping = this.divisionGradeMapping.filter(x=>x.gradeId == this.gradeId);
          modalRef.componentInstance.modelRef = modalRef;
          modalRef.result.then(
            (result) => {
              if (result == true) {
                this.rerender();
               // this.PromoteSuccessNotification();
              }
            },
            (reason) => {}
          );
         }
        });
      }
    }
  }
  isPassDivActive(){
    if(this.promoteStudent.filter(x=>x.statusId == 2 && x.isChecked == true).length == 0)
    return true;
    else
    return false;
  }
  isFailDivActive(){
    if(this.promoteStudent.filter(x=>x.statusId == 1 && x.isChecked == true).length == 0)
    return true;
    else
    return false;
  }
  getPromotedClass(promotedGradeId: number, promotedDivisionId:number){
    const selectedClassMapping = this.divisionGradeMapping.find(
      (mapping) => mapping.gradeId === promotedGradeId && mapping.divisionId == promotedDivisionId
    );

    if (selectedClassMapping) {
      return selectedClassMapping.className;
    }
    return "";
  }
}
