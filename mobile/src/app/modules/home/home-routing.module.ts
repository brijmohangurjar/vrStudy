import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'book',
    loadChildren: () => import('../../modules/books/books.module').then(m => m.BooksPageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('../../modules/subject/subject.module').then(m => m.SubjectPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
