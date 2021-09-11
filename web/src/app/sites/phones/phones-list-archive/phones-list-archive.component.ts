import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../../../shared/models/phone.model';
import { PhonesArchiveFieldsArray } from './phones-list-archive.array';
import { SearcherPatternModel } from '../../../shared/components/searcher/_models/searcher-pattern.model';
import { SortingVectorModel } from '../../../shared/components/searcher/_models/sorting-vector.model';
import { SearcherModel } from 'src/app/shared/models/searcher.model';

@Component({
    selector: 'app-phones-list-archive',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            (searchNameFilter)="searchNameFilter($event)"
            (sorting)="sorting($event)"
        ></app-searcher>

        <app-phone-in-list
            *ngFor="let phone of phonesList"
            [ind]="phonesList.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="phonesArchiveFieldsConst"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="searcher.pageSize"
            [pageIndex]="searcher.pageIndex"
            [elementsAmount]="phonesAmount"
            (pageIndexChange)="changeSite($event)"
        ></app-la-pagination>
    `
})
export class PhonesListArchiveComponent implements OnInit {
    phonesList: PhoneModel[];

    // information about amount getting from api
    phonesAmount: number;

    phonesArchiveFieldsConst = PhonesArchiveFieldsArray;

    // setting property which searcher must be using
    searcherPattern: SearcherPatternModel = {
        sorting: true,
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
        pageSize: 10,
    };

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPhones();
    }

    countIndex(phone: PhoneModel): number {
        return (
            this.phonesList.indexOf(phone) + 1
        ) + this.searcher.pageSize * (this.searcher.pageIndex - 1);
    }

    changeSite(pageIndex: number): void {
        this.searcher.pageIndex = pageIndex;
        this.getPhones(this.searcher);
    }

    // to do
    searchNameFilter(searchName: string): void {
        this.searcher.searchName = searchName;
        this.getPhones(this.searcher);
    }

    // to do
    sorting(sort: SortingVectorModel): void {
        // this.getPhones(sort);
    }

    private getPhones(searcher: SearcherModel = this.searcher): void {
        this.phoneService.getArchivList(searcher).subscribe(
            res => {
                // unnecessery values to setting pagination
                this.searcher.pageIndex = res.pageIndex;
                this.phonesAmount = res.count;

                // default sorting is for producer,and is alphabetic
                this.phonesList = res.data;
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
