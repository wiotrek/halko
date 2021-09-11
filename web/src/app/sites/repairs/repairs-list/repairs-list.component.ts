import { Component, OnInit } from '@angular/core';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { RepairsModel } from 'src/app/shared/models/repairs.model';
import { RepairsFieldsArray } from './repairs-item.array';
import { RepairsService } from '../repairs.service';
import { RepairsApiGetPagModel } from '../_models/_models-pagination/repairs-api-get-pag.model';
import { RepairsMapper } from '../repairs.mapper';
import { SearcherModel } from '../../../shared/models/searcher.model';

@Component({
    selector: 'app-repairs-list',
    template: `
        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="countIndex(phone)"
            [elInList]="phone"
            [deviceFields]="fields"
            [componentWillUsing]="componentWillUsing"
            [elInListAllowedEdit]="true"
            (componentBeingUsingOutput)="sentToArchive($event)"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="searcher.pageSize"
            [pageIndex]="searcher.pageIndex"
            [elementsAmount]="phoneRepairsAmount"
            (pageIndexChange)="changeSite($event)"
        ></app-la-pagination>
    `
})
export class RepairsListComponent implements OnInit {
    phonesRepairs: RepairsModel[];
    phoneRepairsAmount: number;

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
        this.getRepairsPhones(this.searcher);
    }

    countIndex(phone: RepairsModel): number {
        return (
            this.phonesRepairs.indexOf(phone) + 1
        ) + this.searcher.pageSize * (this.searcher.pageIndex - 1);
    }

    changeSite(pageIndex: number): void {
        this.searcher.pageIndex = pageIndex;
        this.getRepairsPhones(this.searcher);
    }

    sentToArchive(response: { isSuccess: boolean, id: number }): void {
        const giveBackInfo = response.isSuccess ? 'Naprawiony' : 'Nie udało się';
        this.repairsService.insertRepairArchivePhone(giveBackInfo, response.id);
    }

    private getRepairsPhones(searcher: SearcherModel = this.searcher): void {

        this.repairsService.getRepairsPhone(searcher).subscribe(
            (res: RepairsApiGetPagModel) => {

                // unnecessary to pagination
                this.searcher.pageIndex = res.pageIndex;
                this.phoneRepairsAmount = res.count;

                this.phonesRepairs = res.data.map(
                    repair => RepairsMapper.repairRawModelToRepairModel(repair)
                );
            }
        );
    }
}
