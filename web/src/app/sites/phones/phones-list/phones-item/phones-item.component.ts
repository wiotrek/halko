import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneFields } from '../../_dictionary/phone-fields.dictionary';
import { PhoneModel } from '../../_models/phone.model';

@Component({
    selector: 'app-phones-item',
    templateUrl: './phones-item.component.html',
    styleUrls: ['./phones-item.component.scss']
})

export class PhonesItemComponent {
    @Input() elInList: PhoneModel;
    @Input() ind: number;

    phoneFields = PhoneFields;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    detailsMode = false;
}
