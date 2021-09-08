import {Component, OnInit} from '@angular/core';
import { RepairsArchiveItemArray } from './repairs-archive.array';
import { RepairsModel } from '../../../shared/models/repairs.model';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { RepairsService } from '../repairs.service';
import { SearcherModel } from '../../../shared/models/searcher.model';
import { NgForm } from '@angular/forms';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { RepairsApiGetPagModel } from '../_models/_models-pagination/repairs-api-get-pag.model';
import { RepairsMapper } from '../repairs.mapper';

@Component({
    selector: 'app-repairs-archive',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            (searchNameFilter)="searchNameFilter($event)"
        ></app-searcher>

        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="countIndex(phone)"
            [elInList]="phone"
            [deviceFields]="repairsArchiveItemArray"
            [isExistEditMode]="true"
            (updateDetails)="editRepairsArchive($event)"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="searcher.pageSize"
            [pageIndex]="searcher.pageIndex"
            [elementsAmount]="phoneRepairsAmount"
            (pageIndexChange)="changeSite($event)"
        ></app-la-pagination>
    `
})
export class RepairsArchiveComponent implements OnInit {
    phonesRepairs: RepairsModel[] = [];
    phoneRepairsAmount: number;

    // include all fields unnecessery to create template
    repairsArchiveItemArray = RepairsArchiveItemArray;

    // searcher pattern applies create pattern in searcher component
    searcherPattern: SearcherPatternModel = {
        sorting: false,
        filterNewUsed: false,
        filterPoints: false
    };

    // searcher property will for getting from api
    // searcher is using in every functions
    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: '',
        pageIndex: 1,
        pageSize: 3,
    };

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.getRepairsArchivePhones(this.searcher);
    }

    countIndex(phone: RepairsModel): number {
        return (
            this.phonesRepairs.indexOf(phone) + 1
        ) + this.searcher.pageSize * (this.searcher.pageIndex - 1);
    }

    changeSite(pageIndex: number): void {
        this.searcher.pageIndex = pageIndex;
        this.getRepairsArchivePhones(this.searcher);
    }

    searchNameFilter(searchName: string): void {
        this.searcher.searchName = searchName;
        this.getRepairsArchivePhones(this.searcher);
    }

    editRepairsArchive(
        response: { update: NgForm, elInList: PhoneInListType}
    ): void {
        return;
    }

    private getRepairsArchivePhones(
        searcher: SearcherModel = this.searcher
    ): void {

        this.repairsService.getRepairArchivePhone(searcher).subscribe(
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
