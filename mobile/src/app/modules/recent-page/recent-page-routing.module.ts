import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentPagePage } from './recent-page.page';

const routes: Routes = [
  {
    path: '',
    component: RecentPagePage
  },
  {
    path: 'page-detail/:bookId',
    loadChildren: () => import('../page-detail/page-detail.module').then(m => m.PageDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentPagePageRoutingModule { }
