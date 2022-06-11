import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'topic/:subjectId',
    loadChildren: () => import('../../modules/topic/topic.module').then(m => m.TopicPageModule)
    // loadChildren: () => import('../../modules/subject/subject.module').then(m => m.SubjectPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
