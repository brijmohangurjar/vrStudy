import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPage } from './books.page';

const routes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'page-list/:bookId',
    loadChildren: () => import('../page-list/page-list.module').then(m => m.PageListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPageRoutingModule { }
