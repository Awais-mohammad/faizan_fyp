import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalleriesPage } from './salleries.page';

const routes: Routes = [
  {
    path: '',
    component: SalleriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalleriesPageRoutingModule {}
