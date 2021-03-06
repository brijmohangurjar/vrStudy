import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, IsLoggedInGuard } from './guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'base',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/base/base.module').then(m => m.BasePageModule)
  },
  {
    path: 'forgot-password',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'page-list',
    loadChildren: () => import('./modules/page-list/page-list.module').then( m => m.PageListPageModule)
  },
  {
    path: 'note-detail',
    loadChildren: () => import('./modules/note-detail/note-detail.module').then( m => m.NoteDetailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
