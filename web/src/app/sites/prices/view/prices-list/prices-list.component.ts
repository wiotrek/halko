import { Component, OnInit } from '@angular/core';
import { PricesModel } from 'src/app/shared/models/prices.model';
import { PricesFieldsArray } from 'src/app/sites/prices/view/_arrays/prices-fields.array';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { SearcherModel } from 'src/app/shared/models/searcher.model';
import { PricesService } from 'src/app/sites/prices/prices.service';
import { ToastrService } from 'ngx-toastr';
import { PricesApiGetPagModel } from 'src/app/sites/prices/_models-pagination/prices-api-get-pag.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prices-list',
  template: `
    <app-searcher
      [searcherPattern]="searcherPattern"
      (searchNameFilter)="searchNameFilter($event)"
    ></app-searcher>

    <app-phone-in-list
      *ngFor="let phone of phonePrices"
      [deviceFields]="pricesFieldsArray"
      [elInList]="phone"
      [isFlexStart]="isFlexStart"
      [ind]="phonePrices.indexOf(phone) + 1"
      [elInListAllowedEdit]="this.allowedEdit"
      (updateDetails)="updatePrice($event)"
    ></app-phone-in-list>

    <app-la-pagination
      [pageSize]="searcher.pageSize"
      [pageIndex]="searcher.pageIndex"
      [elementsAmount]="phonesAmount"
      (pageIndexChange)="changeSite($event)"
    ></app-la-pagination>
  `
})
export class PricesListComponent implements OnInit {
  // main list
  phonePrices: PricesModel[];

  // amount getting elements from api
  phonesAmount: number;

  // field unnecessary to generate component
  pricesFieldsArray = PricesFieldsArray;

  // elements in phone in list will display from left to right,
  // but not in center
  isFlexStart = true;

  // choice elements on searcher component
  searcherPattern: SearcherPatternModel = {
    sorting: false,
    filterNewUsed: false,
    filterPoints: false
  };

  // searcher property will for getting from api
  // choice filter, where will be create params
  searcher: SearcherModel = {
    pointName: '',
    searchName: '',
    state: '',
    pageIndex: 1,
    pageSize: 10,
  };

  allowedEdit = false;

  constructor(
    private pricesService: PricesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPrices(this.searcher);
    this.allowedEdit = this.pricesService.isLoggedAdmin;
  }

  searchNameFilter(name: string): void {
    this.searcher.searchName = name;
    this.getPrices(this.searcher);
  }

  countIndex(phone: PricesModel): number {
    return (
      this.phonePrices.indexOf(phone) + 1
    ) + this.searcher.pageSize * (this.searcher.pageIndex - 1);
  }

  changeSite(pageIndex: number): void {
    this.searcher.pageIndex = pageIndex;
    this.getPrices(this.searcher);
  }

  updatePrice(price: { update: NgForm, elInList: PhoneInListType }): void {
    this.pricesService.editPrice(
      price.update.value as PricesModel,
      (price.elInList as PricesModel).id
    );
  }

  private getPrices(searcher: SearcherModel = this.searcher): void {
    this.pricesService.getPrices(searcher).subscribe(
      (res: PricesApiGetPagModel) => {
        // amount all objects getting api
        this.phonesAmount = res.count;

        // unnecessary values to setting pagination
        this.searcher.pageIndex = res.pageIndex;

        // default sorting is for producer,and is alphabetic
        this.phonePrices = res.data;
      },
      (err: HttpErrorResponse) =>
        this.toastr.error(err.error.message)
    );
  }
}
