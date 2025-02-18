import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  //  { path: 'dashboard', component: HomeComponent },

  {
    path: 'tickets',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule)
  },
   {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
