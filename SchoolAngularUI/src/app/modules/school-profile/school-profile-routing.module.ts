import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolProfileComponent } from './school-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolProfileRoutingModule { }
