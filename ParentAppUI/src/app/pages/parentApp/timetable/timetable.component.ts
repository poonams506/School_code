import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClassTimeTableServiceProxy, CommonDropdownSelectListItemDto, DatatableRequestWrapper, ICommonDropdownSelectListItemDto, IStudentClassTimeTableRequestDto, ITeacherClassTimeTableRequestDto, ITeacherDropdownSelectListDto, StudentClassTimeTableRequestDto, TeacherClassTimeTableRequestDto, TeacherDropdownSelectListDto } from 'src/app/services/school-api-service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service';
import { TeacherTimeTableInterface } from '../../teacherApp/timetable/teacher-timetable.interface';
import { ITimeTableDaySelectInterfaceDto } from '../../teacherApp/timetable/timetable-day-select.interface';

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


  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

currentDate:moment.Moment;
currentDayNo : number;
academicYearId:number;
classId:number;

ionViewDidEnter() {
  this.commonMethod.setHeaderTitle('Timetable');
  this.currentDate=moment();
  this.currentDayNo = this.currentDate.day();// == 0 ? 7 : this.currentDate.day();
  this.lstWeek=[
  {id:1,value:'Sun',isSelected:this.currentDayNo==0},
  {id:2,value:'Mon',isSelected:this.currentDayNo==1},
  {id:3,value:'Tue',isSelected:this.currentDayNo==2},
  {id:4,value:'Wed',isSelected:this.currentDayNo==3},
  {id:5,value:'Thur',isSelected:this.currentDayNo==4},
  {id:6,value:'Fri',isSelected:this.currentDayNo==5},
  {id:7,value:'Sat',isSelected:this.currentDayNo==6},
  ];

 this.classId=this.userService.CurrentSiblingClassId;
  this.userService.getAcademicYear().subscribe(result=>{
    this.academicYearId=result;
    this.loadStudentPeriodList();
  });
}

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

  loadStudentPeriodList() {
    this.teacherPeriodList = [];
    let requestWrapper = {academicYearId:this.academicYearId,
                         classId:this.classId} as IStudentClassTimeTableRequestDto;
    this.classTimeTableService.getStudentClassTimeTable(requestWrapper as StudentClassTimeTableRequestDto).subscribe(result => {
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
                  .filter(x=> x.Day== (this.currentDayNo + 1))
                  .sort(this.compare);
              });
              
            });
        });
      }
     
      console.log(result);
    });
  }

  periodCount: number = 0;

  getPeriodIndex(index: number): number {
      let currentIndex = 0;
      for (let i = 0; i <= index; i++) {
          if (this.teacherPeriodListCurrentDay[i].SubjectName && this.teacherPeriodListCurrentDay[i].TeacherName) {
              currentIndex++;
          }
      }
      return currentIndex;
  }
  
}
