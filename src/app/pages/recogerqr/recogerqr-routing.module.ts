import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecogerqrPage } from './recogerqr.page';

const routes: Routes = [
  {
    path: '',
    component: RecogerqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecogerqrPageRoutingModule {}
