import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatAll, map, observeOn, tap } from 'rxjs/operators';
import { CategoriesAmount } from './_models/categories-amount.model';
import { Employees } from './_models/employees.model';
import { ItemStructure } from './_models/item-structure.model';

@Injectable({providedIn: 'root'})
export class MainService {

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

    private expensesItems: ItemStructure[] = [
        {
            initials: 'WK',
            category: 'telefon',
            name: 'P20 lite',
            price: 700
        },
    ];

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

    categories = [
        { item: 'akcesoria', sum: 0 },
        { item: 'telefon', sum: 0 },
        { item: 'serwis', sum: 0 }
    ];

    getEmplyees(): Observable<Employees[]> {
        return new Observable(
            observer => observer.next(this.employees)
        );
    }


    // for solds items

    getSoldsItems(): Observable<ItemStructure[]> {
        return new Observable(
            observer => observer.next(this.soldsItem)
        );
    }

    addNewSoldItem(el: ItemStructure): void {
        this.soldsItem.unshift(el);
    }

    EditSoldItem(editedElement: ItemStructure, indElement: number): void {
        this.soldsItem[indElement] = editedElement;
    }

    removeSoldItem(ind: number): void {
        this.soldsItem.splice(ind, 1);
    }



    // for expneses items

    getExpensesItems(): Observable<ItemStructure[]> {
        return new Observable(
            observer => observer.next(this.expensesItems)
        );
    }

    addNewExpenseItem(el: ItemStructure): void {
        this.expensesItems.unshift(el);
    }

    EditExpenseItem(editedElement: ItemStructure, indElement: number): void {
        this.expensesItems[indElement] = editedElement;
    }

    removeExpenseItem(ind: number): void {
        this.expensesItems.splice(ind, 1);
    }


    // for statistics


    private getCategoriesAmountChange(): void {

        // const ACCESORIERS = { item: 'akcesoria', sum: 0 };
        // const PHONE = { item: 'telefon', sum: 0 };
        // const SERVICE = { item: 'serwis', sum: 0 };

        // const initialCategories = [
        //     ACCESORIERS,
        //     PHONE,
        //     SERVICE
        // ];


        this.getSoldsItems().pipe(
            map(
                (res: ItemStructure[]) => res.reduce(
                    (total: CategoriesAmount[], curr: ItemStructure): CategoriesAmount[] => {

                        switch (curr.category) {
                            case 'akcesoria':
                                this.categories[0].sum++;
                                break;

                            case 'telefon':
                                this.categories[1].sum++;
                                break;

                            case 'serwis':
                                this.categories[2].sum++;
                                break;
                        }

                        return total;
                    }, []

                )
            )
        );

        // return new Observable(obs => obs.next(initialCategories));



        // return new Observable<CategoriesAmount[]>(obs => obs.next(cat));

    }
}
