import { Component } from '@angular/core';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    categoryList = [
        'name',
        'model',
        'imei',
        'color',
        'place',
        'state',
        'priceBuyed',
        'price'
    ];

}
