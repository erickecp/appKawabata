import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunicadosPage } from './comunicados.page';

const routes: Routes = [
  {
    path: '',
    component: ComunicadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunicadosPageRoutingModule {}
