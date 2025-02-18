import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectLoginRoleComponent } from './select-login-role.component';

const routes: Routes = [{path:'', component:SelectLoginRoleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectLoginRoleRoutingModule { }
