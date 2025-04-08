import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'Explore',
        loadChildren: () => import('../pages/explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path: 'Enjoy',
        loadChildren: () => import('../pages/entertain/entertain.module').then(m => m.EntertainPageModule)
      },
      {
        path: 'Help',
        loadChildren: () => import('../pages/assist/assist.module').then(m => m.AssistPageModule)
      },

      {
        path: '',
        redirectTo: '/pages/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
