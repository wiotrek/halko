import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminMainComponent } from './view/admin-main/admin-main.component';
import { AdminComponent } from './view/admin.component';
import { PointsMgmtComponent } from './view/points-mgmt/points-mgmt.component';
import { AdminsMgmtComponent } from './view/admins-mgmt/admins-mgmt.component';
import { ParticipantsMgmtComponent } from './view/participants-mgmt/participants-mgmt.component';
import { StatisticsMgmtComponent } from './view/statistics-mgmt/statistics-mgmt.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminMainComponent,
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
                    { path: '', component: AdminMainComponent },
                    {path: 'punkty', component: PointsMgmtComponent},
                    {path: 'pracownicy', component: ParticipantsMgmtComponent},
                    {path: 'admini', component: AdminsMgmtComponent},
                    {path: 'statystyki', component: StatisticsMgmtComponent}
                ]
            }
        ])
    ]
})
export class AdminModule {}
