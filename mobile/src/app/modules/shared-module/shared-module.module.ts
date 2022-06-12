import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NoDataFoundComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NoDataFoundComponent,
  ]
})
export class SharedModuleModule { }
