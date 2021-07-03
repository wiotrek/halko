import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

    editElementModeToggle = (ind: number) => {
        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
    }

    private getElements(): void {
        this.items = this.mainService.getElements();
    }

}
