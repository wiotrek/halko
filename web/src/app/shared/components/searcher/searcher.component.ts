import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SearcherVectorIconsDictionary } from './_dictionary/sorting-vector-icons.dictionary';
import { SearcherPatternModel } from './_models/searcher-pattern.model';
import { SortingVectorModel } from './_models/sorting-vector.model';
import { SortingValueArray } from './_arrays/sorting-value.array';
import { UsingStatesArray } from '../../array/using-states.array';
import { Point } from '../../models/point.model';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: [ './searcher.component.scss' ]
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
  usingStatesArray = UsingStatesArray;
  searcherVectorIconsDictionary = SearcherVectorIconsDictionary;
  sortingValueArray = SortingValueArray;

  // setting default variables
  selectedSorting: SortingVectorModel = this.sortingValueArray[0];
  state = '';

  searchName(searcher: any): void {
    this.searchNameFilter.emit(searcher.value);
  }

  pointFilterFunc(pointName: string): void {

    // default searching phones for current point
    this.defaultPoint = pointName;

    // searching phones for all points, then must be empty ''
    const pointVal = pointName === 'Wszystkie'
      ? ''
      : pointName;

    this.pointFilter.emit(pointVal);
  }

  stateFilterFunc(state: string): void {
    this.stateFilter.emit(state);
  }

  sortingFunc(sortVector: SortingVectorModel): void {
    this.selectedSorting = sortVector;
    this.sorting.emit(sortVector);
  }
}
