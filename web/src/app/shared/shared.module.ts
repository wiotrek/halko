import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { LaPaginationComponent } from './components/la-pagination/la-pagination';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { PhoneInListComponent } from './components/phone-in-list/phone-in-list.component';
import { PhoneInListDetailsComponent } from './components/phone-in-list/phone-in-list-details/phone-in-list-details.component';
import { RepairsToArchiveComponent } from './components-specific/repairs-to-archive/repairs-to-archive.component';
import { AdderPhoneComponent } from './components/adder-phone/adder-phone.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { PhonesExtendComponent } from './components-specific/phones-extend/phones-extend.component';
import { HasRoleDirective } from 'src/app/shared/directives/has-role.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    HasRoleDirective,
    LaPaginationComponent,
    SubNavComponent,
    PhoneInListComponent,
    PhoneInListDetailsComponent,
    RepairsToArchiveComponent,
    AdderPhoneComponent,
    SearcherComponent,
    PhonesExtendComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    LoadingSpinnerComponent,
    DropdownDirective,
    HasRoleDirective,
    LaPaginationComponent,
    SubNavComponent,
    PhoneInListComponent,
    PhoneInListDetailsComponent,
    AdderPhoneComponent,
    SearcherComponent
  ]
})
export class SharedModule {
}
