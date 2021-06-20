import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SitesComponent } from './sites/sites.component';

const routes: Routes = [
  { path: '', redirectTo: '/zarzadzaj', pathMatch: 'full'},
  { path: 'zarzadzaj', component: SitesComponent },
  { path: 'logowanie', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
