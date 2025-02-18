import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CalendarDateRequestDto, SchoolHolidayDetailDto, SchoolHolidayResponseDto, SchoolHolidayServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-school-holiday',
  templateUrl: './add-edit-school-holiday.component.html',
  styleUrls: ['./add-edit-school-holiday.component.scss']
})
export class AddEditSchoolHolidayComponent implements OnInit {
  addSchoolHolidayForm: FormGroup;
  submitted = false;
  isEditMode = false;
  academicYearId: number;
  schoolHolidayId: any;
  modelRef: NgbModalRef;
  SchoolHolidayDetailDto: any[];
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  errorMessage : String;


  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private user: UserService,
    private httpClient: HttpClient,
    private toastEvokeService: ToastEvokeService,
    private schoolHolidayService: SchoolHolidayServiceProxy,
    private calendar: NgbCalendar,  ) {} 

  ngOnInit(): void {
    this.addSchoolHolidayForm = this.formBuilder.group({
      schoolHolidayId: [0],
      academicYearId: [],
      holidayTypeDetailsList: this.formBuilder.array([]),
    });
    this.addSchoolHolidayForm.get('academicYearId')?.setValue(this.academicYearId);
    this.addSchoolHoliday();
  }
  addSchoolHoliday() {
    const itemFormGroup = this.formBuilder.group({
      schoolHolidayId: [0],
      calendarDate: [null],
      ngbCalendarDate: [null,Validators.required], 
      holidayReason: ['', Validators.required],
    });
    this.holidayTypeDetailsListArray.push(itemFormGroup);
  }

  get holidayTypeDetailsList() {
    let formArray = this.addSchoolHolidayForm.get('holidayTypeDetailsList') as FormArray;
    return formArray.controls;
  }

  get holidayTypeDetailsListArray() {
    return this.addSchoolHolidayForm.get('holidayTypeDetailsList') as FormArray;
  }


  patchHolidaysTypeArrayValues(values: SchoolHolidayDetailDto[]) {
    while (this.holidayTypeDetailsListArray.length !== 0) {
      this.holidayTypeDetailsListArray.removeAt(0);
    }
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        schoolHolidayId: [value.schoolHolidayId],
        holidayReason: [value.holidayReason],
        ngbCalendarDate: [value.ngbCalendarDate],
        calendarDate: [value.calendarDate],
      });
      this.holidayTypeDetailsListArray.push(itemFormGroup);
    });
  }

  get f() { return this.addSchoolHolidayForm.controls; }

  onSubmit() {
    debugger
      
        this.submitted = true;
        // stop here if form is invalid
        if (this.addSchoolHolidayForm.invalid) {
            return;
        }
  
        let schoolHolidayResponseDto = this.addSchoolHolidayForm.getRawValue() as SchoolHolidayResponseDto;
            schoolHolidayResponseDto.academicYearId = this.academicYearId;
        this.schoolHolidayService.schoolHolidayInsert(schoolHolidayResponseDto).subscribe(result => {
              if(result != "success") {
                this.schoolHolidayExistSuccessNotification(result);
              }
              else {
                this.modelRef.close(true);
            }
        });
    }


  close() {
    this.modelRef.close(false);
  }

  removeSchoolHoliday(index: number) {
    this.holidayTypeDetailsListArray.removeAt(index);
  }

  schoolHolidayExistSuccessNotification(inputDateString : any) {
    const title = this.translate.instant('FAILED_TO_SAVE_!');
    const message = this.translate.instant('DATE_IS_ALREADY_EXIST');
    this.toastEvokeService.danger(
      title,
      inputDateString + ' ' + message
    ).subscribe();
}

}
