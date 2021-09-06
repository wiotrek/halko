import { Component, OnInit } from '@angular/core';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsFieldsArray } from './repairs-item.array';
import { RepairsService } from '../repairs.service';
import {RepairsApiGetPagModel} from '../_models/_models-pagination/repairs-api-get-pag.model';
import {RepairsMapper} from '../repairs.mapper';
import {SearcherModel} from '../../../shared/models/searcher.model';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="(phonesRepairs.indexOf(phone) + 1 ) * searcher.pageIndex"
            [elInList]="phone"
            [deviceFields]="fields"
            [componentWillUsing]="componentWillUsing"
            (componentBeingUsingOutput)="sentToArchive($event)"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="searcher.pageSize"
            [amount]="amount"
            [pageIndex]="searcher.pageIndex"
            (pageIndexChange)="changeSite($event)"
        ></app-la-pagination>
    `
})
export class RepairsListComponent implements OnInit {
    phonesRepairs: RepairsModel[];
    amount = 0;

    fields = RepairsFieldsArray;

    componentWillUsing = PhoneInListDetailsCptsArray.RepairsToArchiveComponent;

    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: '',
        pageIndex: 1,
        pageSize: 3,
    };

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.getRepairsPhones();
    }

    changeSite(pageIndex: number): void {
        this.searcher.pageIndex = pageIndex;
        this.getRepairsPhones();
    }

    sentToArchive(response: { isSuccess: boolean, id: number }): void {
        const giveBackInfo = response.isSuccess ? 'Naprawiony' : 'Nie udało się';
        this.repairsService.insertRepairArchivePhone(giveBackInfo, response.id);
    }

    private getRepairsPhones(): void {
        this.repairsService.getRepairsPhone(this.searcher).subscribe(
            (res: RepairsApiGetPagModel) => {

                console.log(res.count);
                // unnecessary to pagination
                this.searcher.pageIndex = res.pageIndex;
                this.amount = res.count;

                this.phonesRepairs = res.data.map(
                    repair => RepairsMapper.repairRawModelToRepairModel(repair)
                );
            }
        );
    }
}
