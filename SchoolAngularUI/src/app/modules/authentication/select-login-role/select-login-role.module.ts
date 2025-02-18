import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectLoginRoleRoutingModule } from './select-login-role-routing.module';
import { SelectLoginRoleComponent } from './select-login-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SelectLoginRoleComponent
  ],
  imports: [
    CommonModule,
    SelectLoginRoleRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule
  ]
})
export class SelectLoginRoleModule { }
