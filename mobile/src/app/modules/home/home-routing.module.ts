import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../shared-module/search/search.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'topic',
    loadChildren: () => import('../../modules/topic/topic.module').then(m => m.TopicPageModule)
  },
  {
    path: 'topic/:subjectId',
    loadChildren: () => import('../../modules/topic/topic.module').then(m => m.TopicPageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('../../modules/subject/subject.module').then(m => m.SubjectPageModule)
  },
  {
    path: 'recent-page',
    loadChildren: () => import('../../modules/recent-page/recent-page.module').then(m => m.RecentPagePageModule)
  },
  {
    path: 'recent-short',
    loadChildren: () => import('../../modules/recent-short/recent-short.module').then(m => m.RecentShortPageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('../../modules/books/books.module').then(m => m.BooksPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
