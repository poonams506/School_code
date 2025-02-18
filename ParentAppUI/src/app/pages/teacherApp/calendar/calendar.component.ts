import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { UserService } from 'src/app/services/user-service';
import { CalenderDayInterface } from './calender-day.interface';
import { SchoolCalendarDto, SchoolCalendarServiceProxy } from 'src/app/services/school-api-service';
import { CalendarEventDetailModalComponent } from './calendar-event-detail-modal/calendar-event-detail-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  content_loaded: boolean = false;
  constructor(
    public commonMethod :CommonMethodService,
    private userService:UserService,
    private schoolCalendarService:SchoolCalendarServiceProxy,
    private modalCtrl: ModalController

    ) { }

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Calendar');
    this.getInitData();
  }



  currentDate:string=moment().format('YYYY-MM-DD');
  currentSelectedDate:moment.Moment=moment();
  currentFirstDate:string=moment().format('YYYY-MM-DD');
  academicYearId:number;
  lstAllEvents:SchoolCalendarDto[]=[];
  lstCurrentDayEvents:SchoolCalendarDto[]=[];
  ngOnInit() {

    this.getInitData();
   
  }

 getInitData(){
  this.userService.getAcademicYear().subscribe(result=>{
    this.academicYearId=result;
    this.schoolCalendarService.getSchoolCalendarEventsForTeacherApp(this.academicYearId).subscribe(result=>{
    this.lstAllEvents=  result.lstEvents;
    this.onMonthYearChange();
    setTimeout(() => {
      this.scrollToChipByClassName();
      }, 500);
    this.content_loaded = true;
   
    })
    
    
  });
 }

lstCurrentMonthDays:CalenderDayInterface[];
  getAllDatesInMonth(): CalenderDayInterface[] {
    
    const dates: CalenderDayInterface[] = [];
    const lastDay = parseInt( moment({year:this.currentYear, month: this.currentMonth, day: 1}).endOf('month').format('DD'));
    for (let day = 1; day <= lastDay; day++) {
      dates.push( {day: moment({ year: this.currentYear, month: this.currentMonth, day: day}),
      isSelected: moment({year:this.currentYear, month: this.currentMonth, day: day}).isSame
      (moment(this.currentFirstDate, 'YYYY-MM-DD'),'date')});
  }
  if(dates.filter(x=>x.isSelected==true).length==0)
  {
      dates[0].isSelected=true;
      this.currentSelectedDate=dates[0].day;
  }
  else{
    this.currentSelectedDate =moment();
  }

    return dates;
}



  currentMonth:number;
  currentYear:number;
  onMonthYearChange(){
    
    this.lstCurrentDayEvents=[];
    this.currentMonth = moment(this.currentDate,'YYYY-MM-DD').month();
    this.currentYear= moment(this.currentDate,'YYYY-MM-DD').year();

    this.lstCurrentMonthDays =this.getAllDatesInMonth();
    this.filterCurrentDayEvents();
    
  
  }

  filterCurrentDayEvents(){
    this.lstCurrentDayEvents=[];
   let schoolEvents=  this.lstAllEvents.filter(x=> x.eventType=='Event' && this.currentSelectedDate.isBetween(x.startDate,x.endDate,"date","[]"));
   let holidayEvents= this.lstAllEvents.filter(x=> x.eventType=='Holiday' && this.currentSelectedDate.isSame(x.calendarDate,'date'));
   let vacationEvents= this.lstAllEvents.filter(x=> x.eventType=='Vacation' && this.currentSelectedDate.isBetween(x.vacationStartDate,x.vacationEndDate,"date","[]"));
   let weeklyOff= this.lstAllEvents.filter(x=> x.eventType=='WeeklyOff' && this.currentSelectedDate.isSame(x.weeklyOffDate,'date'));

   if(schoolEvents.length>0){
    this.lstCurrentDayEvents.push(...schoolEvents);
   }
   if(holidayEvents.length>0){
    this.lstCurrentDayEvents.push(...holidayEvents);
   }
   if(vacationEvents.length>0){
    this.lstCurrentDayEvents.push(...vacationEvents);
   }
   if(weeklyOff.length>0){
    this.lstCurrentDayEvents.push(...weeklyOff);
   }
   setTimeout(() => {
    this.scrollToChipByClassName();
    }, 500);
  }

  scrollToChipByClassName() {
    const elements = document.getElementsByClassName('selected');
    
    if (elements.length > 0) {
      const selectedChip = elements[0] as HTMLElement;
      selectedChip.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  loadCalenderEventForDay(currentDate:moment.Moment){
    this.scrollToChipByClassName();
    this.lstCurrentMonthDays.forEach(day=>{
      day.isSelected=day.day.isSame(currentDate);
  });
  this.currentSelectedDate=currentDate;
  this.filterCurrentDayEvents();
  }
  

  message:string;
  isModalOpen = false;
  async openModal(currEvent:SchoolCalendarDto) {
    const modal = await this.modalCtrl.create({
      component: CalendarEventDetailModalComponent,
      componentProps: {
        currentEventOnPopup: currEvent 
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  // async openModal(currEvent: SchoolCalendarDto) {
  //   const modal = await this.modalCtrl.create({
  //     component: CalendarEventDetailModalComponent,
  //     componentProps: { currentEventOnPopup: currEvent }
  //   });
  // }
  openDetailPopup() {
    this.isModalOpen = true;
  }

  closeDetailPopup(){
    this.isModalOpen=false;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getFormattedMinute(hour:number,minute:number){
    return moment({"hour":hour,"minutes": minute}).format('hh:mm A');
  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
      this.scrollToChipByClassName();
    }, 2000);
  }
}
