import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleModalPage } from './schedule-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleModalPageRoutingModule {}
