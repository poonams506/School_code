import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentsComponent } from './parents/parents.component';
import { AddParentComponent } from './add-parent/add-parent.component';

const routes: Routes = [
  {
    path:"", component:ParentsComponent
  },
  {path:'add-edit-parent', component:AddParentComponent},
  {
    path: 'add-edit-parent/:parentRouteParameter',
    component: AddParentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
