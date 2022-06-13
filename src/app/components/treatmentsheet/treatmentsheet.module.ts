import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentsheetPageRoutingModule } from './treatmentsheet-routing.module';

import { TreatmentsheetPage } from './treatmentsheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentsheetPageRoutingModule
  ],
  declarations: [TreatmentsheetPage]
})
export class TreatmentsheetPageModule {}
