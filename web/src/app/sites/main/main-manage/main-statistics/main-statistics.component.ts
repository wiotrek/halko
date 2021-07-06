import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MainService } from '../../main.service';
import { categoryIconColor } from '../../_dictionary/category-icon-color.dictionary';
import { categoryIcon } from '../../_dictionary/category-icon.dictionary';
import { CategoryItemSolds } from '../../_dictionary/catogory-item-solds.dictionary';
import { CategoriesAmount } from '../../_models/categories-amount.model';
import { ItemStructure } from '../../_models/item-structure.model';

@Component({
    selector: 'app-main-statistics',
    templateUrl: 'main-statistics.component.html',
    styleUrls: ['main-statistics.component.scss'],
})
export class MainStatisticsComponent implements OnInit{

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;
    categories = CategoryItemSolds;

    categoriesAmount: CategoriesAmount[];

    constructor(
        private mainService: MainService){}

    ngOnInit(): void {
        this.getCategoriesAmount();
    }

    getCategoriesAmount(): void {

        const ACCESORIERS = { item: 'akcesoria', sum: 0 };
        const PHONE = { item: 'telefon', sum: 0 };
        const SERVICE = { item: 'serwis', sum: 0 };

        const initialCategories = [
            ACCESORIERS,
            PHONE,
            SERVICE
        ];

        this.mainService.getSoldsItems().pipe(
            tap(
                (res: ItemStructure[]) => this.categoriesAmount = res.reduce(
                    (total: CategoriesAmount[], curr: ItemStructure): CategoriesAmount[] => {

                        switch (curr.category) {
                            case ACCESORIERS.item:
                                total[0].sum++;
                                break;

                            case PHONE.item:
                                total[1].sum++;
                                break;

                            case SERVICE.item:
                                total[2].sum++;
                                break;
                        }

                        return total;
                    }, initialCategories)
            )
        );
    }
}
