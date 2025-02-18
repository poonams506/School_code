import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { AreaComponent } from './area/area.component';
import { AddEditAreaComponent } from './add-edit-area/add-edit-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { RouteComponent } from './route/route.component';
import { AddEditStoppageComponent } from './add-edit-stoppage/add-edit-stoppage.component';
import { AddEditRouteComponent } from './add-edit-route/add-edit-route.component';
import { TreeviewModule } from '@zerot13/ngx-treeview';
import { AddStoppageConsumerMappingComponent } from './add-stoppage-consumer-mapping/add-stoppage-consumer-mapping.component';
import { EditStoppageConsumerMappingComponent } from './edit-stoppage-consumer-mapping/edit-stoppage-consumer-mapping.component';
import { TrackBusesComponent } from './track-buses/track-buses.component';
import { MapComponent } from './track-buses/map/map.component';


@NgModule({
  declarations: [
    AreaComponent,
    AddEditAreaComponent,
    VehicleComponent,
    AddEditVehicleComponent,
    AddEditAreaComponent,
    RouteComponent,
    AddEditStoppageComponent,
    AddEditRouteComponent,
    AddStoppageConsumerMappingComponent,
    EditStoppageConsumerMappingComponent,
    TrackBusesComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    FormsModule, 
   NgbModule,
   TranslateModule,
   NgxDropzoneModule,
   NgSelectModule,
   DataTablesModule,
   NgbAccordionModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   TreeviewModule.forRoot()
  ]
})
export class TransportModule { }
