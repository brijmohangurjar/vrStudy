import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortDetailPageRoutingModule } from './short-detail-routing.module';

import { ShortDetailPage } from './short-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortDetailPageRoutingModule
  ],
  declarations: [ShortDetailPage]
})
export class ShortDetailPageModule {}
