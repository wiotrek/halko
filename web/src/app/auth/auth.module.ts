import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './view/auth.component';

@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path: '', component: AuthComponent}
    ]),
    SharedModule
  ]
})
export class AuthModule {
}
