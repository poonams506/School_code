import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { SchoolHolidayComponent } from './school-holiday/school-holiday.component';
import { AddEditSchoolHolidayComponent } from './add-edit-school-holiday/add-edit-school-holiday.component';
import { SchoolEventComponent } from './school-event/school-event.component';
import { AddEditSchoolEventComponent } from './add-edit-school-event/add-edit-school-event.component';
import { AddEditSchoolVacationComponent } from './add-edit-school-vacation/add-edit-school-vacation.component';

const routes: Routes = [
  {
    path:"", component:SchoolCalendarComponent
  },
  {
    path:"school-event", component:SchoolEventComponent
  },
  {
    path:"add-edit-school-holiday", component:AddEditSchoolEventComponent
  },
  {
    path:"school-holiday", component:SchoolHolidayComponent
  },
  {
    path:"add-edit-school-holiday", component:AddEditSchoolHolidayComponent
  },
  {
    path:"add-edit-school-vacation", component:AddEditSchoolVacationComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolCalendarRoutingModule { }
