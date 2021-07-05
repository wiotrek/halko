import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    categoriesAmount: Observable<CategoriesAmount[]>;

    constructor(
        private mainService: MainService){}

    ngOnInit(): void {
        this.getCategoriesAmount();
    }

    private getCategoriesAmount(): void {
        this.categoriesAmount = this.mainService.getSoldsItems().pipe(
            map(
                res => {

                    const ACCESORIERS = { item: 'akcesoria', sum: 0 };
                    const PHONE = { item: 'telefon', sum: 0 };
                    const SERVICE = { item: 'serwis', sum: 0 };

                    const initialCategories = [
                        ACCESORIERS,
                        PHONE,
                        SERVICE
                    ];

                    return res.reduce(
                        (total: CategoriesAmount[], curr: ItemStructure): CategoriesAmount[] => {

                            switch (curr.category) {
                                case ACCESORIERS.item:
                                    total[total.indexOf(ACCESORIERS)].sum++;
                                    break;

                                case PHONE.item:
                                    total[total.indexOf(PHONE)].sum++;
                                    break;

                                case SERVICE.item:
                                    total[total.indexOf(SERVICE)].sum++;
                                    break;
                            }

                            return total;
                        }, initialCategories
                    );
                }
            )
        );
    }
}
