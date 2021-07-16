import { Component } from '@angular/core';
import { ItemInList } from '../_models/itemInList.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher></app-phones-seacher>
        <app-phones-item
            *ngFor="let phone of phonesList; index as i"
            [elInList]="phone"
            [ind]="i + 1"
        ></app-phones-item>
    `
})
export class PhonesListComponent {
    phonesList: ItemInList[] = [
        {
            brand: 'Apple',
            model: 'Iphone 7',
            imei: '123123123123',
            color: 'Space gray',
            place: 'Karuzela Września',
            state: 'Nowy',
            comments: 'wszystko ladnie',
            dateBought: '2021-03-02',
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
            comments: 'nic nie ladnie',
            dateBought: '2021-03-02',
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
            dateBought: '2021-03-02',
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
            dateBought: '2021-03-02',
            bought: 500,
            price: 300
        }

    ];
}
