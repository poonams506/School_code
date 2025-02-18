import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarEventDetailModalComponent } from './calendar-event-detail-modal/calendar-event-detail-modal.component';


@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    IonicModule
  ],
  declarations: [CalendarComponent,CalendarEventDetailModalComponent]
})
export class CalendarModule { }
