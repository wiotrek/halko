import {Component, Input} from '@angular/core';
import {RepairsItemDictionary} from './repairs-item.dictionary';

@Component({
    selector: 'app-repairs-item',
    templateUrl: 'repairs-item.component.html',
    styleUrls: ['repairs-item.component.scss']
})
export class RepairsItemComponent {
    @Input() ind: number;
    @Input() elInList: any;

    phonesItemField = RepairsItemDictionary;
}
