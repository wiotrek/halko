import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    faArrowUp,
    faArrowDown,
    IconDefinition,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';
import { PhonesService } from '../phones.service';
import { SortingValuesDirectory } from '../_directory/sorting-values.directory';
import { Point } from '../../../shared/models/point.model';


@Component({
    selector: 'app-phones-seacher',
    templateUrl: './phones-seacher.component.html',
    styleUrls: ['./phones-seacher.component.scss']
})

export class PhonesSeacherComponent implements OnInit {
    @Output() searchString: EventEmitter<string> = new EventEmitter();
    @Output() pointString: EventEmitter<string> = new EventEmitter();
    @Output() stateString: EventEmitter<string> = new EventEmitter();
    @Output() sortingDevice: EventEmitter<{name: string, vector: string}> = new EventEmitter();

    @Input() defaultPoint: string;

    state = '';
    points: Point[];

    faArrowUp = faArrowUp;
    faArrowDown = faArrowDown;
    faCaretDown = faCaretDown;

    iconsToValue: Dictionary<IconDefinition> = {
        up: faArrowUp,
        down: faArrowDown,
    };

    valuesToSorted = SortingValuesDirectory;
    selectSorted = this.valuesToSorted[0];

    constructor(private phonesService: PhonesService) {}

    ngOnInit(): void {
        this.getListPoints();
    }

    searchName = (f: any) =>
        this.searchString.emit(f.value)

    showDeviceForState = (state: string) =>
        this.stateString.emit(state)

    showDeviceForPoint(pointName: string): void {
        this.defaultPoint = pointName;

        const point = pointName === 'Wszystkie'
        ? ''
        : pointName;

        this.pointString.emit(point);
    }

    showSortingDevices(val: {name: string, vector: string}): void {
        this.selectSorted = val;
        this.sortingDevice.emit(val);
    }

    private getListPoints(): void {
        this.phonesService.getListPoints().subscribe(
            (res: Point[]) => {
                this.points = res;
            },
            () => this.points = [{ id: -1, name: 'Brak' }]
        );
    }
}
