import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { editTreatmentsheetPage } from './edittreatmentsheetmodal.page';

const routes: Routes = [
  {
    path: '',
    component: editTreatmentsheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTreatmentsheetPageRoutingModule {}
