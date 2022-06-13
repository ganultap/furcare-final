import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpetmodalPageRoutingModule } from './editpetmodal-routing.module';

import { EditpetmodalPage } from './editpetmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpetmodalPageRoutingModule
  ],
  declarations: [EditpetmodalPage]
})
export class EditpetmodalPageModule {}
