import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, IsLoggedInGuard } from './guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    // canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/base/base.module').then(m => m.BasePageModule)
  },
  {
    path: 'forgot-password',
    // canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./modules/subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/books/books.module').then( m => m.BooksPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
