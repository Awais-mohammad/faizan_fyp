import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalleriesPageRoutingModule } from './salleries-routing.module';

import { SalleriesPage } from './salleries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalleriesPageRoutingModule
  ],
  declarations: [SalleriesPage]
})
export class SalleriesPageModule {}
