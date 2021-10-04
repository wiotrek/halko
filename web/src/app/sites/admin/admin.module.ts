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
          {
            path: 'cennik',
            loadChildren: () =>
              import('src/app/sites/prices/prices.module').then(m => m.PricesModule)
          },
        ]
      }
    ])
  ]
})
export class AdminModule {}
