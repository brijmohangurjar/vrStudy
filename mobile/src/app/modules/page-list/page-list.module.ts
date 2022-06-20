import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageListPageRoutingModule } from './page-list-routing.module';

import { PageListPage } from './page-list.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageListPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [PageListPage]
})
export class PageListPageModule {}
