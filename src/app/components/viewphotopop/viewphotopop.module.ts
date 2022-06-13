import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewphotopopPageRoutingModule } from './viewphotopop-routing.module';

import { ViewphotopopPage } from './viewphotopop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewphotopopPageRoutingModule
  ],
  declarations: [ViewphotopopPage]
})
export class ViewphotopopPageModule {}
