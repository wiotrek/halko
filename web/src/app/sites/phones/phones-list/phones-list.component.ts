import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ItemInList } from '../_models/itemInList.model';

@Component({
    selector: 'app-phones-list',
    templateUrl: './phones-list.component.html',
    styleUrls: ['./phones-list.component.scss']
})

export class PhonesListComponent {
    elInList: ItemInList;
    faEdit = faEdit;

    constructor() {
        this.elInList = {
            ind: 1,
            brand: 'Apple',
            model: 'Iphone 7',
            imei: '123123123123',
            color: 'Space gray',
            place: 'Karuzela Września',
            state: 'Nowy',
            bought: 700,
            price: 1300
        };
    }
}
