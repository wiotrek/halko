import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [AuthComponent,
        LoadingSpinnerComponent],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ])
    ]
})
export class AuthModule {}
