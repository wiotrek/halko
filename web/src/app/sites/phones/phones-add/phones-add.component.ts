import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhonesService } from '../phones.service';
import { PhoneFields } from '../_dictionary/phone-fields.dictionary';
import { PhoneStates } from '../_dictionary/phone-states.dictionary';
import { PhoneAddModel } from '../_models/phone-add.model';

@Component({
    selector: 'app-phones-add',
    templateUrl: './phones-add.component.html',
    styleUrls: ['./phones-add.component.scss']
})
export class PhonesAddComponent {
    fields = PhoneFields;
    phoneStates = PhoneStates;

    constructor(
        private phonesService: PhonesService,
    ) {}

    addNewPhone(f: NgForm): void {
        const phone: PhoneAddModel = {
            producer: f.value.producer,
            model: f.value.model,
            imei: f.value.imei,
            color: f.value.color,
            comment: f.value.comment,
            priceBuyed: f.value.priceBuyed,
            price: f.value.price,
            deviceState: {
                state: f.value.state,
            },
            point: {
                name: 'Punkt'
            }
        };

        this.phonesService.insertNewPhone(phone);
    }
}
