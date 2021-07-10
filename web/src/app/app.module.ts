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
import { MainExpensesComponent } from './sites/main/main-manage/main-expenses.component';
import { MainSalesComponent } from './sites/main/main-manage/main-sales.component';

import { ScratchHeaderComponent } from './sites/main/main-manage/sheet-scratch/scratch-header/scratch-header.component';
import { ScratchAdderComponent } from './sites/main/main-manage/sheet-scratch/scratch-adder/scratch-adder.component';
import { ItemViewComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/item-view/item-view.component';
import { ItemEditComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/item-edit/item-edit.component';
import { ItemsSumComponent } from './sites/main/main-manage/sheet-scratch/scratch-list/items-sum/items-sum.component';
import { MainStatisticsComponent } from './sites/main/main-manage/main-statistics/main-statistics.component';
import { PhonesComponent } from './sites/phones/phones.component';
import { SitesRoutingModule } from './sites/sites-routing.module';
import { PhonesListComponent } from './sites/phones/phones-list/phones-list.component';
import { PhonesSeacherComponent } from './sites/phones/phones-seacher/phones-seacher.component';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    NavComponent,
    MainComponent,
    MainExpensesComponent,
    MainSalesComponent,
    MainStatisticsComponent,
    ScratchHeaderComponent,
    ScratchAdderComponent,
    ItemViewComponent,
    ItemEditComponent,
    ItemsSumComponent,
    PhonesComponent,
    PhonesListComponent,
    PhonesSeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SitesRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
