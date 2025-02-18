import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClerkComponent } from './clerk/clerk.component';
import { AddClerkComponent } from './add-clerk/add-clerk.component';

const routes: Routes = [
  {path:'', component:ClerkComponent},
  {path:'add-edit-clerk', component:AddClerkComponent},
  {
    path: 'add-edit-clerk/:clerkRouteParameter',
    component: AddClerkComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
