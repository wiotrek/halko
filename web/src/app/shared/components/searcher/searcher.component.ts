import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SearcherVectorIconsDictionary } from './_dictionary/sorting-vector-icons.dictionary';
import { SearcherPatternModel } from './_models/searcher-pattern.model';
import { SortingVectorModel } from './_models/sorting-vector.model';
import { SortingValueConst } from './_consts/sorting-value.const';
import { UsingStatesConst } from '../../directory/using-states.const';
import { Point } from '../../models/point.model';

@Component({
    selector: 'app-searcher',
    templateUrl: './searcher.component.html',
    styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {
    @Input() searcherPattern: SearcherPatternModel;
    @Input() points?: Point[];
    @Input() defaultPoint?: string;

    @Output() searchNameFilter: EventEmitter<string> = new EventEmitter();
    @Output() pointFilter: EventEmitter<string> = new EventEmitter();
    @Output() stateFilter: EventEmitter<string> = new EventEmitter();
    @Output() sorting: EventEmitter<SortingVectorModel> = new EventEmitter();

    // icons
    faCaretDown = faCaretDown;

    // elements from stores
    usingStatesConst = UsingStatesConst;
    searcherVectorIconsDictionary = SearcherVectorIconsDictionary;
    sortingValueConst = SortingValueConst;

    // setting default variables
    selectedSorting: SortingVectorModel = this.sortingValueConst[0];
    state = '';

    searchName(searcher: any): void {
        this.searchNameFilter.emit(searcher.value);
    }

    pointFilterFunc(point: string): void {
        this.pointFilter.emit(point);
    }

    stateFilterFunc(state: string): void {
        this.stateFilter.emit(state);
    }

    sortingFunc(sortVector: SortingVectorModel): void {
        this.selectedSorting = sortVector;
        this.sorting.emit(sortVector);
    }
}
