import { Component, OnInit } from '@angular/core';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsFieldsArray } from './repairs-item.array';
import { RepairsService } from '../repairs.service';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs | slice:pagination.start:pagination.end"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="fields"
            [componentWillUsing]="componentWillUsing"
            (componentBeingUsingOutput)="sentToArchive($event)"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="pagination.pageSize"
            [arrLength]="pagination.arrLength"
            [(start)]="pagination.start"
            [(end)]="pagination.end"
        ></app-la-pagination>
    `
})
export class RepairsListComponent implements OnInit {
    phonesRepairs: RepairsModel[];

    fields = RepairsFieldsArray;

    componentWillUsing = PhoneInListDetailsCptsArray.RepairsToArchiveComponent;

    pagination = {
        pageSize: 10,
        start: 0,
        end: 10,
        arrLength: 0
    };

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.getRepairsPhones();
    }

    sentToArchive(response: { isSuccess: boolean, id: number }): void {
        const giveBackInfo = response.isSuccess ? 'Naprawiony' : 'Nie udało się';
        this.repairsService.insertRepairArchivePhone(giveBackInfo, response.id);
    }

    private getRepairsPhones(): void {
        this.repairsService.getRepairsPhone().subscribe(
            res => this.phonesRepairs = res
        );
    }
}
