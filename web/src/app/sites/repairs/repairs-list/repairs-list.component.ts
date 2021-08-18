import { Component } from '@angular/core';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-repairs-item
            *ngFor="let phone of repairs"
            [ind]="repairs.indexOf(phone) + 1"
            [elInList]="phone"
        ></app-repairs-item>
    `
})
export class RepairsListComponent {
    repairs = [
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
