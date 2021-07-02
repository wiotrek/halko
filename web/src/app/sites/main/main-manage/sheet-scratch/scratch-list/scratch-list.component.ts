import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemStructure } from '../../../_models/item-structure.model';
import {
    faEdit,
    faTrashAlt,
    faUndoAlt,
    faSave
} from '@fortawesome/free-solid-svg-icons';
import { categoryIcon } from '../../../_dictionary/category-icon.dictionary';
import { categoryIconColor } from '../../../_dictionary/category-icon-color.dictionary';
import { MainService } from '../../../main.service';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-scratch-list',
    templateUrl: 'scratch-list.component.html',
    styleUrls: ['scratch-list.component.scss']
})

export class ScratchListComponent implements OnInit {
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faUndoAlt = faUndoAlt;
    faSave = faSave;

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;


    items: Observable<ItemStructure[]>;

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


    deleteElement(item: ItemStructure): void {
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
