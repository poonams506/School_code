import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TeachingLoadAnalyserReportComponent } from './teaching-load-analyser-report/teaching-load-analyser-report.component';
import { ClassAttendanceMisssingReportComponent } from './class-attendance-misssing-report/class-attendance-misssing-report.component';
import { TeacherCountPerSubjectReportComponent } from './teacher-count-per-subject-report/teacher-count-per-subject-report.component';
import { TeacherAvailabilityComponent } from './teacher-availability/teacher-availability.component';


const routes: Routes = [
  {
    path: '',component: DashboardComponent
  },
  {
    path: 'teaching-load-analyser-report',component: TeachingLoadAnalyserReportComponent
  },
  {    path: '',
    component: DashboardComponent
  },
  {
    path: 'class-attendance-missing-report',
    component: ClassAttendanceMisssingReportComponent
  },
  {
    path: 'teacher-count-per-subject-report',
    component: TeacherCountPerSubjectReportComponent
  },
  {
    path: 'teacher-availability',
    component: TeacherAvailabilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
