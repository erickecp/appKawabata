import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ImageGuard } from 'src/app/guards/image.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [ImageGuard],
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [ImageGuard],
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [ImageGuard],
      },
      {
        path: 'comunicados',
        loadChildren: () => import('../comunicados/comunicados.module').then(m => m.ComunicadosPageModule),
        canActivate: [ImageGuard],
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),

      },
      {
        path: 'recoger',
        loadChildren: () => import('../recogerqr/recogerqr.module').then(m => m.RecogerqrPageModule),
        canActivate: [ImageGuard],
      },
      {
        path: 'leerqr',
        loadChildren: () => import('../leerqr/leerqr.module').then(m => m.LeerqrPageModule),
        canActivate: [ImageGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
