import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolUserListingComponent } from './school-user-listing/school-user-listing.component';

const routes: Routes = [
  {path:'', component:SchoolUserListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolUsersRoutingModule { }
