import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectMasterComponent } from './subject-master/subject-master.component';
import { SubjectMappingComponent } from './subject-mapping/subject-mapping.component';
import { TeacherSubjectMappingComponent } from './teacher-subject-mapping/teacher-subject-mapping.component';

const routes: Routes = [
{
  path:"subject-master", component:SubjectMasterComponent
},
{
  path:"subject-mapping", component:SubjectMappingComponent
},
{
  path:"teacher-subject-mapping", component:TeacherSubjectMappingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
