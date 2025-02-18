  import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user-service';
import { ICommonDropdownSelectListItemDto, MasterServiceProxy, SchoolCalendarDto, SchoolCalendarResponseDto, SchoolCalendarServiceProxy, SchoolEventDto, SchoolEventServiceProxy, SchoolHolidayResponseDto, SchoolHolidayServiceProxy } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

const millisecondsInADay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.scss']
})


export class SchoolCalendarComponent {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  EVENT_LIMIT:number=2
  view: CalendarView = CalendarView.Month;
  currentMoreEvents:any[];
  CalendarView = CalendarView;
  academicYearId:number;
  viewDate: Date = new Date();
  schoolEventDto:any;
  startDate:Date;
  endDate: Date;
  schoolEventId:number;
  schoolHolidayDetailDto:any;
  dayPartYAxis:ICommonDropdownSelectListItemDto[]=[];
  exisitngDayPartYAxis:ICommonDropdownSelectListItemDto[]=[];
  event:any;
  calendar: SchoolCalendarDto[] = [];
  calendarList: SchoolCalendarResponseDto;
  currentDate: Date = new Date();
  clickedDate: Date;
  modalData: {
    action: string;
    event: CalendarEvent;
  };


  activeDayIsOpen: boolean = true;

  constructor( 
    public translate: TranslateService,
    private formBuilder:FormBuilder,
    private masterService:MasterServiceProxy,
    private userService:UserService,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private router:Router,
    private schoolCalendarService:SchoolCalendarServiceProxy,
    private route: ActivatedRoute,
    private modal: NgbModal) {}

     ngOnInit(): void{
      this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.schoolEventHolidaySelect()
    });
       
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  actions: CalendarEventAction[] = [];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  
  closeOpenMonthViewDay() {
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  // showMoreClicked(eventList:any){
  //   this.currentMoreEvents = eventList;
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }
  scrollToMiddle() {
    const windowHeight = window.innerHeight;
    const middle = windowHeight / 1;
    window.scrollTo({
        top: middle,
        behavior: 'smooth' // Optional: for smooth scrolling
    });
}

getFormattedTime(startTime: any, endTime: any) {
  return moment().hours(startTime).minutes(endTime).format('hh:mm A');
}

schoolEventHolidaySelect(): void {
  this.schoolCalendarService.schoolCalenadarSelect(this.academicYearId).subscribe((result) => {
    result.eventHolidayList?.forEach((eventHoliday) => {
      if (eventHoliday.eventType === 'Event') {
        if (eventHoliday.startDate && eventHoliday.endDate &&
          moment(eventHoliday.startDate).isValid() && moment(eventHoliday.endDate).isValid()) {
          const startDate = moment(eventHoliday.startDate).toDate();
          const endDate = moment(eventHoliday.endDate).toDate();
          let formattedTime = '';

          if (eventHoliday.startTime && eventHoliday.endTime &&
            moment(eventHoliday.startTime, 'hh:mm A', true).isValid() &&
            moment(eventHoliday.endTime, 'hh:mm A', true).isValid()) {
            formattedTime = `${moment(eventHoliday.startTime, 'hh:mm A').format('hh:mm A')} - ${moment(eventHoliday.endTime, 'hh:mm A').format('hh:mm A')}`;
          }

          const eventTitle = `${eventHoliday.eventTitle} | ${formattedTime}`;
          this.addEvent(startDate, endDate, eventTitle, 'yellow');
        }
      }  if (eventHoliday.eventType === 'Holiday') { 
        if (eventHoliday.calendarDate && eventHoliday.calendarDate &&
          moment(eventHoliday.calendarDate).isValid() && moment(eventHoliday.calendarDate).isValid()) {
          const startDate = moment(eventHoliday.calendarDate).toDate();
          const endDate = moment(eventHoliday.calendarDate).toDate();
          const eventTitle = `${eventHoliday.holidayReason} `;
          this.addEvent(startDate, endDate, eventTitle, 'red');
        }

      }
      if (eventHoliday.eventType === 'Vacation') { 
        if (eventHoliday.vacationStartDate && eventHoliday.vacationEndDate &&
          moment(eventHoliday.vacationStartDate).isValid() && moment(eventHoliday.vacationEndDate).isValid()) {
          const startDate = moment(eventHoliday.vacationStartDate).toDate();
          const endDate = moment(eventHoliday.vacationEndDate).toDate();
          const eventTitle = `${eventHoliday.vacationName} `;
          this.addEvent(startDate, endDate, eventTitle, 'red');
        }

      }
      if (eventHoliday.eventType === 'WeeklyOff') { 
        if (eventHoliday.weeklyOffDate && eventHoliday.weeklyOffDate &&
          moment(eventHoliday.weeklyOffDate).isValid() && moment(eventHoliday.weeklyOffDate).isValid()) {
          const startDate = moment(eventHoliday.weeklyOffDate).toDate();
          const endDate = moment(eventHoliday.weeklyOffDate).toDate();
          const eventTitle = `${eventHoliday.weeklyOffName} `;
          this.addEvent(startDate, endDate, eventTitle, 'red');
        }
      }
    });
    this.refresh.next();
  });
}

addEvent(startDate:Date,endDate:Date,title:string,color:string){
  this.events.push(
    {
      start: startDate,
      end: endDate,
      title: title,
      color: { ...colors[color] },
      draggable: false,
    }
  );
}

showMoreClicked(eventList: any[], clickedDate: Date) {
  this.currentMoreEvents = eventList;
  this.clickedDate = clickedDate; // Update clickedDate
  this.modal.open(this.modalContent, { size: 'lg' });
}

}