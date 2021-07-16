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
import { PhonesItemComponent } from './sites/phones/phones-item/phones-item.component';
import { PhonesSeacherComponent } from './sites/phones/phones-seacher/phones-seacher.component';
import { PhonesDetailsComponent } from './sites/phones/phones-item/phones-details/phones-details.component';
import { PhonesViewEditComponent } from './sites/phones/phones-item/phones-details/phones-view-edit/phones-view-edit.component';
import { PhonesSoldComponent } from './sites/phones/phones-item/phones-details/phones-sold/phones-sold.component';
import { PhonesTransferComponent } from './sites/phones/phones-item/phones-details/phones-transfer/phones-transfer.component';

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
    PhonesItemComponent,
    PhonesSeacherComponent,
    PhonesDetailsComponent,
    PhonesViewEditComponent,
    PhonesSoldComponent,
    PhonesTransferComponent
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
