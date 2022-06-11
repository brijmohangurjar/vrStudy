import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { SafeHtmlPipe } from 'src/app/api-services/safe-html/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModuleModule
  ],
  declarations: [HomePage, SafeHtmlPipe],
  providers: [SafeHtmlPipe]
})
export class HomePageModule { }
