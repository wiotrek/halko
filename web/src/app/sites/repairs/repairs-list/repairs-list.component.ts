import { Component } from '@angular/core';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsItemArray } from './repairs-item.array';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsItemArray"
            [componentWillUsing]="componentWillUsing"
        ></app-phone-in-list>
    `
})
export class RepairsListComponent {
    repairsItemArray = RepairsItemArray;

    componentWillUsing = PhoneInListDetailsCptsArray.RepairsToArchiveComponent;

    phonesRepairs: RepairsModel[] = [
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
