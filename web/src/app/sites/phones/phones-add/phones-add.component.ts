import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhonesService } from '../phones.service';
import { PhoneFieldsArray } from '../_array/phone-fields.array';
import { PhoneStatesArray } from '../_array/phone-states.array';
import { PhoneAddModel } from '../_models/phone-add.model';

@Component({
    selector: 'app-phones-add',
    templateUrl: './phones-add.component.html',
    styleUrls: ['./phones-add.component.scss']
})
export class PhonesAddComponent {
    fields = PhoneFieldsArray;
    phoneStates = PhoneStatesArray;

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
