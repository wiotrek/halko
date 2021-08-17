import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { LaPaginationComponent } from './components/la-pagination/la-pagination';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective,
        LaPaginationComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule,
        ToastrModule.forRoot()
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule,
        LoadingSpinnerComponent,
        DropdownDirective,
        LaPaginationComponent
    ]
})
export class SharedModule {}
