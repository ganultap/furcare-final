import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotomodalPage } from './photomodal.page';

const routes: Routes = [
  {
    path: '',
    component: PhotomodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotomodalPageRoutingModule {}
