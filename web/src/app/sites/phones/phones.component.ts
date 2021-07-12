import { Component } from '@angular/core';
import { ItemInList } from './_models/itemInList.model';

@Component({
    selector: 'app-phones',
    templateUrl: './phones.component.html',
    styleUrls: ['./phones.component.scss']
})

export class PhonesComponent {
    phonesList: ItemInList[] = [
        {
            brand: 'Apple',
            model: 'Iphone 7',
            imei: '123123123123',
            color: 'Space gray',
            place: 'Karuzela Września',
            state: 'Nowy',
            bought: 700,
            price: 1300
        },
        {
            brand: 'Samsung',
            model: 'S7',
            imei: '123123123123',
            color: 'Blue',
            place: 'Karuzela Września',
            state: 'Używany',
            bought: 7000,
            price: 2000
        },
        {
            brand: 'Huawei',
            model: 'P30 pro lite duo',
            imei: '123123123123',
            color: 'star red spophhie',
            place: 'Karuzela Września',
            state: 'Nowy',
            bought: 30,
            price: 100
        },
        {
            brand: 'Xiaomi',
            model: 'Pro lite duo phone',
            imei: '123123123123',
            color: 'yellow green blue',
            place: 'Karuzela Września',
            state: 'Używany',
            bought: 500,
            price: 300
        }

    ];
}
