import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelHomePageRoutingModule } from './panel-home-routing.module';

import { PanelHomePage } from './panel-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelHomePageRoutingModule
  ],
  declarations: [PanelHomePage]
})
export class PanelHomePageModule {}
