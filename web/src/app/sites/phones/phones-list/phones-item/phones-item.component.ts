import { Component, Input, EventEmitter, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneFieldsDirectory } from '../../_directory/phone-fields.directory';
import { PhoneModel } from '../../_models/phone.model';
import { PhonesItemFieldsDirectory } from './phones-item-fields.directory';

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

    phonesItemField = PhonesItemFieldsDirectory;

    phoneFields = PhoneFieldsDirectory;

    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    detailsMode = false;
}
