import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentComponent } from './student.component';


@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    IonicModule,],
  declarations: [StudentComponent]

})
export class StudentModule { }
