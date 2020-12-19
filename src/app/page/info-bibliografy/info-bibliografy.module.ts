import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoBibliografyPageRoutingModule } from './info-bibliografy-routing.module';

import { InfoBibliografyPage } from './info-bibliografy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InfoBibliografyPageRoutingModule
  ],
  declarations: [InfoBibliografyPage]
})
export class InfoBibliografyPageModule {}
