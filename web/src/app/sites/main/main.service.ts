import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoriesAmount } from './_models/categories-amount.model';
import { Employees } from './_models/employees.model';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {

    // for solds items

    private soldsItem: ItemStructure[] = [
        {
            initials: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        }
    ];

    private soldsItemsChanged = new BehaviorSubject<ItemStructure[]>(this.soldsItem);
    public soldsItem$ = this.soldsItemsChanged.asObservable();


    // for expenses items

    private expensesItems: ItemStructure[] = [
        {
            initials: 'WK',
            category: 'telefon',
            name: 'P20 lite',
            price: 700
        },
    ];

    private expensesItemsChanged = new BehaviorSubject<ItemStructure[]>(this.expensesItems);
    public expensesItem$ = this.expensesItemsChanged.asObservable();


    private employees: Employees[] = [
        {
            name: 'Marek',
            lastName: 'Konrad',
            initials: 'MK'
        },
        {
            name: 'Wojtek',
            lastName: 'Kierzkowski',
            initials: 'WK'
        }
    ];

    getEmplyees(): Observable<Employees[]> {
        return new Observable(
            observer => observer.next(this.employees)
        );
    }


    // for solds items

    getSoldsItems(): ItemStructure[] {
        this.soldsItemsChanged.next(this.soldsItem);
        return this.soldsItem;
    }

    addNewSoldItem(el: ItemStructure): void {
        this.soldsItem.unshift(el);
        this.soldsItemsChanged.next(this.soldsItem);
    }

    EditSoldItem(editedElement: ItemStructure, indElement: number): void {
        this.soldsItem[indElement] = editedElement;
        this.soldsItemsChanged.next(this.soldsItem);
    }

    removeSoldItem(ind: number): void {
        this.soldsItem.splice(ind, 1);
        this.soldsItemsChanged.next(this.soldsItem);
    }

    displaySoldsSum(): Observable<number> {
        return this.soldsItem$.pipe(
            map(
                res => res.reduce(
                    (acc: number, curr: ItemStructure) => acc + +curr.price, 0
                )
            )
        );
    }


    // for expneses items

    getExpensesItems(): ItemStructure[] {
        this.expensesItemsChanged.next(this.expensesItems);
        return this.expensesItems;
    }

    addNewExpenseItem(el: ItemStructure): void {
        this.expensesItems.unshift(el);
        this.expensesItemsChanged.next(this.expensesItems);
    }

    EditExpenseItem(editedElement: ItemStructure, indElement: number): void {
        this.expensesItems[indElement] = editedElement;
        this.expensesItemsChanged.next(this.expensesItems);
    }

    removeExpenseItem(ind: number): void {
        this.expensesItems.splice(ind, 1);
        this.expensesItemsChanged.next(this.expensesItems);
    }

    displayExpensesSum(): Observable<number> {
        return this.expensesItem$.pipe(
            map(
                res => res.reduce(
                    (acc: number, curr: ItemStructure) => acc + +curr.price, 0
                )
            )
        );
    }


    // for statistics

    // count how much specific items were sold
    getCategoriesAmountChange(): Observable<CategoriesAmount[]> {

        const ACCESORIERS = { item: 'akcesoria', sum: 0 };
        const PHONE = { item: 'telefon', sum: 0 };
        const SERVICE = { item: 'serwis', sum: 0 };

        const categories = [
            ACCESORIERS,
            PHONE,
            SERVICE
        ];

        return this.soldsItem$.pipe(
            map(
                (res: ItemStructure[]) => {

                    categories[
                        categories.indexOf(ACCESORIERS)
                    ].sum = res.filter(x => x.category === ACCESORIERS.item).length;

                    categories[
                        categories.indexOf(PHONE)
                    ].sum = res.filter(x => x.category === PHONE.item).length;

                    categories[
                        categories.indexOf(SERVICE)
                    ].sum = res.filter(x => x.category === SERVICE.item).length;

                    return categories;
                }
            )
        );
    }

    // getBalanceDay(): Observable<> {

    //     return merge(
    //         this.displayExpensesSum(),
    //         this.displaySoldsSum()
    //     );
    // }
}
