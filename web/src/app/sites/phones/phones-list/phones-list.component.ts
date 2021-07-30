import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher></app-phones-seacher>
        <app-phones-item
            *ngFor="let phone of phonesList; index as i"
            [elInList]="phone"
            [ind]="i + 1"
        ></app-phones-item>
    `
})
export class PhonesListComponent implements OnInit {
    phonesList: PhoneModel[];

    constructor(private phoneService: PhonesService) {}

    ngOnInit(): void {
        this.getPhones();
    }

    private getPhones(): void {
        this.phoneService.phoneList$.subscribe(
            (res: PhoneModel[]) => this.phonesList = res
        );
    }
}
