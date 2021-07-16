import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MainComponent } from './main/main.component';
import { PhonesComponent } from './phones/phones.component';
import { SitesComponent } from './sites.component';

const routes: Routes = [
    {
        path: 'zarzadzaj',
        canActivate: [AuthGuard],
        component: SitesComponent,
        children: [
            { path: '', component: MainComponent },
            { path: 'spis-telefonów', component: PhonesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SitesRoutingModule {}
