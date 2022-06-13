import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditclientmodalPage } from './editclientmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EditclientmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditclientmodalPageRoutingModule {}
