import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import {
  BulkAttendanceUpdateDto,
  BulkAttendanceUpdateServiceProxy,
  BulkAttendanceUpdateUpsertDto,
  BulkAttentanceStudentDto,
  IBulkAttendanceUpdateDto,
  IStudentAttendanceStatusInsertDto,
  IStudentAttendanceUpdateRequestDto,
  SchoolCalendarServiceProxy,
  StudentAttendanceStatusInsertDto,
  StudentAttendanceUpdateRequestDto,
} from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-bulk-atteandance',
  templateUrl: './add-edit-bulk-atteandance.component.html',
  styleUrls: ['./add-edit-bulk-atteandance.component.scss'],
})
export class AddEditBulkAtteandanceComponent implements OnInit {
  classAttendanceForm: FormGroup;
  submitted = false;
  academicYearId: number;
  academicYearStartMonth: string;
  gradeId: any;
  divisionId: any;
  monthId: any;
  year: any;
  dates: any[] = [];
  className: string = ''; 
  month: string = ''; 
  // studentList: BulkAttentanceStudentDto[] = [];
  studentList: any[] = [];
  modelRef: any;
  status:string;

  attendanceStatusList: any[] = [];
  holidayList: any[] = [];
  holidays: number[] = [];
  vacations: number[] = [];
  weeklyOffDays: number[] = [];
  holidayDates: { [key: string]: { color: string, title: string } } = {}; 
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,
    private attendanceStatusService: BulkAttendanceUpdateServiceProxy,
    private schoolCalendarService:SchoolCalendarServiceProxy,
    private toastEvokeService: ToastEvokeService,


  ) {
    this.classAttendanceForm = this.fb.group({
      studentList: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.user.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.schoolEventHolidaySelect();
      this.getStudentAttendanceStatusList();
    });
  }

  getDaysInMonth(month: number, year: number): number {
    return moment().month(month - 1).year(year).daysInMonth();
  }

  get studentListArray(): FormArray {
    return this.classAttendanceForm.get('studentList') as FormArray;
  }

  updateDates() {
    const daysInMonth = this.getDaysInMonth(this.monthId, this.year);
    this.dates = Array.from({ length: daysInMonth }, (v, k) => ({ day: k + 1 }));
    this.updateStudentAttendanceForms();
  }

  updateStudentAttendanceForms() {
    const studentLists = this.studentListArray;
    studentLists.clear();

    this.studentList.forEach(student => {
      const attendanceGroup = this.createStudentGroup(student);
      studentLists.push(attendanceGroup);
    });

 
  }

  createStudentGroup(student: BulkAttentanceStudentDto): FormGroup {
    const bulkListArray = this.fb.array(this.dates.map(() => this.fb.group({
      statusId: ['', Validators.required],
    })));

    return this.fb.group({
      studentName: [student.studentName],
      rollNumber:[student.rollNumber],
      bulkList: bulkListArray,
    });
  }

  getStudentAttendanceStatusList(): void {
    debugger;
    let studentAttendanceUpdateRequestDto = ({
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearId: this.academicYearId,
      monthId: this.monthId,
      yearId: this.year,
    } as IStudentAttendanceUpdateRequestDto) as StudentAttendanceUpdateRequestDto;

    this.attendanceStatusService.getStudentAttendanceByMonthSelect(studentAttendanceUpdateRequestDto)
      .subscribe((result) => {
        
        this.studentList = result.bulkStudentList;
        this.attendanceStatusList = result.bulkList;
        this.updateDates();
        this.populateAttendanceData(this.attendanceStatusList); 
      }, error => {
        console.error('Error fetching attendance data', error);
      });
  }

  populateAttendanceData(attendanceList: any[]): void {
    this.studentList.forEach((student, studentIndex) => {
      attendanceList.forEach(attendance => {
        if (attendance.studentId === student.studentId) {
          const attendanceDate = moment(attendance.attendanceDateTime);
          const dateIndex = attendanceDate.date() - 1;
  
          if (dateIndex >= 0 && dateIndex < this.dates.length) {
            const bulkListArray = this.studentListArray.at(studentIndex).get('bulkList') as FormArray;
            const statusId = attendance.statusId;
  
            let displayValue = '';
            switch (statusId) {
              case 1:
                displayValue = 'P'; // Present
                break;
              case 2:
                displayValue = 'H'; // Half-day
                break;
              case 3:
                displayValue = 'A'; // Absent
                break;
              default:
                displayValue = ''; // Blank for 0
            }
  
            bulkListArray.at(dateIndex).get('statusId')?.setValue(displayValue);
          }
        }
      });
    });
  }

  saveAttendanceRecords() {
    this.submitted = true;
    const bulkAttendanceUpdateList: BulkAttendanceUpdateUpsertDto[] = [];
    this.studentList.forEach((student, studentIndex) => {
      const bulkListArray = this.studentListArray.at(studentIndex).get('bulkList') as FormArray;
  
      this.dates.forEach((date, dateIndex) => {
        const statusValue = bulkListArray.at(dateIndex).get('statusId')?.value;
  
        let statusId = 0;
        switch (statusValue) {
          case 'P':
            statusId = 1; break;
          case 'H':
            statusId = 2; break;
          case 'A':
            statusId = 3; break;
          default:
            statusId = 0;
        }
  
        if (statusId >= 0) {
          const attendanceUpdate = new BulkAttendanceUpdateUpsertDto();
          attendanceUpdate.studentId = student.studentId;
          attendanceUpdate.attendanceDateTime = moment()
            .year(this.year)
            .month(this.monthId - 1)
            .date(date.day);
          attendanceUpdate.statusId = statusId;
          bulkAttendanceUpdateList.push(attendanceUpdate);
        }
      });
    });
  
    const bulkAttendanceUpdateDto = ({
      academicYearId: this.academicYearId,
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearStartMonth: moment(this.academicYearStartMonth),
      year: this.year,
      className: this.className,
      monthId: this.monthId,
      month: this.month,
      attendanceStatusList: bulkAttendanceUpdateList,
    } as IBulkAttendanceUpdateDto) as BulkAttendanceUpdateDto ;
    this.attendanceStatusService.studentAttendanceByMonthUpsert(bulkAttendanceUpdateDto).subscribe(
      response => {
        this.modelRef.close(true);
         
      },
      error => {
        console.error('Error saving attendance records:', error);
      }
    );
  }

  close(): void {
    
    this.modelRef.close(false);
  }

  handleStatusChange(studentIndex: number, dayIndex: number, event: Event): void {
    const status = (event.target as HTMLInputElement).value;
    const studentFormArray = this.studentListArray;
    const attendanceGroup = studentFormArray.at(studentIndex) as FormGroup;
    const bulkListArray = attendanceGroup.get('bulkList') as FormArray;
    bulkListArray.at(dayIndex).patchValue({ statusId: status });
  }

  restrictInput(event: KeyboardEvent) {
    const validKeys = ['A', 'P', 'H']; 
    const key = event.key.toUpperCase(); 
  
    if (!validKeys.includes(key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase(); 
  }

vacationNames: string[] = []; 
holidayNames: string[] = []; 
weeklyNames: string[] = []; 

schoolEventHolidaySelect(): void {
  this.schoolCalendarService.schoolCalenadarSelect(this.academicYearId).subscribe((result) => {
    this.holidays = [];
    this.holidayNames = []; 
    this.vacations = [];
    this.vacationNames = []; 
    this.weeklyOffDays = [];
    this.weeklyNames = []; 
    result.eventHolidayList?.forEach(eventHoliday => {
      const eventDate = moment(eventHoliday.calendarDate);
  
      // Handle Holidays
      if (eventHoliday.eventType === 'Holiday') {
        const dateKey = eventDate.date();
        if (eventDate.month() === this.monthId - 1 && eventDate.year() === this.year) {
          this.holidays.push(dateKey);
          this.holidayNames[dateKey] = eventHoliday.holidayReason; 
        }
      }
  
      // Handle Vacations
      if (eventHoliday.eventType === 'Vacation' && eventHoliday.vacationStartDate && eventHoliday.vacationEndDate) {
        let startDate = moment(eventHoliday.vacationStartDate);
        let endDate = moment(eventHoliday.vacationEndDate);
        while (startDate.isSameOrBefore(endDate)) {
          const dateKey = startDate.date();
          if (startDate.month() === this.monthId - 1 && startDate.year() === this.year) {
            this.vacations.push(dateKey);
            this.vacationNames[dateKey] = eventHoliday.vacationName; 
          }
          startDate.add(1, 'days');
        }
      }
  
      // Handle Weekly Offs
      if (eventHoliday.eventType === 'WeeklyOff' && eventHoliday.weeklyOffDate) {
        const weeklyOffDate = moment(eventHoliday.weeklyOffDate);
        const dateKey = weeklyOffDate.date();
        if (weeklyOffDate.month() === this.monthId - 1 && weeklyOffDate.year() === this.year) {
          this.weeklyOffDays.push(dateKey);
          this.weeklyNames[dateKey] = eventHoliday.weeklyOffName; 
        }
      }
    });
    this.refresh.next();
  });
}  

getAbbreviatedDayOfWeek(date: { day: number }): string {
  const fullDate = moment().year(this.year).month(this.monthId - 1).date(date.day);
  const dayOfWeek = fullDate.format('ddd'); 
  return `${dayOfWeek} ${date.day}`; 
}

isHoliday(day: number): boolean {
  return this.holidays.includes(day);
}

isVacation(day: number): boolean {
  return this.vacations.includes(day);
}

isWeeklyOff(day: number): boolean {
  return this.weeklyOffDays.includes(day);
}

hasWeeklyOff(): boolean {
  return this.dates.some(date => this.isWeeklyOff(date.day));
}

hasHolidays(): boolean {
  return this.dates.some(date => this.isHoliday(date.day));
}

hasVacations(): boolean {
  return this.dates.some(date => this.isVacation(date.day));
}

getDayTooltip(day: number): string {
  if (this.isHoliday(day)) {
    return this.holidayNames[day] || 'Holiday'; 
  } else if (this.isVacation(day)) {
    return this.vacationNames[day] || 'Vacation'; 
  } else if (this.isWeeklyOff(day)) {
    return this.weeklyNames[day] || 'WeeklyOff'; 
  }
  return ''; 
}

preventPaste(event: ClipboardEvent) {
  event.preventDefault(); 
}

attendanceCompleted: boolean = false;
markAsComplete(): void {
  
  this.submitted = true;
    const bulkAttendanceUpdateList: BulkAttendanceUpdateUpsertDto[] = [];
    this.studentList.forEach((student, studentIndex) => {
      const bulkListArray = this.studentListArray.at(studentIndex).get('bulkList') as FormArray;
  
      this.dates.forEach((date, dateIndex) => {
        const statusValue = bulkListArray.at(dateIndex).get('statusId')?.value;
  
        let statusId = 0;
        switch (statusValue) {
          case 'P':
            statusId = 1; break;
          case 'H':
            statusId = 2; break;
          case 'A':
            statusId = 3; break;
          default:
            statusId = 0;
        }
  
        if (statusId >= 0) {
          const attendanceUpdate = new BulkAttendanceUpdateUpsertDto();
          attendanceUpdate.studentId = student.studentId;
          attendanceUpdate.attendanceDateTime = moment()
            .year(this.year)
            .month(this.monthId - 1)
            .date(date.day);
          attendanceUpdate.statusId = statusId;
          bulkAttendanceUpdateList.push(attendanceUpdate);
        }
      });
    });
  
    const bulkAttendanceUpdateDto = ({
      academicYearId: this.academicYearId,
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearStartMonth: moment(this.academicYearStartMonth),
      year: this.year,
      className: this.className,
      monthId: this.monthId,
      month: this.month,
      attendanceStatusList: bulkAttendanceUpdateList,
    } as IBulkAttendanceUpdateDto) as BulkAttendanceUpdateDto ;
    this.attendanceStatusService.studentAttendanceByMonthUpsert(bulkAttendanceUpdateDto).subscribe(
      response => {
       this.saveMarkAsCompleteStatus();
        
         
      },
      error => {
        console.error('Error saving attendance records:', error);
      }
    );
}

saveMarkAsCompleteStatus(){
  if (this.studentListArray.controls.length === 0) {
    this.showUnSucessCompletionNotification();
    return; 
  }

  let allCompleted = true;
  this.studentListArray.controls.forEach(student => {
    const bulkListArray = student.get('bulkList') as FormArray;
    bulkListArray.controls.forEach((dayControl, index) => {
      const day = this.dates[index].day; 
      if (!this.isHoliday(day) && !this.isVacation(day) && !this.isWeeklyOff(day)) {
        if (!dayControl.get('statusId')?.value) {
          allCompleted = false;
        }
      }
    });
  });

  this.attendanceCompleted = allCompleted;

  if (this.attendanceCompleted) {
    let requestDto = ({
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearId: this.academicYearId,
      monthId: this.monthId,
      yearId: this.year,
    } as IStudentAttendanceStatusInsertDto) as StudentAttendanceStatusInsertDto;

    this.attendanceStatusService.statusInsert(requestDto)
      .subscribe((result) => {
        this.showCompletionNotification();
        this.modelRef.close(false);
           
      });
  } else {
    this.showUnSucessCompletionNotification();
    
  }
}


showCompletionNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('ATTENDANCE_MARKED_COMPLETE_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

showUnSucessCompletionNotification() {
  const title = this.translate.instant('FAILED');
  const message = this.translate.instant('FILL_ALL_ATTENDANCE_STATUS_BEFORE_COMPLETING');
  this.toastEvokeService.danger(title, message).subscribe();
}
}