import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemInListModel } from '../../../../_models/item-in-list.model';

@Component({
    selector: 'app-phones-transfer',
    templateUrl: './phones-transfer.component.html',
    styleUrls: ['./phones-transfer.component.scss']
})
export class PhonesTransferComponent {
    @Input() elInList: ItemInListModel;

    places = [
        'Karuzela Września',
        'Kaufland Poznań'
    ];

    transferPhoneFunc(f: NgForm): void {
        console.log(f.value);
    }
}
