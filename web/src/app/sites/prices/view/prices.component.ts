import { Component, OnInit } from '@angular/core';
import { PricesFieldsArray } from './_arrays/prices-fields.array';
import { PricesModel } from 'src/app/shared/models/prices.model';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { SearcherModel } from 'src/app/shared/models/searcher.model';
import { PricesService } from '../prices.service';
import { PricesApiGetPagModel } from '../_models-pagination/prices-api-get-pag.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['prices.component.scss']
})
export class PricesComponent implements OnInit {
    headline = 'Cennik';

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

    constructor(
        private pricesService: PricesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPrices(this.searcher);
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
