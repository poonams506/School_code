import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DropPageRoutingModule } from './drop-page-routing.module';
import { DropPage} from './drop.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DropPage],
})
export class DropPageModule {}
