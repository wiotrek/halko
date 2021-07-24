import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesAmount } from './_models/categories-amount.model';
import { Employees } from './_models/employees.model';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {
    apiUrl = environment.api;

    // for solds items

    private soldsItem: ItemStructure[] = [
        {
            initial: 'WK',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initial: 'WK',
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
            initial: 'WK',
            category: 'telefon',
            name: 'P20 lite',
            price: 700
        },
    ];

    private expensesItemsChanged = new BehaviorSubject<ItemStructure[]>(this.expensesItems);
    public expensesItem$ = this.expensesItemsChanged.asObservable();


    private employeesCache = new Map();

    constructor(
        private http: HttpClient
    ) {}

    // for employess

    getEmployees(pointNameRaw: string): Observable<Employees[]> {

        const response = this.employeesCache.get(
            Object.values(pointNameRaw).join('-')
        );

        if (response) { return of (response); }

        let params = new HttpParams();
        params = params.set('pointName', pointNameRaw);

        return this.http.get<Employees[]>(
            this.apiUrl + 'api/participant', { params }
        ).pipe(
            map(
                (res: Employees[]) => {
                    this.employeesCache.set(
                        Object.values(pointNameRaw).join('-'), res
                    );

                    return res;
                }
            )
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
}
