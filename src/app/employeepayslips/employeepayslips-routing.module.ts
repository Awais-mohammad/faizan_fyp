import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeepayslipsPage } from './employeepayslips.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeepayslipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeepayslipsPageRoutingModule {}
