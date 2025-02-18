
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';

@NgModule({
  imports: [
    CommonModule,
    TimetableRoutingModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TimetableComponent],
})
export class TimetableModule { }

