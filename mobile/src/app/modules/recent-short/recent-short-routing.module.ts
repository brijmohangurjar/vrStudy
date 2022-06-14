import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentShortPage } from './recent-short.page';

const routes: Routes = [
  {
    path: '',
    component: RecentShortPage
  },
  {
    path: 'short-detail/:bookId',
    loadChildren: () => import('../short-detail/short-detail.module').then(m => m.ShortDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentShortPageRoutingModule { }
