import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher
            (searchString)="searchElement($event)"
        ></app-phones-seacher>
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

    searchElement(name: string): void {
        this.phoneService.phoneList$.subscribe(
            (res: PhoneModel[]) => {
                this.phonesList = res.filter(
                    x => x.producer.toLowerCase().includes(name.toLowerCase())
                    || x.model.toLowerCase().includes(name.toLowerCase())
                );
            }
        );
    }

    private getPhones(): void {
        this.phoneService.phoneList$.subscribe(
            (res: PhoneModel[]) => this.phonesList = res
        );
    }
}
