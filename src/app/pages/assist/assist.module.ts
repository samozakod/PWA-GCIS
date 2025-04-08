import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistPage } from './assist.page';
import { AssistPageRoutingModule } from './assist-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AssistPageRoutingModule
  ],
  declarations: [AssistPage]
})
export class AssistPageModule {}
