import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { PromoteStudentComponent } from './promote-student/promote-student.component';
import { UpdateStudentResultsComponent } from './update-student-results/update-student-results.component';
import { ImportStudentsFileComponent } from './import-students-file/import-students-file.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { AddEditStudentEnquiryComponent } from './add-edit-student-enquiry/add-edit-student-enquiry.component';
import { RegistrationFeePaymentComponent } from '../registration-fee-management/registration-fee-payment/registration-fee-payment.component';
import { RegistrationFeeHistoryComponent } from '../registration-fee-management/registration-fee-history/registration-fee-history.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'view-student',
    component: ViewStudentComponent
  },

  {
    path: 'add-edit-student/:studentRouteParameter',
    component: AddEditStudentComponent
  },
  {
    path: 'add-edit-student',
    component: AddEditStudentComponent
  },

  {
    path: 'promote-student',
    component: PromoteStudentComponent
  },
  {
    path: 'update-student-result',
    component: UpdateStudentResultsComponent
  },
  {
    path: 'import-students-file',
    component: ImportStudentsFileComponent
  },
  {
    path: 'student-report',
    component: StudentReportComponent
  },
  {
    path: 'student-enquiry',
    component: StudentEnquiryComponent
  },
  {
    path:'add-edit-student-enquiry', component:AddEditStudentEnquiryComponent
  },
  {
    path:'add-edit-student-enquiry/:studentEnquiryId', component:AddEditStudentEnquiryComponent
  },
  {
    path:'registration-fee-payment', component:RegistrationFeePaymentComponent
  },
  {
    path:'registration-fee-payment/:studentRouteParameter', component:RegistrationFeePaymentComponent
  },
  {
    path:'registration-fee-history/:studentRouteParameter', component:RegistrationFeeHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
