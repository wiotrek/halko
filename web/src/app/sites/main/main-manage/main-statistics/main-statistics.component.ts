import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { MainService } from '../../main.service';
import { CategoryIconColorDictionary } from '../../_dictionary/category-icon-color.dictionary';
import { CategoryIconDictionary } from '../../_dictionary/category-icon.dictionary';
import { CategoryItemSoldsArray } from '../../_array/catogory-item-solds.array';
import { CategoriesAmount } from '../../_models/categories-amount.model';

@Component({
    selector: 'app-main-statistics',
    templateUrl: 'main-statistics.component.html',
    styleUrls: ['main-statistics.component.scss'],
})
export class MainStatisticsComponent implements OnInit, OnDestroy{
    today: Date;
    choiceDay: Date;

    // suplies from dictionary
    categoryIcon = CategoryIconDictionary;
    categoryIconColor = CategoryIconColorDictionary;
    categories = CategoryItemSoldsArray;

    categoriesAmount: CategoriesAmount[];
    subscription: Subscription;

    balanceValue = 0;

    constructor(
        private mainService: MainService){}

    ngOnInit(): void {

        this.today = new Date();
        this.choiceDay = new Date();

        this.getCategoriesAmount();
        this.getBalanaceDay();
    }

    getCategoriesAmount(): void {
        this.subscription = this.mainService.getCategoriesAmountChange()
            .subscribe(
                (res: CategoriesAmount[]) => this.categoriesAmount = res
            );
    }

    getBalanaceDay(): void {
        const sub = combineLatest([
            this.mainService.displaySoldsSum(),
            this.mainService.displayExpensesSum()
        ]).subscribe(
            res => this.balanceValue = res[0] - res[1]
        );

        this.subscription.add(sub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
