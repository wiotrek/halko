import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminMainComponent } from './view/admin-main/admin-main.component';
import { AdminComponent } from './view/admin.component';
import { PointsMgmtComponent } from './view/points-mgmt/points-mgmt.component';
import { ParticipantsMgmtComponent } from './view/participants-mgmt/participants-mgmt.component';
import { StatisticsMgmtComponent } from './view/statistics-mgmt/statistics-mgmt.component';
import { ParticipantsAddComponent } from './view/participants-mgmt/participants-add/participants-add.component';
import { AdminAddComponent } from './view/participants-mgmt/admin-add/admin-add.component';
import { ParticipantsListComponent } from './view/participants-mgmt/participants-list/participants-list.component';
import {PricesComponent} from 'src/app/sites/prices/view/prices.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminMainComponent,
        PointsMgmtComponent,
        ParticipantsMgmtComponent,
        ParticipantsAddComponent,
        ParticipantsListComponent,
        AdminAddComponent,
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
                    { path: 'cennik', component: PricesComponent },
                    { path: 'punkty', component: PointsMgmtComponent},
                    {
                        path: 'pracownicy',
                        component: ParticipantsMgmtComponent,
                        children: [
                            { path: '', component: ParticipantsListComponent },
                            { path: 'dodaj-pracownika', component: ParticipantsAddComponent },
                            { path: 'dodaj-admina', component: AdminAddComponent }
                        ]
                    },
                ]
            }
        ])
    ]
})
export class AdminModule {}
