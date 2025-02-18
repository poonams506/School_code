import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'teacherTab',
        loadChildren: () => import('../teacherApp/tabs/teacher-tabs.module').then(m => m.TeacherTabsPageModule)
      },
      {
        path: '',
        redirectTo: 'teacherTab',
        pathMatch: 'full'
      },
  
 
 
    ]
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeacherAppRoutingModule { }
