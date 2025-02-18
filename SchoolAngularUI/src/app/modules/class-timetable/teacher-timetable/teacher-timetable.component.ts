import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ClassTimeTableDto, ClassTimeTableRowDetailDto, ClassTimeTableServiceProxy, Division, Grade, GradeDivisionMasterDto, ICommonDropdownSelectListItemDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, TeacherClassTimeTableRequestDto, TeacherDropdownSelectListDto, TimetableSubjectDropdownDto } from 'src/app/services/school-api-service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service';
import { IClassTimeTableUrlParameter, IExistingSubjectTeacher } from '../timetable/ITimetableProducer.interface';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const millisecondsInADay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-teacher-timetable',
  templateUrl: './teacher-timetable.component.html',
  styleUrls: ['./teacher-timetable.component.scss']
})


export class TeacherTimetableComponent {
  searchTimeTableForm:FormGroup;
  periodTypeDropdownData:ICommonDropdownSelectListItemDto[]=[];
  dayPartYAxis:ICommonDropdownSelectListItemDto[]=[];
  commonDayPartYAxis:ICommonDropdownSelectListItemDto[]=[];
  timePartXAxis:ClassTimeTableRowDetailDto[]=[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  submitted:boolean=false;
  classList:SchoolGradeDivisionMatrixDto[] = [];
  academicYearId:number;
  classId:number;
  subjectDropdown:TimetableSubjectDropdownDto[]=[];
  teacherDropdownData:TeacherDropdownSelectListDto[]=[];
  timetableSubmitted:boolean=false;
  classTimeTableUrlDetail:IClassTimeTableUrlParameter
  teacherSubjectMapping:IExistingSubjectTeacher[]=[];
  classTimeTables:ClassTimeTableDto[];
   EVENT_LIMIT:number=2;
  constructor(
    public translate: TranslateService,
    private formBuilder:FormBuilder,
    private masterService:MasterServiceProxy,
    private userService:UserService,
    private timeTableService:ClassTimeTableServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private modal: NgbModal
  ) {
    this.searchTimeTableForm = this.formBuilder.group({
      teacherId: [null,Validators.required],
      classId:[[]],
      academicYearId:[null]
    });


  }

  ngOnInit(): void {

      this.periodTypeDropdownData=
      [
        {id:1,value:'Period'},{id:2,value:'Recess'},
      ];

      this.commonDayPartYAxis=
      [
      {id:1,value:'Sunday'},{id:2,value:'Monday'},{id:3,value:'Tuesday'},
      {id:4,value:'Wednesday'},{id:5,value:'Thursday'},{id:6,value:'Friday'},
      {id:7,value:'Saturday'},
      ];

      this.dayPartYAxis=this.commonDayPartYAxis;
       this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.searchTimeTableForm.get('academicYearId')?.setValue(this.academicYearId);
      this.getMasterDropdownData();
    
  });
     
  
  }


  getClassTimeTableDetail(){
    let teacherRequestDto= this.searchTimeTableForm.getRawValue() as TeacherClassTimeTableRequestDto;
    this.timeTableService.getTeacherClassTimeTable(teacherRequestDto).subscribe(result=>{
      this.scrollToMiddle();
      this.events=[];
      let existingDay =[... new Set(result.classTimeTable.flatMap(x=> 
          x.lstClassTimeTableRow.flatMap(x=>x.lstClassTimeTableColumn.map(x=>x.day))))];
        let existingDayPart:ICommonDropdownSelectListItemDto[]=[];
        existingDay.forEach(element => 
        {
            existingDayPart.push(...this.commonDayPartYAxis.filter(x=>x.id == element));
        }); 
        if(existingDayPart.length>0)
        {

        }
        this.dayPartYAxis=existingDayPart;
        if(result.classTimeTable.length>0){
         this.classTimeTables=result.classTimeTable;
         this.assignAllYearEventForAllClass();
        }
    });
  }

 getStartOfYear(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), 0, 1); // January 1st of the current year
}
 days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
startDate:Date;
  assignAllYearEventForAllClass(){
    this.startDate=this.getStartOfYear();
    this.classTimeTables.forEach(timeTable=>{
      timeTable.lstClassTimeTableRow.forEach(row =>{
          row.lstClassTimeTableColumn.forEach(column=>{
              if(column.teacherId)
              {
                
                let currentDayName= this.commonDayPartYAxis.filter(x=>x.id==column.day)[0].value;
                for (let i = 0; i < 365; i++) {
                  const currentStartDate = new Date(this.startDate.getTime() + i * millisecondsInADay);
                  const currentEndDate = new Date(this.startDate.getTime() + i * millisecondsInADay);
                  if(currentDayName == this.days[currentStartDate.getDay()] )
                  {
                    currentStartDate.setHours(row.startingHour,row.startingMinute);
                    currentEndDate.setHours(row.endingHour,row.endingMinute);
                    this.addEvent(currentStartDate,currentEndDate,`${timeTable.className} | ${column.subjectName} | ${this.getFormattedMinute(row.startingHour,row.startingMinute)} - ${this.getFormattedMinute(row.endingHour,row.endingMinute)}`);
                  }
              }
              }

          });
      });
    });
  }
 
  ngDoCheck(): void {
    // if( document.getElementsByClassName('cal-event') !== undefined &&  document.getElementsByClassName('cal-event').length> 0){
    //   let scrollbar = document.getElementsByClassName('cal-event')[8];
    //   scrollbar.scrollIntoView({behavior: 'smooth'});
    //   scrollbar.scrollIntoView(true);
    // }
  }      

 scrollToMiddle() {
  setTimeout(() => {
    if( document.getElementsByClassName('cal-event') !== undefined &&  document.getElementsByClassName('cal-event').length> 0){
      let scrollbar = document.getElementsByClassName('cal-event')[0];
      scrollbar.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
     // scrollbar.scrollIntoView(true);
    }
  }, 500);
    
}

  getPanelId(classDto:any)
  {
    return   this.classTimeTableUrlDetail?.classId>0 ? classDto.get('classTimeTableId')?.value.toString() : classDto.get('classId')?.value.toString();
  }

  getPanelLabel(classDto:any)
  {
    return   this.classTimeTableUrlDetail?.classId??0 >0 ? classDto.get('classTimeTableName')?.value.toString() : classDto.get('className')?.value.toString();
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

      this.masterService.getTeacherDropdownWithoutSubject().subscribe(result=>{
        this.userService.hasRole('Teacher').subscribe(roleResult=>{
            if(roleResult){
              this.userService.getUserIdByRole().subscribe(teacherId=>{
                this.teacherDropdownData=result.lstDropdownValues.filter(x=>x.teacherId==teacherId);
                if(this.teacherDropdownData && this.teacherDropdownData.length>0){
                  this.searchTimeTableForm.get('teacherId')?.setValue(this.teacherDropdownData[0].teacherId.toString());
                }
               
              })
              
            }
            else
            {
              this.teacherDropdownData=result.lstDropdownValues;
            }
        });
         
        
      });
      
  }


  get f() { return this.searchTimeTableForm.controls; }

searchTimeTable(){
    this.submitted=true;
    if (this.searchTimeTableForm.invalid) {
      return;
  }
 
  this.getClassTimeTableDetail()
  
  
  }

  onReset(){
    this.submitted=false;
    this.searchTimeTableForm.reset();
    this.searchTimeTableForm.get('academicYearId')?.setValue(this.academicYearId);
    this.searchTimeTableForm.get('classId')?.setValue(this.classId);
    this.selectAllClass = false;

    this.events=[];
  }
 
  getFormattedMinute(hour:number,minute:number){
    return moment({"hour":hour,"minutes": minute}).format('hh:mm A');
  }



resetSelectList(f : any){
  if(f.value==null || f.value == "null"){
    f.setValue(null!); 
  }
}

@ViewChild('showMoreModalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  currentMoreEvents:any[];

  actions: CalendarEventAction[] = [];

  refresh = new Subject<void>();

  addEvent(stertDate:Date,endDate:Date,title:string){
    this.events.push(
      {
        start: stertDate,
        end: endDate,
        title: title,
        color: { ...colors['yellow'] },
        draggable: false,
      }
    );
  }

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

  handleEvent(action: string, event: CalendarEvent): void {
   
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
   
  }

  showMoreClicked(eventList:any){
    this.currentMoreEvents = eventList;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

// start : code for select all Class
selectAllClass : boolean = false;
selectAllOptionClass() {
  if(this.selectAllClass){
    const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
    this.searchTimeTableForm.get('classId')?.patchValue(selected);
  }
  else{
    this.searchTimeTableForm.get('classId')?.patchValue([]);
  }
}

checkSelectAllClass(){
  let selectedClassList= this.searchTimeTableForm.get('classId')?.getRawValue() as number[];
  if(selectedClassList.length == this.divisionGradeMapping.length){
    this.selectAllClass = true;
  }
  else{
    this.selectAllClass = false;
  }
}



}
