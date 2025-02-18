import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherTabsPage } from './teacher-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherTabsPage,
    children:[
      {
        path:'dashboard',
        loadChildren:()=>import('../teacher-dashboard/teacher-dashboard.module').then(m=> m.TeacherDashboardModule)
      },
      {
        path:'home',
        loadChildren:()=>import('../home/home.module').then(m=> m.HomePageModule)
      },
      {
        path:'profile',
        loadChildren:()=>import('../profile/teacher-profile-page.module').then(m=> m.TeacherProfilePageModule)
      },
      {
        path: 'attendance',
        loadChildren: () => import('../attendance/attendance.module').then(m => m.AttendanceModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarModule)
      }, 
    
      {
        path: 'timetable',
        loadChildren: () => import('../timetable/timetable.module').then(m => m.TimetableModule)
      }, 
    
      {
        path: 'homework',
        loadChildren: () => import('../homework/homework.module').then(m => m.HomeworkModule)
      }, 
      
      {
        path: 'notice',
        loadChildren: () => import('../notice/notice.module').then(m => m.NoticeModule)
      },
      {
        path: 'students',
        loadChildren: () => import('../student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherTabsPageRoutingModule { }
