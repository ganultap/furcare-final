import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'editclientmodal',
    loadChildren: () => import('./editclientmodal/editclientmodal.module').then( m => m.EditclientmodalPageModule)
  },
  {
    path: 'addclient',
    loadChildren: () => import('./addclient/addclient.module').then( m => m.AddclientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
