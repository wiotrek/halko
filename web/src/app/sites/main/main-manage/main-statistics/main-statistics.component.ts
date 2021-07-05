import { Component } from '@angular/core';
import { categoryIconColor } from '../../_dictionary/category-icon-color.dictionary';
import { categoryIcon } from '../../_dictionary/category-icon.dictionary';
import { CategoryItemSolds } from '../../_dictionary/catogory-item-solds.dictionary';

@Component({
    selector: 'app-main-statistics',
    templateUrl: 'main-statistics.component.html',
    styleUrls: ['main-statistics.component.scss'],
})
export class MainStatisticsComponent {

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;
    categories = CategoryItemSolds;

    soldsItem = [
        { item: 'akcesoria', sum: 1},
        { item: 'telefon', sum: 1},
        { item: 'serwis', sum: 1},
    ];

}
