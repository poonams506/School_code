import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbseExamModule } from './cbse-exam.module';
import { ExamMasterComponent } from './exam-master/exam-master.component';
import { ClassExamMappingComponent } from './class-exam-mapping/class-exam-mapping.component';
import { ExamObjectComponent } from './exam-object/exam-object.component';
import { MarksGradeRelationComponent } from './marks-grade-relation/marks-grade-relation.component';
import { ExamReportcardTemplateComponent } from './exam-reportcard-template/exam-reportcard.component';

const routes: Routes = [
  {path:"exam-master", component:ExamMasterComponent},
  {path:"exam-object", component:ExamObjectComponent},
  {path:"exam-mapping", component:ClassExamMappingComponent},
  {path:"marks-grade-relation", component:MarksGradeRelationComponent},
  {path:"exam-reportcard-template", component:ExamReportcardTemplateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbseExamRoutingModule { }
