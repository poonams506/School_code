import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolePageRoutingModule } from './role-routing.module';

import { RolePage } from './role.page';

// Swiper
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolePageRoutingModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  declarations: [RolePage]
})
export class RolePageModule {}
