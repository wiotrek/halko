import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepairsAddComponent } from './repairs-add/reapirs-add.component';
import { RepairsArchiveComponent } from './repairs-archive/repairs-archive.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';
import { RepairsComponent } from './repairs.component';

@NgModule({
  declarations: [
    RepairsComponent,
    RepairsListComponent,
    RepairsAddComponent,
    RepairsArchiveComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RepairsComponent,
        children: [
          {path: '', component: RepairsListComponent},
          {path: 'archiwum', component: RepairsArchiveComponent},
          {path: 'dodaj-serwis', component: RepairsAddComponent}
        ]
      }
    ])
  ]
})
export class RepairsModule {
}
