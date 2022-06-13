import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpetmodalPage } from './editpetmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EditpetmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpetmodalPageRoutingModule {}
