import { Component, Input, EventEmitter, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneFields } from '../../_dictionary/phone-fields.dictionary';
import { PhoneModel } from '../../_models/phone.model';
import { PhonesItemFieldDictionary } from './phones-item-field.dictionary';

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

    phonesItemField = PhonesItemFieldDictionary;

    phoneFields = PhoneFields;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    detailsMode = false;
}
