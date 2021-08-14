import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RepairsComponent } from './repairs.component';

@NgModule({
    declarations: [
        RepairsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: RepairsComponent
            }
        ]),
    ]
})
export class RepairsModule {}
