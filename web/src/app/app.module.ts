import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './sites/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './sites/main/main.component';
import { MainListComponent } from './sites/main/main-manage/main-list/main-list.component';
import { ScratchHeaderComponent } from './sites/main/main-manage/sheet-scratch/scratch-header/scratch-header.component';
import { MainExpensesComponent } from './sites/main/main-manage/main-expenses/main-expenses.component';
import { ScratchAdderComponent } from './sites/main/main-manage/sheet-scratch/scratch-adder/scratch-adder.component';
import { ScratchListComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/scratch-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    NavComponent,
    MainComponent,
    MainListComponent,
    MainExpensesComponent,
    ScratchHeaderComponent,
    ScratchAdderComponent,
    ScratchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
