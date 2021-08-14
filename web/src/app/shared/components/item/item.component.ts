import { Component } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    faInfoCircle = faInfoCircle;

    ind = 1;

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
