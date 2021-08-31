import { Component, OnInit } from '@angular/core';
import { PricesFieldsArray } from '../prices-fields.array';
import { PricesModel } from '../../../shared/models/prices.model';
import {SearcherPatternModel} from '../../../shared/components/searcher/_models/searcher-pattern.model';
import {SearcherModel} from '../../../shared/models/searcher.model';
import { PricesService } from '../prices.service';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['prices.component.scss']
})
export class PricesComponent implements OnInit {
    pricesFieldsArray = PricesFieldsArray;
    isFlexStart = true;
    headline = 'Cennik';

    searcherPattern: SearcherPatternModel = {
        sorting: false,
        filterNewUsed: false,
        filterPoints: false
    };

    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: ''
    };

    phonePrices: PricesModel[];

    constructor(
        private pricesService: PricesService
    ) {}

    ngOnInit(): void {
        this.phonePrices = this.pricesService.getPricesList();
        this.pricesService.pricesList$.subscribe(
            res => this.phonePrices = res
        );
    }

    searchNameFilter(name: string): void {
        this.searcher.searchName = name;
        this.pricesService.pricesList$.subscribe(
            res => {
                this.phonePrices = res.filter(x => x.model.includes(name));
            }
        );
    }
}
