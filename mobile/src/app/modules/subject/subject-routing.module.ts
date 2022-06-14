import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectPage } from './subject.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectPage,
  },
  {
    path: 'topic/:subjectId',
    loadChildren: () => import('../topic/topic.module').then(m => m.TopicPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectPageRoutingModule { }
