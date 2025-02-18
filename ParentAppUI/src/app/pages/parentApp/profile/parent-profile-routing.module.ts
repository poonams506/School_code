import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentProfilePage } from './parent-profile.page';


const routes: Routes = [
  {
    path: '',
    component: ParentProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentProfilePageRoutingModule {}
