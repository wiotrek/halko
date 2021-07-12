import { Component, Input } from '@angular/core';
import { ItemInList } from '../../_models/itemInList.model';

@Component({
    selector: 'app-phones-item-in-list-info',
    templateUrl: 'phones-itemInList-info.component.html',
    styleUrls: ['phones-itemInList-info.component.scss']
})
export class PhonesItemInListInfoComponent {
    @Input() elInList: ItemInList;
}
