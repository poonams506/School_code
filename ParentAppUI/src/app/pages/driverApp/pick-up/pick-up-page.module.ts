import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PickUpPageRoutingModule } from './pick-up-page-routing.module';
import { PickUpPage } from './pick-up.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpPageRoutingModule,
    ReactiveFormsModule
   
  ],
  declarations: [PickUpPage]
})
export class PickUpPageModule {}
