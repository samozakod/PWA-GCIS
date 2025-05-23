import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistPage } from './assist.page';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./assist.page').then(m => m.AssistPage),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistPageRoutingModule {}
