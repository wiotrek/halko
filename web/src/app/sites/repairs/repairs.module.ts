import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepairsComponent } from './repairs.component';

@NgModule({
    declarations: [
        RepairsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: RepairsComponent
            }
        ]),
    ]
})
export class RepairsModule {}
