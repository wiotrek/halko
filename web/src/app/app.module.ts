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
import { ScratchHeaderComponent } from './sites/main/main-manage/sheet-scratch/scratch-header/scratch-header.component';
import { MainExpensesComponent } from './sites/main/main-manage/main-expenses/main-expenses.component';
import { ScratchAdderComponent } from './sites/main/main-manage/sheet-scratch/scratch-adder/scratch-adder.component';
import { ItemViewComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/item-view/item-view.component';
import { ItemEditComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/item-edit/item-edit.component';
import { ItemsSumComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/items-sum/items-sum.component';
import { MainSalesComponent } from './sites/main/main-manage/main-sales/main-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    NavComponent,
    MainComponent,
    MainExpensesComponent,
    MainSalesComponent,
    ScratchHeaderComponent,
    ScratchAdderComponent,
    ItemViewComponent,
    ItemEditComponent,
    ItemsSumComponent
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
