import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisionListingComponent } from './division-listing/division-listing.component';

const routes: Routes = [
  {
    path: '',
    component: DivisionListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionRoutingModule { }
