import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { CategoryItemExpenses } from '../_dictionary/category-item-expenses.dictionary';
import { Employees } from '../_models/employees.model';
import { ItemStructure } from '../_models/item-structure.model';

@Component({
    selector: 'app-main-expenses',
    templateUrl: 'sheet-scratch/sheet-template/sheet-template.html',
    styleUrls: ['sheet-scratch/sheet-template/sheet-template.scss']
})

export class MainExpensesComponent implements OnInit, OnDestroy {
    title = 'Wydatki';
    isSetDanger = true;

    subscription: Subscription;

    items: ItemStructure[];

    category = CategoryItemExpenses;

    employees: Employees[];

    // if element is -1 then none is editing
    currentlyEditedElement = -1;

    // paginations
    readonly pageSize = 5;
    start = 0;
    end = 5;

    sum: number;

    constructor(
        private mainService: MainService) {}

    ngOnInit(): void {
        this.getElements();
        this.getEmployees();
        this.displaySum();
    }

    editElementModeToggleFunc = (ind: number) => {
        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
    }

    addNewElementFunc = (newElement: ItemStructure) => {
        this.mainService.addNewExpenseItem(newElement);
    }

    editElementFunc(elementToEdit: { newElement: ItemStructure, ind: number}): void {
        this.mainService.EditExpenseItem(elementToEdit.newElement, elementToEdit.ind);
        this.currentlyEditedElement = -1;
    }

    deleteElementFunc = (ind: number) => {
        this.mainService.removeExpenseItem(ind);

        // because next element inherit editmode
        this.currentlyEditedElement = -1;
    }

    private getEmployees(): void {
        this.mainService.getEmplyees().subscribe(
            (res: Employees[]) => this.employees = res
        );
    }

    private getElements(): void {
        this.items = this.mainService.getExpensesItems();
        this.subscription = this.mainService.expensesItem$.subscribe(
            (res: ItemStructure[]) => this.items = res
        );
    }

    private displaySum(): void {
        const sub = this.mainService.expensesItem$.subscribe(
            res => this.sum = res.reduce(
                (acc: number, curr: ItemStructure) => acc + +curr.price, 0
            )
        );

        this.subscription.add(sub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
