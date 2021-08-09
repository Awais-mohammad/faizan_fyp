import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelHomePage } from './panel-home.page';

const routes: Routes = [
  {
    path: '',
    component: PanelHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelHomePageRoutingModule {}
