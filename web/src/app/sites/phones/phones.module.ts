import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhonesAddComponent } from './phones-add/phones-add.component';
import { PhonesArchivComponent } from './phones-archiv/phones-archiv.component';
import { PhonesDetailsComponent } from './phones-list/phones-item/phones-details/phones-details.component';
import { PhonesSoldComponent } from './phones-list/phones-item/phones-details/phones-sold/phones-sold.component';
import { PhonesTransferComponent } from './phones-list/phones-item/phones-details/phones-transfer/phones-transfer.component';
import { PhonesViewEditComponent } from './phones-list/phones-item/phones-details/phones-view-edit/phones-view-edit.component';
import { PhonesItemComponent } from './phones-list/phones-item/phones-item.component';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhonesNavComponent } from './phones-nav/phones-nav.component';
import { PhonesSeacherComponent } from './phones-seacher/phones-seacher.component';
import { PhonesComponent } from './phones.component';

@NgModule({
    declarations: [
        PhonesComponent,
        PhonesItemComponent,
        PhonesSeacherComponent,
        PhonesDetailsComponent,
        PhonesViewEditComponent,
        PhonesSoldComponent,
        PhonesTransferComponent,
        PhonesNavComponent,
        PhonesListComponent,
        PhonesArchivComponent,
        PhonesAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PhonesComponent,
                children: [
                    { path: '', component: PhonesListComponent },
                    { path: 'archiwum', component: PhonesArchivComponent },
                    { path: 'dodaj-telefon', component: PhonesAddComponent }
                ]
            }
        ]),
        FontAwesomeModule,
        SharedModule
    ]
})
export class PhonesModule {}