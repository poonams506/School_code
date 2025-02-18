import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { TeacherTimetableComponent } from './teacher-timetable/teacher-timetable.component';
import { StudentTimetableComponent } from './student-timetable/student-timetable.component';
import { TimeTableGridComponent } from './time-table-grid/time-table-grid.component';

const routes: Routes = [
  {path:'', component:TimeTableGridComponent},
  {path:'manage-timetable', component:TimeTableGridComponent},
  {path:'add-timetable', component:TimetableComponent},
  {path:'add-timetable/:timeTableRouteParameter', component:TimetableComponent},
  {path:'teacher-timetable', component:TeacherTimetableComponent},
  {path:'class-timetable', component:StudentTimetableComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassTimetableRoutingModule { }
