import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './sites/main/main.component';
import { SitesComponent } from './sites/sites.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SitesComponent,
        children: [
            { path: '', component: MainComponent },
            {
                path: 'telefony',
                loadChildren: () => import('./sites/phones/phones.module').then(m => m.PhonesModule)
            },
            {
                path: 'serwis',
                loadChildren: () => import('./sites/repairs/repairs.module').then(m => m.RepairsModule)
            },
            {
                path: 'cennik',
                loadChildren: () => import('./sites/prices/prices.module').then(m => m.PricesModule)
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
