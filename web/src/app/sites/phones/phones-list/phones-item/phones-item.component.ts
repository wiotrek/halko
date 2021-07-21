import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ItemInListModel } from '../../_models/item-in-list.model';

@Component({
    selector: 'app-phones-item',
    templateUrl: './phones-item.component.html',
    styleUrls: ['./phones-item.component.scss']
})

export class PhonesItemComponent {
    @Input() elInList: ItemInListModel;
    @Input() ind: number;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    detailsMode = false;
}
