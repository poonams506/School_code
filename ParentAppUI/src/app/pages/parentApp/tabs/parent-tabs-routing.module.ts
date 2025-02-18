import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentTabsPage } from './parent-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ParentTabsPage,
    children:[
      {
        path:'dashboard',
        loadChildren:()=>import('../parent-dashboard/parent-dashboard.module').then(m=> m.ParentDashboardModule)
      },
      {
        path:'home',
        loadChildren:()=>import('../home/home.module').then(m=> m.HomePageModule)
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
        path: 'fees',
        loadChildren: () => import('../fees/fees.module').then(m => m.FeesModule)
      },
      {
        path: 'transport-fees',
        loadChildren: () => import('../transport-fees/transport-fees.module').then(m => m.TransportFeesModule)
      },
      {
        path: 'notice',
        loadChildren: () => import('../notice/notice.module').then(m => m.NoticeModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'attendance',
        loadChildren: () => import('../attendance/attendance.module').then(m => m.AttendanceModule)
      },
      {
        path: 'parents',
        loadChildren: () => import('../parents/parents.module').then(m => m.ParentsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/parent-profile.module').then(m => m.ParentProfilePageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
      },
      {
        path: 'track-bus',
        loadChildren: () => import('../track-bus/track-bus.module').then(m => m.TrackBusModule)
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
