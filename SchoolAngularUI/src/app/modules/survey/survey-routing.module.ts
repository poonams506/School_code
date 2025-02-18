import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { AddEditSurveyComponent } from './add-edit-survey/add-edit-survey.component';

const routes: Routes = [{path:"", component:SurveyComponent},
{path:"add-edit-survey", component:AddEditSurveyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
