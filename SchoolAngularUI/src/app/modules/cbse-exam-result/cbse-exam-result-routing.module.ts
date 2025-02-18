import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbseExamResultComponent } from './cbse-exam-result/cbse-exam-result.component';

const routes: Routes = [
  {path:"", component:CbseExamResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbseExamResultRoutingModule { }
