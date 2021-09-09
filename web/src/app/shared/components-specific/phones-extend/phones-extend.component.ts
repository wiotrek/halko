import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhoneInListType } from '../../models-union/phone-in-list.type';
import { RepairsModel } from '../../models/repairs.model';

@Component({
    selector: 'app-phones-extend',
    templateUrl: './phones-extend.component.html',
    styleUrls: ['./phones-extend.component.scss']
})
export class PhonesExtendComponent {
    @Input() elInList: PhoneInListType | RepairsModel;
    @Output() messageBack: EventEmitter<any> = new EventEmitter<any>();
}
