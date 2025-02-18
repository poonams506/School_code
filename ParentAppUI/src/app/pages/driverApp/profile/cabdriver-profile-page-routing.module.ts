import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabDriverProfilePage } from './cabdriver-profile.page';


const routes: Routes = [
  {
    path: '',
    component: CabDriverProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabDriverProfilePageRoutingModule {}
