import { Component } from '@angular/core';
import * as moment from 'moment';
import { ICommonDropdownSelectListItemDto, TeacherOverlapComparisonErrorDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-class-time-table-error-modal',
  templateUrl: './class-time-table-error-modal.component.html',
  styleUrls: ['./class-time-table-error-modal.component.scss']
})
export class ClassTimeTableErrorModalComponent {

  modelRef:any;
  errors:TeacherOverlapComparisonErrorDto[]=[];
  dayPartYAxis:ICommonDropdownSelectListItemDto[]=[];
  errorMessage:string
  ngOnInit(): void {
    this.errorMessage="CLASS_TIMETABLE_CONFLICT"; 
    this.dayPartYAxis=
    [
    {id:1,value:'Sunday'},{id:2,value:'Monday'},{id:3,value:'Tuesday'},
    {id:4,value:'Wednesday'},{id:5,value:'Thursday'},{id:6,value:'Friday'},
    {id:7,value:'Saturday'},
    ];
  }

  getDayNameById(id:number){
    let dayName= this.dayPartYAxis.find(x=>x.id==id);
    if(dayName){
      return dayName.value;
    }else{
      return "";
    }
  }

  getFormattedMinute(hour:number,minute:number){
    return moment({"hour":hour,"minutes": minute}).format('HH:mm');
  }

  close() {
    this.modelRef.close(false);
}

}
