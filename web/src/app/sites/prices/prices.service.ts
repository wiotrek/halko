import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PricesModel} from '../../shared/models/prices.model';

@Injectable({providedIn: 'root'})
export class PricesService {
    private pricesList: PricesModel[] = [
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

    private pricesListChanged = new BehaviorSubject<PricesModel[]>(this.pricesList);
    public pricesList$ = this.pricesListChanged.asObservable();

    getPricesList(): PricesModel[] {
        this.pricesListChanged.next(this.pricesList);
        return this.pricesList;
    }
}
