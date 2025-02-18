import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/authentication/sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'send-otp',
    loadChildren: () => import('./modules/authentication/send-otp/send-otp.module').then(m => m.SendOtpModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/authentication/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'confirm-password/:token',
    loadChildren: () => import('./modules/authentication/confirm-password/confirm-password.module').then(m => m.ConfirmPasswordModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grade-master',
    loadChildren: () => import('./modules/grade/grade.module').then(m => m.GradeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'division-master',
    loadChildren: () => import('./modules/division/division.module').then(m => m.DivisionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'school-profile',
    loadChildren: () => import('./modules/school-profile/school-profile.module').then(m => m.SchoolProfileModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'students',
    loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'student-certificates',
    loadChildren: () => import('./modules/student-certificates/student-certificates.module').then(m => m.StudentCertificatesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'teachers',
    loadChildren: () => import('./modules/teachers/teachers.module').then(m => m.TeachersModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'parents',
    loadChildren: () => import('./modules/parents/parents.module').then(m => m.ParentsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'admins',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },

  
  {
    path: 'cab-drivers',
    loadChildren: () => import('./modules/cab-driver/cab-driver.module').then(m => m.CabDriverModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'clerks',
    loadChildren: () => import('./modules/clerk/clerk.module').then(m => m.ClerkModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'user-access',
    loadChildren: () => import('./modules/user-access/user-access.module').then(m => m.UserAccessModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'select-role',
    loadChildren: () => import('./modules/authentication/select-login-role/select-login-role.module').then(m => m.SelectLoginRoleModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'school-settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fee-management',
    loadChildren: () => import('./modules/fee-management/fee-management.module').then(m => m.FeeManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'student-kit-fee-management',
    loadChildren: () => import('./modules/student-kit-fee-management/student-kit-fee-management.module').then(m => m.StudentKitFeeManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transport-fee-management',
    loadChildren: () => import('./modules/transport-fee-management/transport-fee-management.module').then(m => m.TransportFeeManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'adhoc-fee-management',
    loadChildren: () => import('./modules/adhoc-fee-management/adhoc-fee-management.module').then(m => m.AdhocFeeManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance',
    loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'homework',
    loadChildren: () => import('./modules/homework/homework.module').then(m => m.HomeworkModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notice',
    loadChildren: () => import('./modules/notices/notices.module').then(m => m.NoticesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subject',
    loadChildren: () => import('./modules/subject/subject.module').then(m => m.SubjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'timetable',
    loadChildren: () => import('./modules/class-timetable/class-timetable.module').then(m => m.ClassTimetableModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'report',
    loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'school-calendar',
    loadChildren: () => import('./modules/school-calendar/school-calendar.module').then(m => m.SchoolCalendarModule),
    canActivate: [AuthGuard]
  }, 
  {
    path: 'survey',
    loadChildren: () => import('./modules/survey/survey.module').then(m => m.SurveyModule),
    canActivate: [AuthGuard]
  }, 
  {
    path: 'transport',
    loadChildren: () => import('./modules/transport/transport.module').then(m => m.TransportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'open-tickets',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'public',
    loadChildren: () => import('./public/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cbse-exam',
    loadChildren: () => import('./modules/cbse-exam/cbse-exam.module').then(m => m.CbseExamModule),
    canActivate: [AuthGuard]
  },
  {
  path: 'cbse-exam-result',
  loadChildren: () => import('./modules/cbse-exam-result/cbse-exam-result.module').then(m => m.CbseExamResultModule),
  canActivate: [AuthGuard]
},
{
  path: 'registration-fee-management',
  loadChildren: () => import('./modules/registration-fee-management/registration-fee-management.module').then(m => m.RegistrationFeeManagementModule),
  canActivate: [AuthGuard]
},
{
  path: 'cbse-academic-assessment-report',
  loadChildren: () => import('./modules/cbse-academic-assessment-report/cbse-academic-assessment-report.module').then(m => m.CbseAcademicAssessmentReportModule),
  canActivate: [AuthGuard]
},

  
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },

  {
    path: '',
    redirectTo: '/public',
    pathMatch: 'full'
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
