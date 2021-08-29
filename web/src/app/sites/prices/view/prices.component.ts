import { Component } from '@angular/core';
import { PricesFieldsDirectory } from '../prices-fields.directory';
import { PricesModel } from '../../../shared/models/prices.model';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['prices.component.scss']
})
export class PricesComponent {
    pricesFieldsDirectory = PricesFieldsDirectory;
    isFlexStart = true;
    headline = 'Cennik';

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
