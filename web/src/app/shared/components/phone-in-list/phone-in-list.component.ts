import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Type
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUndo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PhoneInListType } from '../../models-union/phone-in-list.type';
import { PhoneFieldsModel } from '../../models/phone-fields.model';
import {PhoneModel} from '../../models/phone.model';
import {ItemStructure} from '../../models/item-structure.model';

@Component({
    selector: 'app-phone-in-list',
    templateUrl: 'phone-in-list.component.html',
    styleUrls: ['phone-in-list.component.scss']
})
export class PhoneInListComponent implements OnInit {
    @Input() elInList: PhoneInListType;
    @Input() deviceFields: PhoneFieldsModel[];

    // if element in list is not from current point
    // then we cant edit this
    @Input() elInListAllowedEdit?: boolean;

    // optionals members
    @Input() ind?: number;
    @Input() isFlexStart?: boolean;
    @Input() componentWillUsing?: Type<unknown>;

    // additionally variables, not must be using
    @Input() additionally?: any;

    // response from additionally component
    @Output() componentBeingUsingOutput: EventEmitter<any> = new EventEmitter<any>();

    // if fields will update then sending old version, and new version
    @Output() updateDetails: EventEmitter<{
        update: NgForm, elInList: PhoneInListType
    }> = new EventEmitter<{update: NgForm, elInList: PhoneInListType}>();

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

    addProperty(): string {
        const phone = this.elInList as PhoneModel;
        const itemStructure = this.elInList as ItemStructure;

        if (phone?.comment && phone?.comment.includes('rezerwacja')) {
            return 'elInList--booked';
        } else if (itemStructure?.deletedDateTime) {
            return 'elInList--deleted';
        } else if (itemStructure?.editedDateTime) {
            return 'elInList--edited';
        }
    }
}
