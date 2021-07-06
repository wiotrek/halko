import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../../main.service';
import { categoryIconColor } from '../../_dictionary/category-icon-color.dictionary';
import { categoryIcon } from '../../_dictionary/category-icon.dictionary';
import { CategoryItemSolds } from '../../_dictionary/catogory-item-solds.dictionary';
import { CategoriesAmount } from '../../_models/categories-amount.model';

@Component({
    selector: 'app-main-statistics',
    templateUrl: 'main-statistics.component.html',
    styleUrls: ['main-statistics.component.scss'],
})
export class MainStatisticsComponent implements OnInit, OnDestroy{

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;
    categories = CategoryItemSolds;

    categoriesAmount: CategoriesAmount[];
    subscription: Subscription;

    constructor(
        private mainService: MainService){}

    ngOnInit(): void {
        this.getCategoriesAmount();
    }

    getCategoriesAmount(): void {

        this.subscription = this.mainService.getCategoriesAmountChange()
            .subscribe(
                (res: CategoriesAmount[]) => this.categoriesAmount = res
            );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
