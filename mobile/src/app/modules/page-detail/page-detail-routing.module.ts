import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDetailPage } from './page-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PageDetailPage
  },
  {
    path: 'short/:bookId',
    loadChildren: () => import('../recent-short/recent-short.module').then(m => m.RecentShortPageModule)
  },
  // {
  //   path: 'note-detail/:bookId',
  //   loadChildren: () => import('../note/note.module').then(m => m.NotePageModule)
  // },
  {
    path: 'note/:bookId',
    loadChildren: () => import('../note/note.module').then(m => m.NotePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDetailPageRoutingModule { }
