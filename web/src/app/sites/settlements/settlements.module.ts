import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettlementsComponent } from './settlements.component';

@NgModule({
    declarations: [
        SettlementsComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: SettlementsComponent }
        ])
    ]
})
export class SettlementsModule {}
