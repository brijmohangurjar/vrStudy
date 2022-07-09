import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { LoadingComponent } from './loading/loading.component';
import { LocalSearchComponent } from './local-search/local-search.component';
import { RouterModule } from '@angular/router';
import { ViewImageComponent } from './view-image/view-image.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NoDataFoundComponent,
    LoadingComponent,
    LocalSearchComponent,
    ViewImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NoDataFoundComponent,
    LoadingComponent,
    LocalSearchComponent
  ]
})
export class SharedModuleModule { }
