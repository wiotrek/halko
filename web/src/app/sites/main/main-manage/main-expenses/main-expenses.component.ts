import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainService } from '../../main.service';
import { CategoryItemExpenses } from '../../_dictionary/category-item-expenses.dictionary';
import { Employees } from '../../_models/employees.model';
import { ItemStructure } from '../../_models/item-structure.model';

@Component({
    selector: 'app-main-expenses',
    templateUrl: 'main-expenses.component.html',
    styleUrls: ['main-expenses.component.scss']
})

export class MainExpensesComponent implements OnInit {
    title = 'Wydatki';

    items: Observable<ItemStructure[]>;

    category = CategoryItemExpenses;

    employees: Employees[];

    // if element is -1 then none is editing
    currentlyEditedElement = -1;

    // paginations
    readonly pageSize = 5;
    start = 0;
    end = 5;

    constructor(
        private mainService: MainService) {}

    ngOnInit(): void {
        this.getElements();
        this.getEmployees();
    }

    editElementModeToggleFunc = (ind: number) => {
        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
    }

    addNewElementFunc = (newElement: ItemStructure) => {
        this.mainService.postElement(newElement);
    }

    editElementFunc(elementToEdit: { newElement: ItemStructure, ind: number}): void {
        this.mainService.putElement(elementToEdit.newElement, elementToEdit.ind);
        this.currentlyEditedElement = -1;
    }

    deleteElementFunc = (ind: number) => {
        this.mainService.deleteElement(ind);

        // because next element inherit editmode
        this.currentlyEditedElement = -1;
    }

    displaySum = () => {
        return this.items.pipe(
            map(
                res => res.reduce(
                    (acc: number, curr: ItemStructure) => acc + +curr.price, 0
                )
            )
        );
    }

    private getEmployees(): void {
        this.mainService.getEmplyees().subscribe(
            (res: Employees[]) => this.employees = res
        );
    }

    private getElements(): void {
        this.items = this.mainService.getElements();
    }
}
