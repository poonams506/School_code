import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportFeesComponent } from './transport-fees/transport-fees.component';

const routes: Routes = [{path:'', component:TransportFeesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportFeesRoutingModule { }
