import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { editTreatmentsheetPage } from './edittreatmentsheetmodal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [editTreatmentsheetPage]
})
export class EditTreatmentsheetPageModule {}
