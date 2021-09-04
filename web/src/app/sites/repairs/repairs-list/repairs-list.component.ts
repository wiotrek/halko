import { Component, OnInit } from '@angular/core';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsFieldsArray } from './repairs-item.array';
import { RepairsService } from '../repairs.service';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="fields"
            [componentWillUsing]="componentWillUsing"
            (componentBeingUsingOutput)="sentToArchive($event)"
        ></app-phone-in-list>
    `
})
export class RepairsListComponent implements OnInit {
    phonesRepairs: RepairsModel[];

    fields = RepairsFieldsArray;

    componentWillUsing = PhoneInListDetailsCptsArray.RepairsToArchiveComponent;

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.getRepairsPhones();
    }

    sentToArchive(response: { isSuccess: boolean, repairsPhone: RepairsModel }): void {
        console.log(response.repairsPhone);

    }

    private getRepairsPhones(): void {
        this.repairsService.getRepairsPhone().subscribe(
            res => this.phonesRepairs = res
        );
    }
}
