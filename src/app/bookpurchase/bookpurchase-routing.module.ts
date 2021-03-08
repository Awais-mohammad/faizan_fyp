import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookpurchasePage } from './bookpurchase.page';

const routes: Routes = [
  {
    path: '',
    component: BookpurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookpurchasePageRoutingModule {}
