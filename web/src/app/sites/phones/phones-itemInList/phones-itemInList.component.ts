import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ItemInList } from '../_models/itemInList.model';

@Component({
    selector: 'app-phones-item-in-list',
    templateUrl: './phones-itemInList.component.html',
    styleUrls: ['./phones-itemInList.component.scss']
})

export class PhonesItemInListComponent {
    @Input() elInList: ItemInList;
    @Input() ind: number;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    infoMode = false;
}
