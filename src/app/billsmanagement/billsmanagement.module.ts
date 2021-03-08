import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsmanagementPageRoutingModule } from './billsmanagement-routing.module';

import { BillsmanagementPage } from './billsmanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsmanagementPageRoutingModule
  ],
  declarations: [BillsmanagementPage]
})
export class BillsmanagementPageModule {}
