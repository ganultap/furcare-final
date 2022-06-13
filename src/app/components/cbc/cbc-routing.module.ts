import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbcPage } from './cbc.page';

const routes: Routes = [
  {
    path: '',
    component: CbcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbcPageRoutingModule {}
