import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { CabDriverComponent } from './cab-driver/cab-driver.component';

const routes: Routes = [
  {path:'', component:CabDriverComponent},
  {path:'add-edit-driver', component:AddDriverComponent},
  {
    path: 'add-edit-driver/:cabDriverRouteParameter',
    component: AddDriverComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabDriverRoutingModule { }
