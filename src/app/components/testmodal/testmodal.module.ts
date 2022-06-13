import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { NgxPaginationModule } from 'ngx-pagination';
import { TestmodalPageRoutingModule } from './testmodal-routing.module';

import { TestmodalPage } from './testmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestmodalPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [TestmodalPage]
})
export class TestmodalPageModule {}
