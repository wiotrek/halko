import { Component } from '@angular/core';
import {PricesFieldsDirectory} from '../prices-fields.directory';
import {PricesModel} from '../../../shared/models/prices.model';

@Component({
    selector: 'app-prices-list',
    template: `
    <div class="prices">
        <app-phone-in-list
            *ngFor="let phone of phonePrices"
            [elInList]="phone"
            [deviceFields]="pricesFieldsDirectory"
            [ind]="phonePrices.indexOf(phone) + 1"
        ></app-phone-in-list>
    </div>
    `
})
export class PricesListComponent {
    pricesFieldsDirectory = PricesFieldsDirectory;

    phonePrices: PricesModel[] = [
        {
            producer: 'Apple',
            model: 'Iphone 7',
            priceBought: 100,
            priceSell: 300,
            changeScreen: 400,
            changeCamera: 200
        },
        {
            producer: 'Apple',
            model: 'Iphone X',
            priceBought: 100,
            priceSell: 300,
            changeScreen: 400,
            changeCamera: 200
        }
    ];
}
