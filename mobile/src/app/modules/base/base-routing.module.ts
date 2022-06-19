import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePage } from './base.page';

const routes: Routes = [
  {
    path: '',
    component: BasePage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasePageRoutingModule { }
