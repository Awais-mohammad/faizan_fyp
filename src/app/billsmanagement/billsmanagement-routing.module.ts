import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsmanagementPage } from './billsmanagement.page';

const routes: Routes = [
  {
    path: '',
    component: BillsmanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsmanagementPageRoutingModule {}
