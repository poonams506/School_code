import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { UserService } from 'src/app/services/user-service';
import { CalendarParentAppModuleDto, ParentAppServiceProxy, SchoolCalendarDto, SchoolCalendarEventDetailAppDto, SchoolCalendarServiceProxy, SchoolParentCalendarResponseDto } from 'src/app/services/school-api-service';
import { CalendarEventDetailModalComponent } from '../../teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component';
import { CalenderDayInterface } from '../../teacherApp/calendar/calender-day.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  @Input() currentEventOnPopup: CalendarParentAppModuleDto;

  content_loaded: boolean = false;
  constructor(
    public commonMethod :CommonMethodService,
    private userService:UserService,
    public ParentAppService: ParentAppServiceProxy,
    private modalCtrl: ModalController

    ) { }

  currentDate:string=moment().format('YYYY-MM-DD');
  currentSelectedDate:moment.Moment=moment();
  currentFirstDate:string=moment().format('YYYY-MM-DD');
  academicYearId:number;
  lstAllEvents:any[]=[];
  lstCurrentDayEvents:any[]=[];
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Calendar');
    this.getInitData();

  }
  

  ngOnInit() {
    this.getInitData();
   
  }
  getInitData(){
    this.userService.getAcademicYear().subscribe(result=>{
      this.academicYearId=result;
      this.ParentAppService.getParentAppListSelect(this.academicYearId,this.userService.CurrentSiblingClassId).subscribe(result=>{
      this.lstAllEvents=result.parentLstEvents;
      console.log(result)
      this.onMonthYearChange();
      this.content_loaded = true;
      setTimeout(() => {
      this.scrollToChipByClassName();
      }, 500);
      })
      
      
    });
   }
  scrollToChipByClassName() {
    const elements = document.getElementsByClassName('selected');
    
    if (elements.length > 0) {
      const selectedChip = elements[0] as HTMLElement;
      selectedChip.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
      this.scrollToChipByClassName();
    }, 2000);
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
  } else{
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
    let  weeklyOff= this.lstAllEvents.filter(x=> x.eventType=='WeeklyOff' && this.currentSelectedDate.isSame(x.weeklyOffDate,'date'));

    if(schoolEvents.length>0){
    this.lstCurrentDayEvents.push(...schoolEvents);
   }
   if(holidayEvents.length>0)
   {
     this.lstCurrentDayEvents.push(...holidayEvents);
   }
   if(vacationEvents.length>0){
    this.lstCurrentDayEvents.push(...vacationEvents);
   }
   if(weeklyOff.length>0){
    this.lstCurrentDayEvents.push(...weeklyOff);
   }
   console.log(this.lstCurrentDayEvents)
   setTimeout(() => {
    this.scrollToChipByClassName();
    }, 500);
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
  // openModal(isOpen: boolean, schoolEventId: number) {
  //   debugger
  //   this.isModalOpen = isOpen;
  //   console.log()
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
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:SchoolCalendarEventDetailAppDto ) {
    window.open(file.fullPath, '_blank');
  }
 
  
}
