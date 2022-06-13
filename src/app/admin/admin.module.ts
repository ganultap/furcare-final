import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';

import { AdminPageRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    NgCalendarModule,
    NgxPaginationModule,
    Ng2SearchPipeModule 
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
