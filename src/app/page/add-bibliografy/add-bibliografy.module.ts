import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBibliografyPageRoutingModule } from './add-bibliografy-routing.module';

import { AddBibliografyPage } from './add-bibliografy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddBibliografyPageRoutingModule
  ],
  declarations: [AddBibliografyPage]
})
export class AddBibliografyPageModule {}
