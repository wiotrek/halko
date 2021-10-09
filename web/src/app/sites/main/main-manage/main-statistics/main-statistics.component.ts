import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { MainService } from '../../main.service';
import { CategoryIconColorDictionary } from '../../_dictionary/category-icon-color.dictionary';
import { CategoryIconDictionary } from '../../_dictionary/category-icon.dictionary';
import { CategoryItemSoldsArray } from '../../_array/catogory-item-solds.array';
import { CategoriesAmount } from '../../_models/categories-amount.model';
import { take } from 'rxjs/operators';
import { CloseDayModel } from 'src/app/sites/main/_models/close-day.model';

@Component({
  selector: 'app-main-statistics',
  templateUrl: 'main-statistics.component.html',
  styleUrls: [ 'main-statistics.component.scss' ],
})
export class MainStatisticsComponent implements OnInit, OnDestroy {
  today: Date;
  choiceDay: Date;

  // if is previous day then user can't edited fields
  @Input() editModeOn = true;

  // supplies from dictionary
  categoryIcon = CategoryIconDictionary;
  categoryIconColor = CategoryIconColorDictionary;
  categories = CategoryItemSoldsArray;

  // wrap-up as icon and amount
  categoriesAmount: CategoriesAmount[];

  // subtraction sold sum and expense sum
  balanceValue = 0;

  // cash from previous day
  startCash = 0;

  // getting from service
  soldSum = 0;
  expenseSum = 0;

  // values input for user
  cash = 0;
  creditCard = 0;

  // all sum
  sum = 0;

  // active subscriptions
  subscription: Subscription;

  constructor(private mainService: MainService) {
    this.mainService.getStartCash().pipe(take(1)).subscribe(
      (cash: number) => this.startCash = cash
    );
  }

  ngOnInit(): void {
    this.today = new Date();
    this.choiceDay = new Date();

    this.getCategoriesAmount();
    this.getBalanceDay();
  }

  changeItems(date: any): void {
    this.mainService.getAllItemsInitialFunc(date);
  }

  getCategoriesAmount(): void {
    this.subscription = this.mainService.getCategoriesAmountChange().subscribe(
      (res: CategoriesAmount[]) => this.categoriesAmount = res
    );
  }

  getBalanceDay(): void {
    const sub = combineLatest([
      this.mainService.displaySoldsSum(),
      this.mainService.displayExpensesSum()
    ]).subscribe(
      res => {
        this.soldSum = res[0];
        this.expenseSum = res[1];
        this.balanceValue = res[0] - res[1];
        this.checkSum();
      }
    );

    this.subscription.add(sub);
  }

  checkSum(): void {
    this.sum = +this.startCash
      + (+this.soldSum - +this.expenseSum)
      - (+this.creditCard + +this.cash);
  }

  closeDay(): void {
    this.mainService.closeDay({
      dayBilans: this.balanceValue,
      dayBilansInCash: +this.startCash + (+this.soldSum - +this.expenseSum) - +this.creditCard,
      monthBilansInCart: +this.creditCard,
      income: this.soldSum,
      outcome: this.expenseSum,
      accessoryAmountBilans: [...this.categoriesAmount].find(x => x.item === 'akcesoria').sum,
      phoneAmountBilans: [...this.categoriesAmount].find(x => x.item === 'telefon').sum,
      serviceAmountBilans: [...this.categoriesAmount].find(x => x.item === 'serwis').sum,
      point: {
        name: ''
      }
    } as CloseDayModel);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
