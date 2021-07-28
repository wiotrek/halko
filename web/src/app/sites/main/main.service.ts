import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { ErrorsDictionary } from 'src/app/shared/directory/errors.directory';
import { EmployeesInitialDictionary } from './_dictionary/employees-initial.dictionary';
import { TransactionTypeEnum } from './_enums/transaction-type.enum';
import { CategoriesAmount } from './_models/categories-amount.model';
import { Employees } from './_models/employees.model';
import { ItemStructureAddBackend } from './_models/item-structure-add-backend.model';
import { ItemStructureAdd } from './_models/item-structure-add.model';
import { ItemStructureEdit } from './_models/item-structure-edit.model';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {
    apiUrl = environment.api;
    pointName: string;
    todayDate = new Date().toISOString().slice(0, 10);

    // for solds items
    private soldsItems: ItemStructure[] = [];
    private soldsItemsChanged = new BehaviorSubject<ItemStructure[]>(this.soldsItems);
    public soldsItem$ = this.soldsItemsChanged.asObservable();


    // for expenses items
    private expensesItems: ItemStructure[] = [];
    private expensesItemsChanged = new BehaviorSubject<ItemStructure[]>(this.expensesItems);
    public expensesItem$ = this.expensesItemsChanged.asObservable();


    private employeesCache = new Map();

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.authService.user.subscribe(
            (user: User) =>  user
                ? this.pointName = user.pointName
                : this.pointName = 'Punkt'
            , (err: HttpErrorResponse) => {
                this.toastr.error(err.error.message);
                this.pointName = 'Punkt';
            }
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

    addNewSoldItem(el: ItemStructureAdd): void {
        this.addNewItem(el, TransactionTypeEnum.solds);
    }

    EditSoldItem(editedElement: ItemStructureEdit, ind: number): void {
        this.editItem(editedElement, ind, TransactionTypeEnum.solds);
    }

    removeSoldItem(ind: number): void {
        this.soldsItems.splice(ind, 1);
        this.soldsItemsChanged.next(this.soldsItems);
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

    addNewExpenseItem(el: ItemStructureAdd): void {
        this.addNewItem(el, TransactionTypeEnum.expenses);
    }

    EditExpenseItem(editedElement: ItemStructureEdit, ind: number): void {
        this.editItem(editedElement, ind, TransactionTypeEnum.expenses);
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
                this.soldsItems = res.filter(x => x.type === 'Sprzedaż').reverse();
                this.soldsItemsChanged.next(this.soldsItems);

                this.expensesItems = res.filter(x => x.type === 'Zakup').reverse();
                this.expensesItemsChanged.next(this.expensesItems);
            },
            () => this.toastr.error(ErrorsDictionary.server)
        );
    }

    private addNewItem(el: ItemStructureAdd, transactionTypeEnum: TransactionTypeEnum): void {
        const elOnBackend = el as ItemStructureAddBackend;
        elOnBackend.pointName = this.pointName;
        elOnBackend.transactionType = transactionTypeEnum;

        this.http.post(
            this.apiUrl + 'api/transaction', elOnBackend
        ).subscribe(
            (res: ItemStructure) => {
                if (transactionTypeEnum === TransactionTypeEnum.expenses) {
                    this.expensesItems.unshift(res);
                    this.expensesItemsChanged.next(this.expensesItems);
                } else {
                    this.soldsItems.unshift(res);
                    this.soldsItemsChanged.next(this.soldsItems);
                }
            },
            (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }

    private editItem(el: ItemStructureEdit, ind: number, transactionTypeEnum: TransactionTypeEnum): void {

        this.http.put(
            this.apiUrl + 'api/transaction', el
        ).subscribe(
            (res: ItemStructure) => {
                if (transactionTypeEnum === TransactionTypeEnum.expenses) {
                    this.expensesItems[ind] = res;
                    this.expensesItemsChanged.next(this.expensesItems);
                } else {
                    this.soldsItems[ind] = res;
                    this.soldsItemsChanged.next(this.expensesItems);
                }
            }, (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }
}
