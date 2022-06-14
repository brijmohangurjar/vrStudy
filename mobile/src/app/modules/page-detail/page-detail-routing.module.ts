import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDetailPage } from './page-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PageDetailPage
  },
  {
    path: 'short-detail/:bookId',
    loadChildren: () => import('../short-detail/short-detail.module').then(m => m.ShortDetailPageModule)
  },
  {
    path: 'note-detail/:bookId',
    loadChildren: () => import('../note/note.module').then(m => m.NotePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDetailPageRoutingModule { }
