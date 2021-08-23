import { Component, Input} from '@angular/core';
import { PhoneModel } from '../../_models/phone.model';
import { PhonesArchiveFieldDirectory } from './phones-list-archive.directory';

@Component({
    selector: 'app-phones-archive',
    templateUrl: './phones-archive.component.html',
    styleUrls: ['./phones-archive.component.scss']
})
export class PhonesArchiveComponent {
    @Input() elInList: PhoneModel;
    @Input() ind: number;

    phonesItemField = PhonesArchiveFieldDirectory;
}