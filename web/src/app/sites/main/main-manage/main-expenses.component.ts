import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { MainService } from '../main.service';
import { CategoryItemExpenses } from '../_dictionary/category-item-expenses.dictionary';
import { EmployeesInitialDictionary } from '../_dictionary/employees-initial.dictionary';
import { Employees } from '../_models/employees.model';
import { ItemStructureAdd } from '../_models/item-structure-add.model';
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

    // assign default values
    employees: Employees[] = EmployeesInitialDictionary;

    // if element is -1 then none is editing
    currentlyEditedElement = -1;

    // paginations
    readonly pageSize = 5;
    start = 0;
    end = 5;

    sum: number;

    constructor(private mainService: MainService) {}

    ngOnInit(): void {
        this.getEmployees();
        this.getElements();
        this.displaySum();
    }

    editElementModeToggleFunc = (ind: number) => {
        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
    }

    addNewElementFunc = (newElement: ItemStructureAdd) => {
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

        const sub = this.mainService.getEmployees()
            .subscribe(
                (res: Employees[]) => this.employees = res,
                () => this.employees = EmployeesInitialDictionary
            );

        this.subscription = sub;
    }

    private getElements(): void {
        this.mainService.getExpensesItems();

        const sub = this.mainService.expensesItem$.subscribe(
            (res: ItemStructure[]) => this.items = res
        );

        this.subscription.add(sub);
    }

    private displaySum(): void {
        this.mainService.displayExpensesSum().subscribe(
            res => this.sum = res
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
