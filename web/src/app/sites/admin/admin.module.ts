import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminMainComponent } from './view/admin-main/admin-main.component';

@NgModule({
    declarations: [
        AdminMainComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminMainComponent
            }
        ]),
    ],
    providers: [
        DatePipe
    ]
})
export class AdminModule {}
