import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeerqrPage } from './leerqr.page';

const routes: Routes = [
  {
    path: '',
    component: LeerqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeerqrPageRoutingModule {}
