import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeinvoicePage } from './feeinvoice.page';

const routes: Routes = [
  {
    path: '',
    component: FeeinvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeinvoicePageRoutingModule {}
