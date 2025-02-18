import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,

} from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassTeacherDataDto, ClassTeacherDataServiceProxy, ClassTeacherListDto, Division, Grade, GradeDivisionMasterDto, GradeDivisionMatrixDto, IStudentAttendanceRequestDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, Search, StudentAttendanceGridDto, StudentAttendanceRequestDto, StudentAttendanceServiceProxy, StudentAttendanceUpsertDto, StudentAttendanceUpsertListDto, TeacherDropDownDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { DateInput } from 'luxon';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { forEach } from 'jszip';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],

})
export class AttendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  saveAttendanceForm: FormGroup;
  submitted = false;
  saveStudentsubmitted = false;
  academicYearId: number;
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  teacherDropdownList: TeacherDropDownDto[] = [];
  studentAttendanceGridData: StudentAttendanceGridDto[] = [];
  attendanceDate: any;
  userId: number;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  gradeId: any;
  divisionId: any;
  isAttendanceTaken: boolean = false;
  IsSchoolHoliday:boolean = false;
  errorMessage:string;
  isAccess: boolean = true;
  roleId: number;

  
  dtTrigger: Subject<any> = new Subject();

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastEvokeService: ToastEvokeService,
    private studentAttendanceService: StudentAttendanceServiceProxy,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    public classTeacherDataService : ClassTeacherDataServiceProxy
  ) { }

  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group({
      academicYearId: [0],
      // gradeId: ['', Validators.required],
      // divisionId: ['', Validators.required],  
      classId: [null, Validators.required],
      ngbAttendanceDate: [{
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      } as NgbDateStruct, Validators.required],
    });
    this.saveAttendanceForm = this.formBuilder.group({
      teacherId: [undefined],
      attendance: new FormArray([])
    });

    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getMasterDropdownData();
      this.attendanceForm.get('academicYearId')?.setValue(this.academicYearId);
    });

    this.userService.getUser().subscribe((response) => {
      this.userId = response?.userId as number;
    });

    
    
    this.attendanceForm.get('gradeId')?.valueChanges.subscribe((gradeId: string) => {
      this.divisionFilteredDropdownList = [];
      let divisionList = this.divisionGradeMapping.filter(x => x.gradeId === parseInt(gradeId)).map(x => x.divisionId);
      if (divisionList && divisionList.length > 0) {
        this.divisionFilteredDropdownList = this.divisionDropdownList
          .filter(division => divisionList.includes(division.divisionId));
      }
      this.attendanceForm.get('divisionId')?.setValue(null);
    });
    
  }

  get attendances() {
    let formArray = this.saveAttendanceForm.get('attendance') as FormArray;
    return formArray.controls;
  }
  get attendanceFormArray() {
    return this.saveAttendanceForm.get('attendance') as FormArray;
  }

  // getTeacherDropdownData() {
  //   this.studentAttendanceService.getAllTeacherForDropDown().subscribe(result => {
  //     this.teacherDropdownList = result.teacherDropdownList;
  //   });
  // }

  checkAccess() {
    debugger
    this.roleId = this.userService.getUserRoleId()!;
    if (this.roleId > 2) {
      this.classTeacherDataService.getClassTeacherData(this.academicYearId, this.userId)
        .subscribe((classTeacherData: ClassTeacherDataDto) => {
          var access = classTeacherData.getGradeDivisionList!.filter(x=>x.divisionId == this.divisionId &&
            x.gradeId == this.gradeId);
            if(access != null && access.length > 0){
              this.isAccess = true;
            }
            else{
              this.isAccess = false;
            }
        });
    }
  }

  getMasterDropdownData() {
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster: GradeDivisionMasterDto) => {
      this.gradeDropdownList = gradeMaster.grades as Grade[];
      this.divisionDropdownList = gradeMaster.divisions as Division[];
      this.divisionGradeMapping = gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.attendanceForm.controls; }

  get f1() { return this.saveAttendanceForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.attendanceForm.invalid) {
      return;
    }
    const selectedClassId = this.attendanceForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);

    // Find the corresponding SchoolGradeDivisionMatrixDto for the selected classId
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);

    if (selectedClassMapping) {
      // Extract gradeId and divisionId from the selected class mapping
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
    this.checkAccess();
    let studentAttendanceRequestDto =
      ({
        gradeId: this.gradeId, divisionId: this.divisionId,
        academicYearId: this.academicYearId,
        ngbAttendanceDate: this.attendanceForm.get('ngbAttendanceDate')?.getRawValue() as SchoolNgbDateModel
      } as IStudentAttendanceRequestDto
      ) as StudentAttendanceRequestDto;

    this.studentAttendanceService.getStudentAttendanceList(studentAttendanceRequestDto).subscribe(result => {
      if(result.isSchoolHoliday==1){
       this.errorMessage="SELECTED_DAY_IS_HOLIDAY";
        }
      if (result.studentAttendancesList != undefined) {
        if (result.studentAttendancesList.find(e => e.statusId != undefined && e.statusId > 0)) {
          this.isAttendanceTaken = true;

        }
        else {
          this.isAttendanceTaken = false;
        }
        this.studentAttendanceGridData = result.studentAttendancesList;
        this.patchAttendanceFormArrayValues(this.studentAttendanceGridData);
      }
    });
  }
  patchAttendanceFormArrayValues(values: StudentAttendanceGridDto[]) {
    // Clear the existing controls in the FormArray
    while (this.attendanceFormArray.length !== 0) {
      this.attendanceFormArray.removeAt(0);
    }
    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        studentId: [value.studentId],
        rollNumber: [value.rollNumber],
        fullName: [value.fullName],
        isHalfDay: [value.statusId == 2 ? true : false],
        isFullDay: [value.statusId == 1 ? true : false],
        reason: [value.reason]
      });
      this.attendanceFormArray.push(itemFormGroup);
    });
  }
  onSaveAttendanceDetail() {
    this.saveStudentsubmitted = true;
    // stop here if form is invalid
    if (this.saveAttendanceForm.invalid) {
      return;
    }
    
    this.roleId = this.userService.getUserRoleId()!;
    if (this.roleId > 2) {
      this.classTeacherDataService.getClassTeacherData(this.academicYearId, this.userId)
        .subscribe((classTeacherData: ClassTeacherDataDto) => {
          var access = classTeacherData.getGradeDivisionList!.filter(x=>x.divisionId == this.divisionId &&
            x.gradeId == this.gradeId);
            if(access != null && access.length > 0){
              
              this.saveAttendance();
            }
            else{
              this.isAccess = false;
              const title = this.translate.instant('ACCESS');
              const message = this.translate.instant('YOU_ARE_NOT_AUTHORIZE_TO_SAVE_THE_ATTENDANCE');
              this.toastEvokeService.danger(  title,message ).subscribe();
            }
        });
    }
    else{
      this.saveAttendance();
    }
  }

  saveAttendance(){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_SAVE_THIS_ATTENDANCE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        let studentAttendanceUpsertDto = new StudentAttendanceUpsertDto();
        studentAttendanceUpsertDto.academicYearId = this.academicYearId;
        studentAttendanceUpsertDto.gradeId = this.gradeId;
        studentAttendanceUpsertDto.divisionId = this.divisionId;
        studentAttendanceUpsertDto.userId = this.userId;
        studentAttendanceUpsertDto.ngbAttendanceDate = new SchoolNgbDateModel(this.attendanceForm.get('ngbAttendanceDate')?.value);
        let attendanceList = this.saveAttendanceForm.get('attendance')?.getRawValue();
        studentAttendanceUpsertDto.studentAttendanceUpsertLists = [];
        for (let index = 0; index < attendanceList.length; index++) {
          let studentAttendanceUpsertListDto = new StudentAttendanceUpsertListDto();
          studentAttendanceUpsertListDto.studentId = attendanceList[index].studentId;
          studentAttendanceUpsertListDto.reason = attendanceList[index].reason;
          if (attendanceList[index].isHalfDay && attendanceList[index].isFullDay) {
            const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('DANGER'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
            });
            newToastNotification.setMessage(this.translate.instant('You Can\'t Save Full Day and Half Day for ' + attendanceList[index].fullName));
            newToastNotification.openToastNotification$();
            return;
          }

          if (attendanceList[index].isFullDay) {
            studentAttendanceUpsertListDto.statusId = 1;
          }

          if (attendanceList[index].isHalfDay) {
            studentAttendanceUpsertListDto.statusId = 2;
          }

          if (!attendanceList[index].isHalfDay && !attendanceList[index].isFullDay) {
            studentAttendanceUpsertListDto.statusId = 3;
          }
          studentAttendanceUpsertDto.studentAttendanceUpsertLists.push(studentAttendanceUpsertListDto);
        }
        this.studentAttendanceService.getStudentAttendanceUpsert(studentAttendanceUpsertDto).subscribe(response => {
          //console.log(response);
          this.attendanceSaveSuccessNotification();
        });
      }
    });
  }

  onSelectAllCheckbox(e: any) {
    for (let i = 0; i < this.attendances.length; i++) {
      this.attendances[i].get('isFullDay')?.setValue(e.target.checked);
    }
  }
  onReset() {
    this.submitted = false;
    this.attendanceForm.reset();
    this.saveAttendanceForm.reset();
    while (this.attendanceFormArray.length !== 0) {
      this.attendanceFormArray.removeAt(0);
    }
    this.isAttendanceTaken = false;
    //   this.gradeId=null;
    // this.divisionId=null;
    // this.attendanceForm.reset();
    // this.saveAttendanceForm();
  }

  AttendanceSaveUnSuccessNotification() {
    this.toastEvokeService.danger('FAILED_TO_DELETE_!', 'You Cannot Delete Parent').subscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(hardClear: boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // hard clear table first
      if (hardClear == true) {
        dtInstance.state.clear();
      }
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  attendanceSaveSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('ATTEANDANCE_SAVED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  resetSelectList(f: any, item: string) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }
}
