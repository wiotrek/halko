import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MainComponent } from './main/main.component';
import { SitesComponent } from './sites.component';

const routes: Routes = [
    {
        path: 'zarzadzaj',
        canActivate: [AuthGuard],
        component: SitesComponent,
        children: [
            { path: '', component: MainComponent },
            {
                path: 'telefony',
                loadChildren: () => import('./phones/phones.module').then(m => m.PhonesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SitesRoutingModule {}
