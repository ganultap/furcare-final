import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetdashboardPage } from './petdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PetdashboardPage
  },
  {
    path: 'editpetmodal',
    loadChildren: () => import('./editpetmodal/editpetmodal.module').then( m => m.EditpetmodalPageModule)
  },
  {
    path: 'addpet',
    loadChildren: () => import('./addpet/addpet.module').then( m => m.AddpetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetdashboardPageRoutingModule {}
