import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentShortPageRoutingModule } from './recent-short-routing.module';

import { RecentShortPage } from './recent-short.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentShortPageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [RecentShortPage]
})
export class RecentShortPageModule {}
