import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParentsComponent } from './parents.component';


@NgModule({
  declarations: [ParentsComponent],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ParentsModule { }
