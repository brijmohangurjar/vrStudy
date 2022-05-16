import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard';
import { BasePage } from './base.page';

const routes: Routes = [
  {
    path: '', component: BasePage,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      // {
      //   path: 'help',
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('../help/help.module').then(m => m.HelpPageModule)
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasePageRoutingModule { }
