import { Component, Input } from '@angular/core';
import { ItemInListModel } from '../../../../_models/item-in-list.model';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-phones-sold',
    templateUrl: './phones-sold.component.html',
    styleUrls: ['./phones-sold.component.scss']
})
export class PhonesSoldComponent {
    @Input() elInList: ItemInListModel;

    faMobileAlt = faMobileAlt;

    soldPhoneFunc(f: NgForm): void {
        console.log(f.value);
    }
}
