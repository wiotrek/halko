import { Component } from '@angular/core';

interface Field {
    categoryName: string;
    polishName: string;
    isNumber: boolean;
}

@Component({
    selector: 'app-phones-add',
    templateUrl: './phones-add.component.html',
    styleUrls: ['./phones-add.component.scss']
})
export class PhonesAddComponent {

    fields: Field[] = [
        {
            categoryName: 'brand',
            polishName: 'Producent',
            isNumber: false
        },
        {
            categoryName: 'model',
            polishName: 'Model',
            isNumber: false
        },
        {
            categoryName: 'imei',
            polishName: 'Imei',
            isNumber: true
        },
        {
            categoryName: 'color',
            polishName: 'Kolor',
            isNumber: false
        },
        {
            categoryName: 'comments',
            polishName: 'Uwagi',
            isNumber: false
        },
        {
            categoryName: 'bought',
            polishName: 'Cena zakupu',
            isNumber: true
        },
        {
            categoryName: 'price',
            polishName: 'Cena',
            isNumber: true
        }
    ];
}
