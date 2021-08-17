import { Component, Input} from '@angular/core';
import { PhoneModel } from '../../_models/phone.model';
import { PhonesArchivFieldDictionary } from './phones-list-archiv.dictionary';

@Component({
    selector: 'app-phones-archiv',
    templateUrl: './phones-archiv.component.html',
    styleUrls: ['./phones-archiv.component.scss']
})
export class PhonesArchivComponent {
    @Input() elInList: PhoneModel;
    @Input() ind: number;

    phonesItemField = PhonesArchivFieldDictionary;
}
