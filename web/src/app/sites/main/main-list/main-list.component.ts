import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    faCheck,
    faHeadphones,
    faEdit,
    faMobileAlt,
    faWrench,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { MainService } from '../main.service';
import { ItemStructure } from '../models/item-structure.model';

@Component({
    selector: 'app-main-list',
    templateUrl: 'main-list.component.html',
    styleUrls: ['main-list.component.scss']
})
export class MainListComponent implements OnInit{
    faCheckCircle = faCheck;
    faHeadphones = faHeadphones;
    faEdit = faEdit;
    faMobileAlt = faMobileAlt;
    faWrench = faWrench;

    dictionaryIcon: Dictionary<IconDefinition> = {
        akcesoria: faHeadphones,
        telefon: faMobileAlt,
        serwis: faWrench
    };

    testElements = {} as ItemStructure[];

    employees = [
        {
            name: 'Marek',
            lastName: 'Konrad',
            initials: 'MK'
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
            (acc: number, curr: ItemStructure) => acc + curr.price, 0
        );
    }

    private getElements(): void {
        const elementsObservable = this.mainService.getElements();
        elementsObservable.subscribe(
            (elements: ItemStructure[]) => {
                this.testElements = elements.sort(
                    (a, b) => elements.indexOf(a) - elements.indexOf(b)
                );
            }
        );
    }

    private postElement(element: ItemStructure): void {
        this.mainService.postElement(element);
    }
}
