import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    faCheck,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { categoryIconColor } from '../dictionary/category-icon-color.dictionary';
import { categoryIcon } from '../dictionary/category-icon.dictionary';
import { MainService } from '../main.service';
import { ItemStructure } from '../models/item-structure.model';

@Component({
    selector: 'app-main-list',
    templateUrl: 'main-list.component.html',
    styleUrls: ['main-list.component.scss']
})
export class MainListComponent implements OnInit{
    faCheckCircle = faCheck;
    faEdit = faEdit;

    // suplies from dictionary
    categoryIcon = categoryIcon;
    categoryIconColor = categoryIconColor;

    testElements = {} as ItemStructure[];

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

    constructor(
        private mainService: MainService) {}

    ngOnInit(): void {
       this.getElements();
    }

    addElement(form: NgForm): void {
        const elementToAdd = form.value as ItemStructure;

        this.postElement(elementToAdd);

        form.controls.price.reset();
        form.controls.name.reset();
    }

    displaySum = () => {
        return this.testElements.reduce(
            (acc: number, curr: ItemStructure) => acc + +curr.price, 0
        );
    }

    private getElements(): void {
        const elementsObservable = this.mainService.getElements();
        elementsObservable.subscribe(
            (elements: ItemStructure[]) => {
                this.testElements = elements;
            }
        );
    }

    private postElement(element: ItemStructure): void {
        this.mainService.postElement(element);
    }
}
