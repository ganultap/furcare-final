import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceModalPageRoutingModule } from './service-modal-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { NgxPaginationModule } from 'ngx-pagination';

import { ServiceModalPage } from './service-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceModalPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [ServiceModalPage]
})
export class ServiceModalPageModule {}
