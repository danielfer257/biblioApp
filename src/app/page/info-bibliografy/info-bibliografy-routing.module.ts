import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoBibliografyPage } from './info-bibliografy.page';

const routes: Routes = [
  {
    path: '',
    component: InfoBibliografyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoBibliografyPageRoutingModule {}
