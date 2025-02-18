import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavingCertificateComponent } from './leaving-certificate/leaving-certificate.component';
import { BonafiedCertificateComponent } from './bonafied-certificate/bonafied-certificate.component';
import { CharacterCertificateComponent } from './character-certificate/character-certificate.component';
import { IdCardComponent } from './id-card/id-card.component';
import { ViewHistoryLeavingcertificateComponent } from './leaving-certificate/view-history-leavingcertificate/view-history-leavingcertificate.component';

const routes: Routes = [
  {path:'student-leaving-certificate', component:LeavingCertificateComponent},
  {path:'student-bonafied-certificate', component:BonafiedCertificateComponent},
  {path:'student-health-certificate', component:BonafiedCertificateComponent},
  {path:'student-character-certificate', component:CharacterCertificateComponent},
  {path:'student-idcard-certificate', component:IdCardComponent},
  {path:'student-leaving-certificate/view-history-leavingcertificate', component:ViewHistoryLeavingcertificateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCertificatesRoutingModule { }
