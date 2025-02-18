import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';


@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    IonicModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
