import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        LoadingSpinnerComponent,
        DropdownDirective,
        FormsModule,
    ]
})
export class SharedModule {}
