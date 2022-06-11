import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicPage } from './topic.page';

const routes: Routes = [
  {
    path: '',
    component: TopicPage
  },
  {
    path: 'book/:topicId',
    loadChildren: () => import('../books/books.module').then(m => m.BooksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicPageRoutingModule { }
