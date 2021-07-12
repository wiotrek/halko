import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ItemInList } from '../_models/itemInList.model';

@Component({
    selector: 'app-phones-list',
    templateUrl: './phones-list.component.html',
    styleUrls: ['./phones-list.component.scss']
})

export class PhonesListComponent {
    @Input() elInList: ItemInList;
    @Input() ind: number;

    faEdit = faEdit;
}
