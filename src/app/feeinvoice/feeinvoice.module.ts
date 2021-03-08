import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeinvoicePageRoutingModule } from './feeinvoice-routing.module';

import { FeeinvoicePage } from './feeinvoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeinvoicePageRoutingModule
  ],
  declarations: [FeeinvoicePage]
})
export class FeeinvoicePageModule {}
