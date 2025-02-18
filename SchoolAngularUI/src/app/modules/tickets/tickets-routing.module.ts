import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TickestComponent } from './tickest.component';

const routes: Routes = [
  { path: '', component: TickestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
