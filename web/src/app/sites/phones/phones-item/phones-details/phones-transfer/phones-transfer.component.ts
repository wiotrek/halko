import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemInList } from '../../../_models/itemInList.model';

@Component({
    selector: 'app-phones-transfer',
    templateUrl: './phones-transfer.component.html',
    styleUrls: ['./phones-transfer.component.scss']
})
export class PhonesTransferComponent {
    @Input() elInList: ItemInList;

    places = [
        'Karuzela Września',
        'Kaufland Poznań'
    ];

    transferPhoneFunc(f: NgForm): void {
        console.log(f.value);
    }
}
