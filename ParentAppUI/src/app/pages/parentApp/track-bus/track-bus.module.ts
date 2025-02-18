import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrackBusRoutingModule } from './track-bus-routing.module';
import { TrackBusComponent } from './track-bus.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [TrackBusComponent,MapComponent],
  imports: [
    CommonModule,
    TrackBusRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class TrackBusModule { }
