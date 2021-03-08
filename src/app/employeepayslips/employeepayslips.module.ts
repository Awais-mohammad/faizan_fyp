import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeepayslipsPageRoutingModule } from './employeepayslips-routing.module';

import { EmployeepayslipsPage } from './employeepayslips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeepayslipsPageRoutingModule
  ],
  declarations: [EmployeepayslipsPage]
})
export class EmployeepayslipsPageModule {}
