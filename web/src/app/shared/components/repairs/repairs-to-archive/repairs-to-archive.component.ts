import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { RepairsModel } from 'src/app/shared/models/repairs.model';

@Component({
    selector: 'app-repairs-to-archive',
    templateUrl: 'repairs-to-archive.component.html',
    styleUrls: ['repairs-to-archive.component.scss']
})
export class RepairsToArchiveComponent implements OnInit {
    @Input() elInList: PhoneInListType | RepairsModel;
    @Output() messageBack: EventEmitter<any> = new EventEmitter<any>();

    phone: RepairsModel;

    ngOnInit(): void {
        this.phone = this.elInList as RepairsModel;
    }

    sendToArchive(isSuccess: boolean): void {
        const repairsPhone = this.elInList as RepairsModel;
        this.messageBack.emit({isSuccess, id: repairsPhone.id});
    }
}
