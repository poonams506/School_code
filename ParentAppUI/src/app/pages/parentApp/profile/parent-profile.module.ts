import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentProfilePageRoutingModule } from './parent-profile-routing.module';

import { ParentProfilePage } from './parent-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParentProfilePage]
})
export class ParentProfilePageModule {}
