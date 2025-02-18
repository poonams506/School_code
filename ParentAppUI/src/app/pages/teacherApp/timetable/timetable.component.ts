import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClassTimeTableServiceProxy, CommonDropdownSelectListItemDto, DatatableRequestWrapper, ICommonDropdownSelectListItemDto, ITeacherClassTimeTableRequestDto, ITeacherDropdownSelectListDto, TeacherClassTimeTableRequestDto, TeacherDropdownSelectListDto } from 'src/app/services/school-api-service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service';
import { ITimeTableDaySelectInterfaceDto } from './timetable-day-select.interface';
import { TeacherTimeTableInterface } from './teacher-timetable.interface';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit {
  content_loaded: boolean = false;
  teacherPeriodList: TeacherTimeTableInterface[] = [];
  teacherPeriodListCurrentDay:TeacherTimeTableInterface[]=[];
  lstWeek:ITimeTableDaySelectInterfaceDto[];
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private classTimeTableService: ClassTimeTableServiceProxy,
    public commonMethod :CommonMethodService,
    private userService:UserService

  ) { }

 
ionViewDidEnter() {
  
  this.commonMethod.setHeaderTitle('Timetable');
  this.currentDate=moment();
  this.lstWeek=[
  {id:1,value:'Sun',isSelected:this.currentDate.day()==7},
  {id:2,value:'Mon',isSelected:this.currentDate.day()==1},
  {id:3,value:'Tue',isSelected:this.currentDate.day()==2},
  {id:4,value:'Wed',isSelected:this.currentDate.day()==3},
  {id:5,value:'Thur',isSelected:this.currentDate.day()==4},
  {id:6,value:'Fri',isSelected:this.currentDate.day()==5},
  {id:7,value:'Sat',isSelected:this.currentDate.day()==6},
  ];


  this.userService.getAcademicYear().subscribe(result=>{
    this.academicYearId=result;
    this.userService.getUserIdByRole().subscribe(result=>{
      this.teacherId=result;
      this.loadTeacherPeriodList();
    })
    
  });
  
}

currentDate:moment.Moment;
academicYearId:number;
teacherId:number;

  ngOnInit() {
   
  }

  loadTeacherTimeTableForDay(dayNo:number){
    
    this.lstWeek.forEach(day=>{
        day.isSelected=day.id==dayNo
    });

    this.teacherPeriodListCurrentDay=this.teacherPeriodList.filter(x=>x.Day==dayNo);
  }

   compare( a:TeacherTimeTableInterface, b:TeacherTimeTableInterface ) {
    if ( a.EndDate < b.EndDate ){
      return -1;
    }
    if ( a.EndDate > b.EndDate ){
      return 1;
    }
    return 0;
  }

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  } 

  loadTeacherPeriodList() {
    this.teacherPeriodList=[];
    this.teacherPeriodListCurrentDay=[];
    let requestWrapper = {academicYearId:this.academicYearId,
                         classId:[],teacherId:this.teacherId} as ITeacherClassTimeTableRequestDto;
    this.classTimeTableService.getTeacherClassTimeTable(requestWrapper as TeacherClassTimeTableRequestDto).subscribe(result => {
      this.content_loaded = true;
      if(result.classTimeTable.length>0)
      {
        result.classTimeTable.forEach(classTimeData => {
            classTimeData.lstClassTimeTableRow.forEach(row => {
              row.lstClassTimeTableColumn.forEach(column => {
                 this.teacherPeriodList.push(
                  {
                    ClassName:classTimeData.className,
                    Day:column.day,
                    DayName:column.dayName,
                    SubjectId:column.subjectId,
                    SubjectName:column.subjectName,
                    TeacherId:column.teacherId,
                    TeacherName:column.teacherName,
                    StartDate:moment().set({
                      hour: row.startingHour,   
                      minute: row.startingMinute, 
                      second: 0, 
                    }),
                    EndDate:moment().set({
                      hour: row.endingHour,   
                      minute: row.endingMinute, 
                      second: 0, 
                    })
                  }
                  )

                  this.teacherPeriodListCurrentDay=this.teacherPeriodList
                  .filter(x=> x.Day== this.lstWeek.filter(y=>y.isSelected)[0].id)
                  .sort(this.compare);
              });
              
            });
        });
      }
     
    });
  }


  
}
