import { Component, Input } from '@angular/core';
import { PhoneInListTypes } from 'src/app/shared/models-union/phone-in-list.types';
import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

@Component({
    selector: 'app-phone-in-list-details',
    templateUrl: 'phone-in-list-details.component.html',
    styleUrls: ['phone-in-list-details.component.scss']
})
export class PhoneInListDetailsComponent {
    @Input() deviceFields: PhoneFieldsModel;
    @Input() elInList: PhoneInListTypes;
}
