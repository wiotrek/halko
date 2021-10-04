import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PricesFieldsArray } from 'src/app/sites/prices/view/_arrays/prices-fields.array';
import { PricesModel } from 'src/app/shared/models/prices.model';
import { PricesService } from 'src/app/sites/prices/prices.service';

@Component({
  selector: 'app-prices-add',
  template: `
    <app-adder-phone
      [fields]="fields"
      (outputElement)="addNewPhone($event)"
    ></app-adder-phone>
  `
})
export class PricesAddComponent {
  fields = PricesFieldsArray;

  constructor(private pricesService: PricesService) {}

  addNewPhone(f: NgForm): void {
    this.pricesService.insertNewPrice(
      f.value as PricesModel
    );
  }
}
