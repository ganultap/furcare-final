import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalhistoryPage } from './medicalhistory.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalhistoryPageRoutingModule {}
