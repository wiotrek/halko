import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { PhoneFieldsDictionary } from './_dictionary/phone-fields.dictionary';

@Component({
    selector: 'app-phones-archiv',
    templateUrl: './phones-archiv.component.html',
    styleUrls: ['./phones-archiv.component.scss']
})
export class PhonesArchivComponent implements OnInit {
    phoneField = PhoneFieldsDictionary;
    phonesList: PhoneModel[];

    constructor(private phoneService: PhonesService) {}

    ngOnInit(): void {
        this.getArchivList();
    }

    private getArchivList(): void {
        this.phoneService.getArchivList().subscribe(
            (res: PhoneModel[]) => this.phonesList = res
        );
    }
}
