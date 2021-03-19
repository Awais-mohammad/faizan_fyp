import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherPanelPage } from './teacher-panel.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherPanelPageRoutingModule {}
