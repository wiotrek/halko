import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainService } from '../../main.service';
import { CategoryItemSolds } from '../../_dictionary/catogory-item-solds.dictionary';
import { Employees } from '../../_models/employees.model';
import { ItemStructure } from '../../_models/item-structure.model';

@Component({
    selector: 'app-main-sales',
    templateUrl: 'main-sales.component.html',
    styleUrls: ['main-sales.component.scss']
})
export class MainSalesComponent implements OnInit {
    title = 'Sprzedaż';

    items: Observable<ItemStructure[]>;

    category = CategoryItemSolds;

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
        this.mainService.addNewSoldItem(newElement);
    }

    editElementFunc(elementToEdit: { newElement: ItemStructure, ind: number}): void {
        this.mainService.EditSoldItem(elementToEdit.newElement, elementToEdit.ind);
        this.currentlyEditedElement = -1;
    }

    deleteElementFunc = (ind: number) => {
        this.mainService.removeSoldItem(ind);

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
        this.items = this.mainService.getSoldsItems();
    }

}
