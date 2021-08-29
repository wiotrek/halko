import { Component, Input, OnInit, Type } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneInListType } from '../../models-union/phone-in-list.type';
import { PhoneFieldsModel } from '../../models/phone-fields.model';

@Component({
    selector: 'app-phone-in-list',
    templateUrl: 'phone-in-list.component.html',
    styleUrls: ['phone-in-list.component.scss']
})
export class PhoneInListComponent implements OnInit {
    @Input() elInList: PhoneInListType;
    @Input() deviceFields: PhoneFieldsModel[];

    // optionals members
    @Input() ind?: number;
    @Input() isFlexStart?: boolean;
    @Input() componentWillUsing?: Type<unknown>;

    fieldsNonDetails: PhoneFieldsModel[];

    detailsMode = false;

    // icons
    faEdit = faEdit;
    faInfoCircle = faInfoCircle;
    faUndo = faUndo;

    ngOnInit(): void {

        // separated fields which will only in details mode
        this.fieldsNonDetails = [...this.deviceFields].filter(
            x => !x.onlyInDetails
        );
    }
}
