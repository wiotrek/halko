import { Component, Input, OnInit } from '@angular/core';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { RepairModel } from 'src/app/shared/models/repair.model';

@Component({
    selector: 'app-repairs-to-archive',
    templateUrl: 'repairs-to-archive.component.html',
    styleUrls: ['repairs-to-archive.component.scss']
})
export class RepairsToArchiveComponent implements OnInit {
    @Input() elInList: PhoneInListType | RepairModel;

    phone: RepairModel;

    ngOnInit(): void {
        this.phone = this.elInList as RepairModel;
    }
}
