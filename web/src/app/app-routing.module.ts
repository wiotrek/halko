import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/_guards/auth.guard';
import { MainComponent } from './sites/main/main.component';
import { SitesComponent } from './sites/sites.component';
import { AdminGuard } from './auth/_guards/admin.guard';
import { PointGuard } from './auth/_guards/point.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: SitesComponent,
    children: [
      {
        path: '',
        canActivate: [ PointGuard ],
        component: MainComponent
      },
      {
        path: 'telefony',
        canActivate: [ PointGuard ],
        loadChildren: () => import('./sites/phones/phones.module').then(m => m.PhonesModule)
      },
      {
        path: 'serwis',
        canActivate: [ PointGuard ],
        loadChildren: () => import('./sites/repairs/repairs.module').then(m => m.RepairsModule)
      },
      {
        path: 'cennik',
        canActivate: [ PointGuard ],
        loadChildren: () => import('./sites/prices/prices.module').then(m => m.PricesModule)
      },
      {
        path: 'admin',
        canActivate: [ AdminGuard ],
        loadChildren: () => import('./sites/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'logowanie',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
