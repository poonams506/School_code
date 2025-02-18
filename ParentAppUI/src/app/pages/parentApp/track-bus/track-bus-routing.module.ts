import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackBusComponent } from './track-bus.component';

const routes: Routes = [
  {path:'', component:TrackBusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackBusRoutingModule { }
