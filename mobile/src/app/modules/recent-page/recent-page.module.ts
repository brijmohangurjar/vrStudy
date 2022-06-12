import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPagePageRoutingModule } from './recent-page-routing.module';

import { RecentPagePage } from './recent-page.page';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPagePageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [RecentPagePage]
})
export class RecentPagePageModule {}
