import { Component, Input } from '@angular/core';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { PhonesService } from 'src/app/sites/phones/phones.service';

@Component({
    selector: 'app-phones-sold',
    templateUrl: './phones-sold.component.html',
    styleUrls: ['./phones-sold.component.scss']
})
export class PhonesSoldComponent {
    @Input() elInList: PhoneModel;

    faMobileAlt = faMobileAlt;

    constructor(
        private phonesService: PhonesService
    ) {}

    soldPhoneFunc(f: NgForm): void {
        this.phonesService.sellPhone(
            this.elInList.id, f.value.price
        );
    }
}
