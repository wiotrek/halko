import { Component, Input, EventEmitter, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneFieldsArray } from '../../_array/phone-fields.array';
import { PhoneModel } from '../../_models/phone.model';

@Component({
    selector: 'app-phones-item',
    templateUrl: './phones-item.component.html',
    styleUrls: ['./phones-item.component.scss']
})

export class PhonesItemComponent {
    @Input() elInList: PhoneModel;
    @Input() ind: number;

    // after edit, transfer or sold phone is refresh list
    @Output() refreshPhoneList: EventEmitter<any> = new EventEmitter();

    phonesItemField = PhoneFieldsArray;

    phoneFields = PhoneFieldsArray;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    detailsMode = false;
}
