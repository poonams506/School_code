import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    children:[
      {
        path: 'home',
        loadChildren: () => import('../driverApp/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'cabdriverTab',
        loadChildren: () => import('../driverApp/tabs/cabdriver-tabs.module').then(m => m.CabDriverTabsModule)
      },
      
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DriverAppRoutingModule { }
