import { Component } from '@angular/core';
import { PhoneInListDetailsCptsDirectory } from 'src/app/shared/directory/phone-in-list-details-cpts.directory';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsItemDirectory } from './repairs-item.directory';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsItemDictionary"
            [componentWillUsing]="componentWillUsing"
        ></app-phone-in-list>
    `
})
export class RepairsListComponent {
    repairsItemDictionary = RepairsItemDirectory;

    componentWillUsing = PhoneInListDetailsCptsDirectory.RepairsToArchiveComponent;

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
