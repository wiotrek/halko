import { Component } from '@angular/core';
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


interface ItemStructure {
    initials: string;
    category: string;
    name: string;
    price: number;
}

@Component({
    selector: 'app-main-list',
    templateUrl: 'main-list.component.html',
    styleUrls: ['main-list.component.scss']
})
export class MainListComponent {
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

    testElements: ItemStructure[] = [
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        },
        {
            initials: 'KB',
            category: 'akcesoria',
            name: 'szklo p9 lite',
            price: 40
        }
    ];

    addElement(form: NgForm): void {
        console.log(form.value);
        form.reset();
    }
}
