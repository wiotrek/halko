import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { EmployeesInitialDictionary } from './_dictionary/employees-initial.dictionary';
import { CategoriesAmount } from './_models/categories-amount.model';
import { Employees } from './_models/employees.model';
import { ItemStructureAddBackend } from './_models/item-structure-add-backend.model';
import { ItemStructureAdd } from './_models/item-structure-add.model';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {
    apiUrl = environment.api;
    pointName: string;
    todayDate = new Date().toISOString().slice(0, 10);

    // for solds items
    private soldsItem: ItemStructure[] = [];
    private soldsItemsChanged = new BehaviorSubject<ItemStructure[]>(this.soldsItem);
    public soldsItem$ = this.soldsItemsChanged.asObservable();


    // for expenses items
    private expensesItems: ItemStructure[] = [];
    private expensesItemsChanged = new BehaviorSubject<ItemStructure[]>(this.expensesItems);
    public expensesItem$ = this.expensesItemsChanged.asObservable();


    private employeesCache = new Map();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.authService.user.subscribe(
            (user: User) =>  user
                ? this.pointName = user.pointName
                : this.pointName = 'Punkt',
            () => this.pointName = 'Punkt'
        );

        this.getAllItemsInitialFunc();
    }


    // for employess

    getEmployees(): Observable<Employees[]> {

        const response = this.employeesCache.get(
            Object.values(this.pointName).join('-')
        );

        if (response) { return of (response); }

        let params = new HttpParams();
        params = params.set('pointName', this.pointName);

        return this.http.get<Employees[]>(
            this.apiUrl + 'api/participant', { params }
        ).pipe(
            map(
                (res: Employees[]) => {
                    if (res.length > 0) {
                        this.employeesCache.set(
                            Object.values(this.pointName).join('-'), res
                        );

                        return res;
                    }

                    return EmployeesInitialDictionary;
                }
            )
        );
    }


    // for solds items

    getSoldsItems(): ItemStructure[] {
        this.soldsItemsChanged.next(this.soldsItem);
        return this.soldsItem;
    }

    addNewSoldItem(el: ItemStructureAdd): void {
        // this.soldsItem.unshift(el);
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

    getExpensesItems(): void {
    }

    addNewExpenseItem(el: ItemStructureAdd): void {
        const elOnBackend = el as ItemStructureAddBackend;
        elOnBackend.pointName = this.pointName;
        elOnBackend.transactionType = 'Zakup';

        this.http.post(
            this.apiUrl + 'api/transaction',
            elOnBackend
        ).subscribe(
            () => {
                const item: ItemStructure = {
                    productName: el.productName,
                    price: el.price,
                    initial: el.participantInitial,
                    category: el.productCategoryName,
                    type: 'Zakup',
                    name: this.pointName
                };
                this.expensesItems.unshift(item);
                this.expensesItemsChanged.next(this.expensesItems);
            }
        );
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


    // get solds items and expenses item
    private getAllItemsInitialFunc(): void {

        let params = new HttpParams();
        params = params.set('date', this.todayDate);
        params = params.append('pointName', this.pointName);

        this.http.get(
            this.apiUrl + 'api/transaction',
            { params }
        ).subscribe(
            (res: ItemStructure[]) => {
                this.soldsItem = res.filter(x => x.type === 'Sprzedaż').reverse();
                this.expensesItems = res.filter(x => x.type === 'Zakup').reverse();
                this.expensesItemsChanged.next(this.expensesItems);
            }
        );
    }
}
