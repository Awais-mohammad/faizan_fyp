import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPanelPageRoutingModule } from './students-panel-routing.module';

import { StudentsPanelPage } from './students-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPanelPageRoutingModule
  ],
  declarations: [StudentsPanelPage]
})
export class StudentsPanelPageModule {}
