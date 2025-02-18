import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAttendanceReportComponent } from './student-attendance-report/student-attendance-report.component';
import { ClassAttendanceReportComponent } from './class-attendance-report/class-attendance-report.component';

const routes: Routes = [ {
  path:"", component:StudentAttendanceReportComponent
},
{
  path:"student-attendance-report", component:StudentAttendanceReportComponent
},
{
  path:"class-attendance-report", component:ClassAttendanceReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
