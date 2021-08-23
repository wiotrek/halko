import { Component } from '@angular/core';
import { RepairModel } from 'src/app/shared/models/repair.model';
import { RepairsArchiveItemDirectory } from './repairs-archive.directory';

@Component({
    selector: 'app-repairs-archive',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsArchiveItemDirectory"
            [componentWillUsing]="componentWillUsing"
        ></app-phone-in-list>
    `
})
export class RepairsArchiveComponent {
    repairsArchiveItemDirectory = RepairsArchiveItemDirectory;

    phonesRepairs: RepairModel[] = [
        {
            phoneName: 'apple iphone 8',
            imei: '12313212322',
            owner: 'Michał Nowak',
            ownerPhoneNumber: '123123123',
            description: 'chyba zrobiony',
            pickUpDate: '10.10.2021',
            employer: 'Jurek',
            pointName: 'Karuzela Września',
            isReturn: true,
            returnDate: '17.10.2021',
            isSuccess: true
        }
    ];
}
