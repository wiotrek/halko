import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminMainComponent } from './view/admin-main/admin-main.component';
import { AdminSettingsComponent } from './view/admin-settings/admin-settings.component';
import { AdminComponent } from './view/admin.component';
import { PointsMgmtComponent } from './view/admin-settings/points-mgmt/points-mgmt.component';
import { AdminsMgmtComponent } from './view/admin-settings/admins-mgmt/admins-mgmt.component';
import { ParticipantsMgmtComponent } from './view/admin-settings/participants-mgmt/participants-mgmt.component';
import { StatisticsMgmtComponent } from './view/admin-settings/statistics-mgmt/statistics-mgmt.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminMainComponent,
        AdminSettingsComponent,
        PointsMgmtComponent,
        ParticipantsMgmtComponent,
        AdminsMgmtComponent,
        StatisticsMgmtComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    {path: '', component: AdminMainComponent},
                    {
                        path: 'ustawienia',
                        component: AdminSettingsComponent,
                        children: [
                            {path: '', redirectTo: 'punkty'},
                            {path: 'punkty', component: PointsMgmtComponent},
                            {path: 'pracownicy', component: ParticipantsMgmtComponent},
                            {path: 'admini', component: AdminsMgmtComponent},
                            {path: 'statystyki', component: StatisticsMgmtComponent}
                        ]
                    }
                ]
            }
        ])
    ]
})
export class AdminModule {}
