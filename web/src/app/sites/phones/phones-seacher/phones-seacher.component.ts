import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    faArrowUp,
    faArrowDown,
    IconDefinition,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { PhonesService } from '../phones.service';
import { Point } from '../_models/point.model';


@Component({
    selector: 'app-phones-seacher',
    templateUrl: './phones-seacher.component.html',
    styleUrls: ['./phones-seacher.component.scss']
})

export class PhonesSeacherComponent implements OnInit {
    @Output() searchString: EventEmitter<string> = new EventEmitter();
    @Output() pointString: EventEmitter<string> = new EventEmitter();
    @Output() stateString: EventEmitter<string> = new EventEmitter();
    faArrowUp = faArrowUp;
    faArrowDown = faArrowDown;
    faCaretDown = faCaretDown;

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

    state = '';

    points: Point[];

    defaultPoint = 'Karuzela Września';

    constructor(private phonesService: PhonesService) {}

    ngOnInit(): void {
        this.getPointName();
        this.getListPoints();
    }

    searchName = (f: NgForm) =>
        this.searchString.emit(f.value)

    showDeviceForState = (state: string) =>
        this.stateString.emit(state)

    showDeviceForPoint(pointName: string): void {
        this.defaultPoint = pointName;
        this.pointString.emit(
            pointName === 'Wszystkie'
            ? ''
            : pointName
        );
    }

    private getListPoints(): void {
        this.phonesService.getListPoints().subscribe(
            (res: Point[]) => {
                this.points = res;
                res.push({id: -2, name: 'Wszystkie'});
            },
            () => this.points = [{ id: -1, name: 'Brak' }]
        );
    }

    private getPointName(): void {
        this.defaultPoint = this.phonesService.pointName;
    }
}
