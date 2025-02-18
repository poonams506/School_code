import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ClassTimeTableColumnDetailDto, ClassTimeTableDto, ClassTimeTableRowDetailDto, ClassTimeTableServiceProxy, Division, Grade, GradeDivisionMasterDto, IClassTimeTableColumnDetailDto, IClassTimeTableDto, IClassTimeTableRowDetailDto, ICommonDropdownSelectListItemDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SubjectMasterServiceProxy, TeacherDropdownSelectListDto, TimetableSubjectDropdownDto, TimetableSubjectDropdownRequestDto } from 'src/app/services/school-api-service';
import { NgbAccordion, NgbModal, NgbPanelChangeEvent, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service';
import { IClassTimeTableUrlParameter, IExistingSubjectTeacher, ItemtableProducer } from './ITimetableProducer.interface';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
import { ClassTimeTableErrorModalComponent } from '../class-time-table-error-modal/class-time-table-error-modal.component';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  addTimeTableForm: FormGroup;
  allTimeTableForm: FormGroup;
  periodTypeDropdownData: ICommonDropdownSelectListItemDto[] = [];
  dayPartYAxis: ICommonDropdownSelectListItemDto[] = [];
  commonDayPartYAxis: ICommonDropdownSelectListItemDto[] = [];
  timePartXAxis: ClassTimeTableRowDetailDto[] = [];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  submitted: boolean = false;
  classList: SchoolGradeDivisionMatrixDto[] = [];
  activePanel: string[] = [];
  academicYearId: number;
  @ViewChild('acc', { static: true }) accordionElement: NgbAccordion;
  subjectDropdown: TimetableSubjectDropdownDto[] = [];
  teacherDropdownData: TeacherDropdownSelectListDto[] = [];
  timetableSubmitted: boolean = false;
  classTimeTableUrlDetail: IClassTimeTableUrlParameter
  teacherSubjectMapping: IExistingSubjectTeacher[] = [];
  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private masterService: MasterServiceProxy,
    private subjectMasterService: SubjectMasterServiceProxy,
    private userService: UserService,
    private timeTableService: ClassTimeTableServiceProxy,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private el: ElementRef,
    private toastEvokeService: ToastEvokeService,
    public sharedPermissionServiceService: SharedPermissionServiceService
  ) {
    this.addTimeTableForm = this.formBuilder.group({
      ngbStartTime: [null, Validators.required],
      classId: [[], Validators.required],
      timeTableProducerArray: this.formBuilder.array([]),
      Sunday: [false],
      Monday: [false],
      Tuesday: [false],
      Wednesday: [false],
      Thursday: [false],
      Friday: [false],
      Saturday: [false],
    });

    this.allTimeTableForm = this.formBuilder.group({
      gradeDivisionTableArray: this.formBuilder.array([])
    });

  }

  ngOnInit(): void {

    this.periodTypeDropdownData =
      [
        { id: 1, value: 'Period' }, { id: 2, value: 'Recess' },
      ];

    this.commonDayPartYAxis = [
      { id: 1, value: 'Sunday' }, { id: 2, value: 'Monday' }, { id: 3, value: 'Tuesday' },
      { id: 4, value: 'Wednesday' }, { id: 5, value: 'Thursday' }, { id: 6, value: 'Friday' },
      { id: 7, value: 'Saturday' },
    ];
    this.dayPartYAxis = this.commonDayPartYAxis;


    this.addTimetableProducer('');
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getMasterDropdownData();

    });

  }

  className: string;
  getClassTimeTableDetail() {

    this.timeTableService.getClassTimeTable(this.classTimeTableUrlDetail.classId).subscribe(result => {
      this.className = result.className;
      let requestDto = { lstClass: [this.classTimeTableUrlDetail.classId], academicYearId: this.academicYearId } as TimetableSubjectDropdownRequestDto;
      this.subjectMasterService.getAllSubjectsByClassList(requestDto).subscribe(subjectResult => {
        this.subjectDropdown = subjectResult.subjects;
        let existingDay = [... new Set(result.classTimeTable.flatMap(x =>
          x.lstClassTimeTableRow.flatMap(x => x.lstClassTimeTableColumn.map(x => x.day))))];
        let existingDayPart: ICommonDropdownSelectListItemDto[] = [];
        existingDay.forEach(element => {
          existingDayPart.push(...this.commonDayPartYAxis.filter(x => x.id == element));
        });
        this.dayPartYAxis = existingDayPart;
        if (result.classTimeTable.length > 0) {
          this.patchGradeDivisionFormArrayValues(this.allTimeTableForm, result.classTimeTable);
          this.activePanel.push(result.classTimeTable[0].classId.toString());
          setTimeout(() => {
            this.openPanel(result.classTimeTable[0].classTimeTableId.toString());

          }, 500);
        }

      });


    });
  }

  getPanelId(classDto: any) {
    return this.classTimeTableUrlDetail?.classId > 0 ? classDto.get('classTimeTableId')?.value.toString() : classDto.get('classId')?.value.toString();
  }

  getPanelLabel(classDto: any) {
    return this.classTimeTableUrlDetail?.classId ?? 0 > 0 ? classDto.get('classTimeTableName')?.value.toString() : classDto.get('className')?.value.toString();
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

    this.masterService.getTeacherDropdownData(this.academicYearId).subscribe(result => {
      this.teacherDropdownData = result.lstDropdownValues;
      this.route.params.subscribe((data: any) => {
        const queryParamValue = data.timeTableRouteParameter;
        if (queryParamValue) {
          let decryptedString = CryptoJS.AES.decrypt(queryParamValue, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
          this.classTimeTableUrlDetail = JSON.parse(decryptedString) as IClassTimeTableUrlParameter;
          this.getClassTimeTableDetail();
        }

      });
    });

  }
  patchTimeTableProducerFormArrayValues(values: ItemtableProducer[]) {

    // Clear the existing controls in the FormArray
    while (this.timeTableProducerArray.length !== 0) {
      this.timeTableProducerArray.removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({

        SelectedPeriodType: [value.SelectedPeriodType, Validators.required],
        NoOfExistence: [value.NoOfExistence, Validators.required],
        TimeTaken: [value.TimeTaken, Validators.required],

      });
      this.timeTableProducerArray.push(itemFormGroup);
    });
  }

  get timeTableProducers() {
    let formArray = this.addTimeTableForm.get('timeTableProducerArray') as FormArray;
    return formArray.controls;
  }

  get timeTableProducerArray() {
    return this.addTimeTableForm.get('timeTableProducerArray') as FormArray;
  }


  get f() { return this.addTimeTableForm.controls; }

  addTimetableProducer(currentSelectedType: string) {
    let nextSelectedType = currentSelectedType == '1' ? '2' : '1';
    let nextNoOfExistence = '';
    if (nextSelectedType == '2') {
      nextNoOfExistence = '1'
    }
    const newFormGroup = this.formBuilder.group({
      SelectedPeriodType: [nextSelectedType, Validators.required],
      NoOfExistence: [nextNoOfExistence, Validators.required],
      TimeTaken: [null, Validators.required]
    });

    this.timeTableProducerArray.push(newFormGroup);
  }

  removeTimetableProducer(index: number) {
    this.timeTableProducerArray.removeAt(index);
  }

  getDifferenceArray(addBy: number, hour: number, minute: number, maxSize: number, periodTypeId: number): ClassTimeTableRowDetailDto[] {
    const timeParts: ClassTimeTableRowDetailDto[] = [];
    for (let i = 0; i < maxSize; i++) {
      let currentPeriodTime: ClassTimeTableRowDetailDto = { startingHour: hour, endingHour: 0, startingMinute: minute, endingMinute: 0, periodTypeId: periodTypeId } as ClassTimeTableRowDetailDto;
      minute += addBy;
      if (minute > 59) {
        do {
          hour += 1;
          minute -= 60;
        } while (minute - 60 > 0);

      }
      if (hour >= 24) {
        hour -= 24;
      }
      currentPeriodTime.endingHour = hour,
        currentPeriodTime.endingMinute = minute;
      timeParts.push(currentPeriodTime);
    }
    return timeParts;
  }

  getDayPartYAxisArray() {
    this.dayPartYAxis = [];
    if (this.addTimeTableForm.get('Sunday')?.value == true) {
      this.dayPartYAxis.push({ id: 1, value: 'Sunday' });
    }
    if (this.addTimeTableForm.get('Monday')?.value == true) {
      this.dayPartYAxis.push({ id: 2, value: 'Monday' });
    }

    if (this.addTimeTableForm.get('Tuesday')?.value == true) {
      this.dayPartYAxis.push({ id: 3, value: 'Tuesday' });
    }

    if (this.addTimeTableForm.get('Wednesday')?.value == true) {
      this.dayPartYAxis.push({ id: 4, value: 'Wednesday' });
    }

    if (this.addTimeTableForm.get('Thursday')?.value == true) {
      this.dayPartYAxis.push({ id: 5, value: 'Thursday' });
    }

    if (this.addTimeTableForm.get('Friday')?.value == true) {
      this.dayPartYAxis.push({ id: 6, value: 'Friday' });
    }

    if (this.addTimeTableForm.get('Saturday')?.value == true) {
      this.dayPartYAxis.push({ id: 7, value: 'Saturday' });
    }
  }


  getSubjectList(classId: number) {
    return this.subjectDropdown.filter(x => x.classId == classId);
  }

  subjectNotExistErrorNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_TO_GENERATE_TIMETABLE');
    const message = this.translate.instant('ADD_SUBJECT_FOR_SELECTED_CLASSES');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();

  }

  createDynamicTimeTable() {

    this.submitted = true;
    if (this.addTimeTableForm.invalid) {
      return;
    }
    let selectedClassList = this.addTimeTableForm.get('classId')?.getRawValue() as number[];
    let requestDto = { lstClass: selectedClassList, academicYearId: this.academicYearId } as TimetableSubjectDropdownRequestDto;
    this.subjectMasterService.getAllSubjectsByClassList(requestDto).subscribe(result => {
      let classesWithNoSubjects = selectedClassList.filter(classId => !result.subjects.some(subject => subject.classId === classId));

      if (classesWithNoSubjects.length > 0) {
        this.subjectNotExistErrorNotification();
      }
      else {
        this.subjectDropdown = result.subjects;
        this.activePanel = [];
        this.classList = [];
        this.getDayPartYAxisArray();
        this.timePartXAxis = [];

        let ngbTimeDetail = this.addTimeTableForm.get('ngbStartTime')?.getRawValue() as NgbTimeStruct;
        let timeTableConfig = this.addTimeTableForm.get('timeTableProducerArray')?.getRawValue() as ItemtableProducer[];
        let startingHour = ngbTimeDetail.hour;
        let startingMinute = ngbTimeDetail.minute;

        timeTableConfig.forEach(config => {
          let diffArray = this.getDifferenceArray(config.TimeTaken, startingHour, startingMinute, config.NoOfExistence, config.SelectedPeriodType);
          startingHour = diffArray[diffArray.length - 1].endingHour;
          startingMinute = diffArray[diffArray.length - 1].endingMinute;
          this.timePartXAxis.push(...diffArray);
        });


        selectedClassList.forEach(x => {
          this.classList.push(...this.divisionGradeMapping.filter(y => y.schoolGradeDivisionMatrixId == x));
        });

        let lstGradeDivisionTimeTable: ClassTimeTableDto[] = [];
        this.classList.forEach(c => {
          lstGradeDivisionTimeTable.push(({
            className: c.className, classTimeTableId: 0,
            classId: c.schoolGradeDivisionMatrixId!, academicYearId: this.academicYearId,
            userId: 0, classTimeTableName: '', lstClassTimeTableRow: [], isSkipTimeTableValidation: false,
            isActive: false
          } as IClassTimeTableDto) as ClassTimeTableDto);
        });

        lstGradeDivisionTimeTable.forEach(grade => {
          this.timePartXAxis.forEach(timePart => {
            let row: ClassTimeTableRowDetailDto = ({ classTimeTableId: 0, startingHour: 0, startingMinute: 0, endingHour: 0, endingMinute: 0, periodTypeId: timePart.periodTypeId, lstClassTimeTableColumn: [], sequenceId: 0 } as IClassTimeTableRowDetailDto) as ClassTimeTableRowDetailDto;
            row.startingHour = timePart.startingHour;
            row.startingMinute = timePart.startingMinute;
            row.endingHour = timePart.endingHour;
            row.endingMinute = timePart.endingMinute;
            this.dayPartYAxis.forEach(dayPart => {
              row.lstClassTimeTableColumn.push(({ day: dayPart.id, dayName: dayPart.value, subjectId: undefined, teacherId: undefined, sequenceId: 0 } as IClassTimeTableColumnDetailDto) as ClassTimeTableColumnDetailDto)
            });
            grade.lstClassTimeTableRow.push(row);
          });

        });

        this.patchGradeDivisionFormArrayValues(this.allTimeTableForm, lstGradeDivisionTimeTable);
        this.activePanel.push(lstGradeDivisionTimeTable[0].classId.toString());
        setTimeout(() => {
          this.openPanel(lstGradeDivisionTimeTable[0].classId.toString());
        }, 500);

      }
    });


  }

  openPanel(panelId: string) {
    this.accordionElement.toggle(panelId);
  }

  onReset() {
    this.submitted = false;
    this.addTimeTableForm.reset();
  }

  getFormattedMinute(hour: number, minute: number) {
    return moment({ "hour": hour, "minutes": minute }).format('hh:mm A');
  }

  changePanelCalled(event: NgbPanelChangeEvent) {
    this.activePanel = [];
    if (event.nextState) {
      this.activePanel.push(event.panelId);
    }
  }


  get gradeDivisionTable() {
    let formArray = this.allTimeTableForm.get('gradeDivisionTableArray') as FormArray;
    return formArray.controls;
  }

  get gradeDivisionTableArray() {
    return this.allTimeTableForm.get('gradeDivisionTableArray') as FormArray;
  }

  patchGradeDivisionFormArrayValues(form: any, values: ClassTimeTableDto[]) {

    // Clear the existing controls in the FormArray
    while (this.gradeDivisionTableArray.length !== 0) {
      this.gradeDivisionTableArray.removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        classTimeTableId: [value.classTimeTableId],
        classId: [value.classId],
        className: [value.className],
        classTimeTableName: [value.classTimeTableName, Validators.required],
        academicYearId: [value.academicYearId],
        lstClassTimeTableRow: this.formBuilder.array([]),
        isActive: [value.isActive]
      });
      this.patchTimeTableFormArrayValues(itemFormGroup, value.lstClassTimeTableRow);
      this.gradeDivisionTableArray.push(itemFormGroup);
    });
  }

  timeTableRow(form: any) {
    let formArray = form.get('lstClassTimeTableRow') as FormArray;
    return formArray.controls;
  }

  timeTableRowArray(form: any) {
    return form.get('lstClassTimeTableRow') as FormArray;
  }

  patchTimeTableFormArrayValues(form: FormGroup, values: ClassTimeTableRowDetailDto[]) {

    // Clear the existing controls in the FormArray
    while (this.timeTableRowArray(form).length !== 0) {
      this.timeTableRowArray(form).removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        periodTypeId: [value.periodTypeId],
        startingHour: [value.startingHour],
        startingMinute: [value.startingMinute],
        endingHour: [value.endingHour],
        endingMinute: [value.endingMinute],
        sequenceId: [value.sequenceId],
        lstClassTimeTableColumn: this.formBuilder.array([]),
      });
      if (value.periodTypeId == 1) {
        this.patchSubjectColumnForPeriodFormArrayValues(itemFormGroup, value.lstClassTimeTableColumn);
      }
      else {
        this.patchSubjectColumnForRecessFormArrayValues(itemFormGroup, value.lstClassTimeTableColumn);
      }

      this.timeTableRowArray(form).push(itemFormGroup);
    });
  }


  timeTableColumn(form: any) {
    let formArray = form.get('lstClassTimeTableColumn') as FormArray;
    return formArray.controls;
  }

  timeTableColumnArray(form: any) {
    return form.get('lstClassTimeTableColumn') as FormArray;
  }

  patchSubjectColumnForPeriodFormArrayValues(form: FormGroup, values: ClassTimeTableColumnDetailDto[]) {

    // Clear the existing controls in the FormArray
    while (this.timeTableColumnArray(form).length !== 0) {
      this.timeTableColumnArray(form).removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({

        day: [value.day],
        dayName: [value.dayName],
        subjectId: [value.subjectId, Validators.required],
        teacherId: [value.teacherId, Validators.required],
        sequenceId: [value.sequenceId],
      });
      this.timeTableColumnArray(form).push(itemFormGroup);
    });
  }

  patchSubjectColumnForRecessFormArrayValues(form: FormGroup, values: ClassTimeTableColumnDetailDto[]) {

    // Clear the existing controls in the FormArray
    while (this.timeTableColumnArray(form).length !== 0) {
      this.timeTableColumnArray(form).removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({

        day: [value.day],
        dayName: [value.dayName],
        subjectId: [value.subjectId],
        teacherId: [value.teacherId],
        sequenceId: [value.sequenceId],
      });
      this.timeTableColumnArray(form).push(itemFormGroup);
    });
  }

  ngAfterViewInit(): void {


  }

  resetSelectList(f: any) {
    if (f.value == null || f.value == "null") {
      f.setValue(null!);
    }

    if (f.value == '2') {
      f.parent.get('NoOfExistence').setValue('1');
    } else {
      f.parent.get('NoOfExistence').setValue('');
    }
  }

  onTimeTableReset(form: any) {
    this.timetableSubmitted = false;
    form.reset();
  }
  focusToInvalidControl(formName: any) {
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  saveTimeTable(form: any) {

    this.timetableSubmitted = true;
    this.focusToInvalidControl(form);
    if (form.invalid) {
      return;
    }

    let classTimeTable = form.getRawValue() as ClassTimeTableDto;
    classTimeTable.academicYearId = this.academicYearId;
    this.timeTableService.classTimeTableUpsert(classTimeTable).subscribe(result => {
      if (result.isSuccess) {
        if (!classTimeTable.classTimeTableId) { // Check if it's a new timetable addition
          this.timeTableAddedSuccessNotification();
          this.router.navigate(['timetable/manage-timetable']);
        }
        else {
          this.timeTableUpdateSuccessNotification();
        }
      } else {
        const modalRef = this.modalService.open(ClassTimeTableErrorModalComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.errors = result.lstOverlapPeriod;
        modalRef.componentInstance.modelRef = modalRef;
        modalRef.result.then((result: any) => {
          if (result == true) {
            classTimeTable.isSkipTimeTableValidation = true;
            this.timeTableService.classTimeTableUpsert(classTimeTable).subscribe(conflictedResult => {
              if (conflictedResult.isSuccess) {
                this.timeTableUpdateSuccessNotification();
                this.router.navigate(['timetable/manage-timetable']);
              }
            });
          }

        }, () => {

        });
      }

    });
  }

  timeTableUpdateSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('TIME_TABLE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  timeTableAddedSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('TIME_TABLE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  updateTeacherForSubject(subjectFormControl: any, teacherFormControl: any, classId: number) {
    teacherFormControl.setValue(null);
    if (subjectFormControl.value == null || subjectFormControl.value == "null") {
      subjectFormControl.setValue(null!);
    }
    else {

      if (!(teacherFormControl.value == null || teacherFormControl.value == "null")) {
        let existingSubjectTeacher = this.teacherSubjectMapping.filter(x => x.classId == classId &&
          x.subjectId == parseInt(subjectFormControl.value));

        if (existingSubjectTeacher.length == 0) {
          this.teacherSubjectMapping.push({
            classId: classId,
            subjectId: parseInt(subjectFormControl.value),
            teacherId: parseInt(teacherFormControl.value)
          });
        }
      }
      else {
        let existingSubjectTeacher = this.teacherSubjectMapping.filter(x => x.classId == classId &&
          x.subjectId == parseInt(subjectFormControl.value));
        if (existingSubjectTeacher.length > 0) {
          teacherFormControl.setValue(existingSubjectTeacher[0].teacherId!);
        }
      }
    }
  }

  updateTeacherForAll(teacherFormControl: any, subjectFormControl: any, formArray: any, classId: number) {

    if (teacherFormControl.value == null || teacherFormControl.value == "null") {
      teacherFormControl.setValue(null!);
    }
    else {
      if (!(subjectFormControl.value == null || subjectFormControl.value == "null")) {
        let existingSubjectTeacher = this.teacherSubjectMapping.filter(x => x.classId == classId &&
          x.subjectId == parseInt(subjectFormControl.value));

        if (existingSubjectTeacher.length == 0) {
          this.teacherSubjectMapping.push({
            classId: classId,
            subjectId: parseInt(subjectFormControl.value),
            teacherId: parseInt(teacherFormControl.value)
          });
        }
      }

      let endRowIndex = formArray.controls.length;
      for (let i = 0; i < endRowIndex; i++) {
        let endColumnIndex = this.timeTableColumnArray(formArray.controls[i]).controls.length;
        for (let j = 0; j < endColumnIndex; j++)
          if ((this.timeTableColumnArray(formArray.controls[i])?.controls[j]?.get('teacherId')?.value == null
            || this.timeTableColumnArray(formArray.controls[i])?.controls[j]?.get('teacherId')?.value == "null")
            &&
            !(subjectFormControl.value == null || subjectFormControl.value == "null")
            &&
            (this.timeTableColumnArray(formArray.controls[i])?.controls[j]?.get('subjectId')?.value == subjectFormControl.value
              || this.timeTableColumnArray(formArray.controls[i])?.controls[j]?.get('subjectId')?.value == subjectFormControl.value)
          ) {
            this.timeTableColumnArray(formArray.controls[i])?.controls[j]?.get('teacherId')?.setValue(teacherFormControl.value)
          }
      }
    }
  }
  // start : code for select all
  selectAll: boolean = false;
  selectAllOption() {
    if (this.selectAll) {
      const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
      this.addTimeTableForm.get('classId')?.patchValue(selected);
    }
    else {
      this.addTimeTableForm.get('classId')?.patchValue([]);
    }
  }

  checkSelectAll() {
    let selectedClassList = this.addTimeTableForm.get('classId')?.getRawValue() as number[];
    if (selectedClassList.length == this.divisionGradeMapping.length) {
      this.selectAll = true;
    }
    else {
      this.selectAll = false;
    }
  }
  // end : code for select all


  classTimeTableDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  classTimeTableDeleteErrorNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setConfig({
      toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
    });
    newToastNotification.setTitle(this.translate.instant('ERROR'));
    newToastNotification.setMessage(this.translate.instant('YOU_CANNOT_DELETE_ACTIVE_RECORD'));
    newToastNotification.openToastNotification$();
  }
  confirmClassTimeTableDelete(classTimeTableId: number, isActive: boolean) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_TIMETABLE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        this.timeTableService.classTimeTableDelete(classTimeTableId).subscribe(data => {

          if (isActive) {
            this.classTimeTableDeleteErrorNotification();
          } else {
            this.classTimeTableDeleteSuccessNotification();
            this.router.navigate(['timetable'])
          }

        });
      }

    });
  }


  getAllTeachersForSubject(subjectMasterId: number): TeacherDropdownSelectListDto[] {
    return this.teacherDropdownData.filter(x => x.subjectMasterId == subjectMasterId);
  }

  getDayPartYAxis(grade: any): ICommonDropdownSelectListItemDto[] {
    if (this.classTimeTableUrlDetail && this.classTimeTableUrlDetail.classId > 0) {
      let dayPartYAxis: ICommonDropdownSelectListItemDto[] = [];
      let formArray = grade.get('lstClassTimeTableRow') as FormArray;
      (formArray?.controls[0].get('lstClassTimeTableColumn') as FormArray)?.controls.forEach(element => {
        dayPartYAxis.push({
          id: (element.get('day')?.value as number),
          value: this.commonDayPartYAxis.filter(x => x.id == (element.get('day')?.value as number))[0].value
        })
      });

      return dayPartYAxis;
    } else {
      return this.dayPartYAxis;
    }
  }

}
