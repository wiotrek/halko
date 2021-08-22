import { Component, Input } from '@angular/core';
import { PhoneInListTypes } from 'src/app/shared/models-union/phone-in-list.types';

@Component({
    selector: 'app-repairs-to-archive',
    templateUrl: 'repairs-to-archive.component.html',
    styleUrls: ['repairs-to-archive.component.scss']
})
export class RepairsToArchiveComponent {
    @Input() elInList: PhoneInListTypes;
}
