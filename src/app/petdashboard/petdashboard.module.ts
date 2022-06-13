import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetdashboardPageRoutingModule } from './petdashboard-routing.module';

import { PetdashboardPage } from './petdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetdashboardPageRoutingModule
  ],
  declarations: [PetdashboardPage]
})
export class PetdashboardPageModule {}
