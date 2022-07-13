import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListPage } from './page-list.page';

const routes: Routes = [
  {
    path: '',
    component: PageListPage
  },
  {
    path: 'page-detail/:pageId',
    loadChildren: () => import('../page-detail/page-detail.module').then(m => m.PageDetailPageModule)
  },
  {
    path: 'note/:bookId',
    loadChildren: () => import('../note/note.module').then(m => m.NotePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListPageRoutingModule { }
