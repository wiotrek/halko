import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PricesComponent} from './prices.component';
import {PricesListComponent} from './prices-list/prices-list.component';

@NgModule({
    declarations: [
        PricesComponent,
        PricesListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: PricesComponent }
        ])
    ]
})
export class PricesModule {}
