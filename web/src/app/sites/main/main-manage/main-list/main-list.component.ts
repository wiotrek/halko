import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    faCheck,
    faEdit,
    faTrashAlt,
    faUndoAlt,
    faSave
} from '@fortawesome/free-solid-svg-icons';
import { categoryIconColor } from '../../_dictionary/category-icon-color.dictionary';
import { categoryIcon } from '../../_dictionary/category-icon.dictionary';
import { MainService } from '../../main.service';
import { ItemStructure } from '../../_models/item-structure.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-main-list',
    templateUrl: 'main-list.component.html',
    styleUrls: ['main-list.component.scss']
})
export class MainListComponent implements OnInit{
    faCheckCircle = faCheck;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faUndoAlt = faUndoAlt;
    faSave = faSave;

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;

    items: Observable<ItemStructure[]>;

    employees = [
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

    category = [
        'akcesoria',
        'telefon',
        'serwis'
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

    addElement(f: NgForm): void {

        const elementToAdd = f.value as ItemStructure;

        this.mainService.postElement(elementToAdd);

        f.controls.price.reset();
        f.controls.name.reset();
    }

    editElement(f: NgForm, prevItem: ItemStructure): void {
        const elementToEdit = f.value as ItemStructure;
        console.log(f.value);

        this.mainService.putElement(elementToEdit, prevItem);

        this.currentlyEditedElement = -1;
    }

    deleteElement($event: any, item: ItemStructure): void {
        const ind = this.getElementIndex(item);

        this.mainService.deleteElement(ind);

        // because next element inherit editmode
        this.currentlyEditedElement = -1;
    }

    // assign index to currenlty edited element
    editElementModeToggle = (item: ItemStructure) => {
        const ind = this.getElementIndex(item);

        this.currentlyEditedElement = ind === this.currentlyEditedElement
        ? -1
        : ind;
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

    private getElementIndex = (el: ItemStructure): number => {
        let getIndexItem = 0;
        const sub = this.items.subscribe(
            res => getIndexItem = res.indexOf(el)
        );
        sub.unsubscribe();

        return getIndexItem;
    }

    private getElements(): void {
        this.items = this.mainService.getElements();
    }
}
