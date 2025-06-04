import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntertainPage } from './entertain.page';

import { EntertainPageRoutingModule } from './entertain-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EntertainPageRoutingModule,
  ],
})
export class EntertainPageModule {}
