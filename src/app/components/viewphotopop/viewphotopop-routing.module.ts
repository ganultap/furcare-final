import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewphotopopPage } from './viewphotopop.page';

const routes: Routes = [
  {
    path: '',
    component: ViewphotopopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewphotopopPageRoutingModule {}
