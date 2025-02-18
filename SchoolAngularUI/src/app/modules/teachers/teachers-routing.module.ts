import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersListingComponent } from './teachers-listing/teachers-listing.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherGradeDivisionMappingComponent } from './teacher-grade-division-mapping/teacher-grade-division-mapping.component';
import { ImportTeacherFileComponent } from './import-teacher-file/import-teacher-file.component';

const routes: Routes = [
  {
    path:'', component:TeachersListingComponent
  },
  {path:'add-edit-teacher', component:AddTeacherComponent},
  {
    path: 'add-edit-teacher/:teacherRouteParameter',
    component: AddTeacherComponent
  },
  
    {
      path:"teacher-grade-division-mapping", component:TeacherGradeDivisionMappingComponent
    },
    {
      path: 'import-teacher-file',
      component: ImportTeacherFileComponent
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
