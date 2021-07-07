import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, forkJoin, merge, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
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

    balanceValue = 0;

    constructor(
        private mainService: MainService){}

    ngOnInit(): void {
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
