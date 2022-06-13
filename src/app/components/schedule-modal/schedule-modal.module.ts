import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';

import { ScheduleModalPageRoutingModule } from './schedule-modal-routing.module';

import { ScheduleModalPage } from './schedule-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleModalPageRoutingModule,
    NgCalendarModule,

  ],
  declarations: [ScheduleModalPage]
})
export class ScheduleModalPageModule {}
