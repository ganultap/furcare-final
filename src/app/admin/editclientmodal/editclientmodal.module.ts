import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditclientmodalPageRoutingModule } from './editclientmodal-routing.module';

import { EditclientmodalPage } from './editclientmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditclientmodalPageRoutingModule
  ],
  declarations: [EditclientmodalPage]
})
export class EditclientmodalPageModule {}
