import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { AddEditAreaComponent } from './add-edit-area/add-edit-area.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { RouteComponent } from './route/route.component';
import { TrackBusesComponent } from './track-buses/track-buses.component';

const routes: Routes = [
  {
    path:'', component:AreaComponent
  },
  {
    path:'vehicle', component:VehicleComponent
  },
  {
    path:'add-edit-vehicle', component:AddEditVehicleComponent
  },
  {
    path:'add-edit-vehicle/:vehicleId', component:AddEditVehicleComponent
  },
  {
    path:'area', component:AreaComponent
  },
  {
    path:'route', component:RouteComponent
  },
  {
    path:'track-buses', component :TrackBusesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
