import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookpurchasePageRoutingModule } from './bookpurchase-routing.module';

import { BookpurchasePage } from './bookpurchase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookpurchasePageRoutingModule
  ],
  declarations: [BookpurchasePage]
})
export class BookpurchasePageModule {}
