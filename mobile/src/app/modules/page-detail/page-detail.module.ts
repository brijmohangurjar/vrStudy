import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDetailPageRoutingModule } from './page-detail-routing.module';

import { PageDetailPage } from './page-detail.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageDetailPageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [PageDetailPage]
})
export class PageDetailPageModule { }
