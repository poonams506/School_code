import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  {path:'', component:UsersListingComponent},
  {path:'add-edit-admin', component:AddEditUserComponent},
  {
    path: 'add-edit-admin/:adminRouteParameter',
    component: AddEditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
