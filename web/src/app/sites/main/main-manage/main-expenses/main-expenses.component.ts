import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainService } from '../../main.service';
import { CategoryItemSolds } from '../../_dictionary/catogory-item-solds.dictionary';
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

    category = CategoryItemSolds;

    employees: Employees[] = [
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
    }

    editElementModeToggleFunc = (ind: number) => {
        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
    }

    editElementFunc(item: ItemStructure): void {
        this.mainService.putElement(item);
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

    private getElements(): void {
        this.items = this.mainService.getElements();
    }

}
