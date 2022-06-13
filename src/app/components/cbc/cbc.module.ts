import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbcPageRoutingModule } from './cbc-routing.module';

import { CbcPage } from './cbc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbcPageRoutingModule
  ],
  declarations: [CbcPage]
})
export class CbcPageModule {}
