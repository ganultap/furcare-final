import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  },

  {
    path: 'petdashboard',
    loadChildren: () => import('../petdashboard/petdashboard.module').then( m => m.PetdashboardPageModule)
  },
  {
    path: 'schedule-modal',
    loadChildren: () => import('../components/schedule-modal/schedule-modal.module').then( m => m.ScheduleModalPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('../components/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'treatmentsheet',
    loadChildren: () => import('../components/treatmentsheet/treatmentsheet.module').then( m => m.TreatmentsheetPageModule)
  },
  {
    path: 'medicalhistory',
    loadChildren: () => import('../components/medicalhistory/medicalhistory.module').then( m => m.MedicalhistoryPageModule)
  },
  {
    path: 'manage-users',
    loadChildren: () => import('../manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('../reports/reports.module').then( m => m.ReportsPageModule)
  },
 
  



];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
