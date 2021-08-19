import { Component } from '@angular/core';
import { RepairModel } from 'src/app/shared/models/repair.model';
import { RepairsItemDictionary } from './repairs-item.dictionary';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsItemDictionary"
        ></app-phone-in-list>
    `
})
export class RepairsListComponent {
    repairsItemDictionary = RepairsItemDictionary;

    phonesRepairs: RepairModel[] = [
        {
            phoneName: 'apple iphone 7',
            imei: '1231321312',
            owner: 'Jan Kowlaski',
            ownerPhoneNumber: '123123123',
            description: 'popsuty bla bla',
            pickUpDate: '10.10.2021',
            employer: 'Jurek',
            pointName: 'Karuzela Września'
        }
    ];
}
