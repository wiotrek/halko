import { Component } from '@angular/core';
import { faArrowUp, faArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';


@Component({
    selector: 'app-phones-seacher',
    templateUrl: './phones-seacher.component.html',
    styleUrls: ['./phones-seacher.component.scss']
})

export class PhonesSeacherComponent {
    faArrowUp = faArrowUp;
    faArrowDown = faArrowDown;

    iconsToValue: Dictionary<IconDefinition> = {
        up: faArrowUp,
        down: faArrowDown,
    };

    valuesToSorted: { name: string, vector: string }[] =  [
        { name: 'cena', vector: 'up'},
        { name: 'cena', vector: 'down'},
        { name: 'nazwa', vector: 'up'},
        { name: 'nazwa', vector: 'down'},
    ];

    defaultSorted = { name: 'cena', vector: 'up' };

    state = 'all';

    pointsNames = [
        'Wszystkie',
        'Karuzela Września',
        'Kaufland Poznań'
    ];

    defaultPoint = 'Karuzela Września';
}
