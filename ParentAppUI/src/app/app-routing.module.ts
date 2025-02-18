import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  {
       path: '',
       redirectTo: 'signin', // TODO: Set this to ''
       pathMatch: 'full'
    },
    {
      path: 'teacher-app',
      loadChildren: () => import('./pages/teacherApp/teacher-app.module').then(m => m.TeacherAppModule),
      // canActivate: [AuthGuard] // Secure all child pages
    },
  {
    path: 'parent-app',
    loadChildren: () => import('./pages/parentApp/parent-app.module').then(m => m.ParentAppModule),
    // canActivate: [AuthGuard] // Secure all child pages
  },

  {
    path: 'driver-app',
    loadChildren: () => import('./pages/driverApp/driver-app.module').then(m => m.DriverAppModule),
    // canActivate: [AuthGuard] // Secure all child pages
  },

  {
    path: 'role',
    loadChildren: () => import('./pages/public/role/role.module').then(m => m.RolePageModule),
    canActivate:[AuthGuard]
  },

  {
    path: 'welcome',
    loadChildren: () => import('./pages/public/welcome/welcome.module').then(m => m.WelcomePageModule),
    // canActivate: [PublicGuard] // Prevent for signed in users
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/public/signin/signin.module').then(m => m.SigninPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/public/signup/signup.module').then(m => m.SignupPageModule),
    // canActivate: [PublicGuard] // Prevent for signed in users
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/public/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    // canActivate: [PublicGuard] // Prevent for signed in users
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
