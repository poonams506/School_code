import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicAssessmentReportComponent } from './academic-assessment-report/academic-assessment-report.component';

const routes: Routes = [
  {path:'academic-assessment-report', component:AcademicAssessmentReportComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbseAcademicAssessmentReportRoutingModule { }
