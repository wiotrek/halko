import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhonesService } from '../phones.service';
import { PhoneAddModel } from '../_models/phone-add.model';
import { PhonesAddFieldsArray } from './phones-add-fields.array';

@Component({
  selector: 'app-phones-add',
  template: `
    <app-adder-phone
        [fields]="fields"
        (outputElement)="addNewPhone($event)"
    ></app-adder-phone>
  `
})
export class PhonesAddComponent {
  fields = PhonesAddFieldsArray;

  constructor(private phonesService: PhonesService) {}

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
