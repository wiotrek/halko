import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepairsAddComponent } from './repairs-add/reapirs-add.component';
import { RepairsArchivComponent } from './repairs-archiv/repairs-archiv.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';
import { RepairsComponent } from './repairs.component';

@NgModule({
    declarations: [
        RepairsComponent,
        RepairsListComponent,
        RepairsAddComponent,
        RepairsArchivComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: RepairsComponent,
                children: [
                    { path: '', component: RepairsListComponent },
                    { path: 'archiwum', component: RepairsArchivComponent },
                    { path: 'dodaj-serwis', component: RepairsAddComponent }
                ]
            }
        ]),
    ]
})
export class RepairsModule {}
