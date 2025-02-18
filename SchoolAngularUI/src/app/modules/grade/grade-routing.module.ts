import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeListingComponent } from './grade-listing/grade-listing.component';
import { GradeDivisionMatrixComponent } from './grade-division-matrix/grade-division-matrix.component';


const routes: Routes = [
  {
    path: '',
    component: GradeListingComponent
  },
  {
    path: 'grade-division-matrix',
    component: GradeDivisionMatrixComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
