import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabDriverTabsPage } from './cabdriver-tabs.page';

const routes: Routes = [
  {path: '',
  component: CabDriverTabsPage,
  children:[
    {
      path:'home',
      loadChildren:()=>import('../home/home.module').then(m=> m.HomePageModule)
    },
    {
      path:'profile',
      loadChildren:()=>import('../profile/cabdriver-profile-page.module').then(m=> m.CabDriverProfilePageModule)
    },
    {
      path: 'pickup',
      loadChildren: () => import('../pick-up/pick-up-page.module').then(m => m.PickUpPageModule)
    }, 
    {
      path: 'pickup/:tripId/:routeId',
      loadChildren: () => import('../pick-up/pick-up-page.module').then(m => m.PickUpPageModule)
    }, 
    {
      path: 'drop',
      loadChildren: () => import('../drop/drop-page.module').then(m => m.DropPageModule)
    },
    {
      path: 'drop/:tripId/:routeId',
      loadChildren: () => import('../drop/drop-page.module').then(m => m.DropPageModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabDriverTabsRoutingModule { }
