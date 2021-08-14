import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { ItemComponent } from './components/item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective,
        ItemComponent
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
        ItemComponent
    ]
})
export class SharedModule {}
