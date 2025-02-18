import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { ClassAttendanceStatusComponent } from './class-attendance-status/class-attendance-status.component';


const routes: Routes = [{path:'', component:AttendanceComponent},
  {path:'class-attendance-status', component:ClassAttendanceStatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
