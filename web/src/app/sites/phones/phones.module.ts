import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhonesAddComponent } from './phones-add/phones-add.component';
import { PhonesListArchiveComponent } from './phones-list-archive/phones-list-archive.component';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhonesComponent } from './phones.component';

@NgModule({
    declarations: [
        PhonesComponent,
        PhonesListComponent,
        PhonesListArchiveComponent,
        PhonesAddComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PhonesComponent,
                children: [
                    {path: '', component: PhonesListComponent},
                    {path: 'archiwum', component: PhonesListArchiveComponent},
                    {path: 'dodaj-telefon', component: PhonesAddComponent}
                ]
            }
        ])
    ]
})
export class PhonesModule {}
