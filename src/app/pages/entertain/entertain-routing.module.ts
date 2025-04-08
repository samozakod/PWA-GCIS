import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntertainPage } from './entertain.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntertainPageRoutingModule {}
