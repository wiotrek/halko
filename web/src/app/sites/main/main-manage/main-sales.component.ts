import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { CategoryItemSolds } from '../_dictionary/catogory-item-solds.dictionary';
import { Employees } from '../_models/employees.model';
import { ItemStructure } from '../_models/item-structure.model';

@Component({
    selector: 'app-main-sales',
    templateUrl: 'sheet-scratch/sheet-template/sheet-template.html',
    styleUrls: ['sheet-scratch/sheet-template/sheet-template.scss']
})
export class MainSalesComponent implements OnInit, OnDestroy {
    title = 'Sprzedaż';
    isSetDanger = false;

    private subscription: Subscription;

    items: ItemStructure[];

    category = CategoryItemSolds;

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

    private getEmployees(): void {
        this.mainService.getEmplyees().subscribe(
            (res: Employees[]) => this.employees = res
        );
    }

    private getElements(): void {
        this.items = this.mainService.getSoldsItems();
        this.subscription = this.mainService.soldsItem$.subscribe(
            (res: ItemStructure[]) => this.items = res
        );
    }

    private displaySum(): void {
        const sub = this.mainService.soldsItem$.subscribe(
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
