import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortDetailPage } from './short-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ShortDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortDetailPageRoutingModule {}
