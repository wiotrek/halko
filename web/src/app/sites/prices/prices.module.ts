import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricesComponent } from './prices.component';

@NgModule({
    declarations: [
        PricesComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: PricesComponent }
        ])
    ]
})
export class PricesModule {}
