import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SearchComponent } from '../shared-module/search/search.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModuleModule,
    AutocompleteLibModule,
    PipesModule,
  ],
  declarations: [HomePage, SearchComponent],
  providers: []
})
export class HomePageModule { }
