import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherPanelPageRoutingModule } from './teacher-panel-routing.module';

import { TeacherPanelPage } from './teacher-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPanelPageRoutingModule
  ],
  declarations: [TeacherPanelPage]
})
export class TeacherPanelPageModule {}
