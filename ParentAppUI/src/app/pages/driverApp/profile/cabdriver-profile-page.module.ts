import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CabDriverProfilePageRoutingModule } from './cabdriver-profile-page-routing.module';
import { CabDriverProfilePage } from './cabdriver-profile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CabDriverProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CabDriverProfilePage]
})
export class CabDriverProfilePageModule {}
