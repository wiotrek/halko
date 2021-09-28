import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PricesComponent } from './view/prices.component';

@NgModule({
    declarations: [ PricesComponent ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: PricesComponent }
        ])
    ]
})
export class PricesModule {}
