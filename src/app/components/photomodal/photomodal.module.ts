import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotomodalPageRoutingModule } from './photomodal-routing.module';

import { PhotomodalPage } from './photomodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotomodalPageRoutingModule
  ],
  declarations: [PhotomodalPage]
})
export class PhotomodalPageModule {}
