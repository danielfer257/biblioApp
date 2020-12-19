import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBibliografyPage } from './add-bibliografy.page';

const routes: Routes = [
  {
    path: '',
    component: AddBibliografyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBibliografyPageRoutingModule {}
