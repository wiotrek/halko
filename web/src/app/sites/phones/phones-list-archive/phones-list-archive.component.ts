import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../../../shared/models/searcher.model';
import { PhonesArchiveFieldsDirectory } from './phones-list-archive.directory';
import {SearcherPatternModel} from '../../../shared/components/searcher/_models/searcher-pattern.model';
import {SortingVectorModel} from '../../../shared/components/searcher/_models/sorting-vector.model';
import {SortingPhonesClass} from '../../../shared/classes/sorting-phones.class';

@Component({
    selector: 'app-phones-list-archive',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            (searchNameFilter)="searchNameFilter($event)"
            (sorting)="sorting($event)"
        ></app-searcher>

        <app-phone-in-list
            *ngFor="let phone of phonesList | slice:this.pagination.start:this.pagination.end"
            [ind]="phonesList.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="phonesArchiveFieldDirectory"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="this.pagination.pageSize"
            [arrLength]="this.pagination.arrLength"
            [(start)]="this.pagination.start"
            [(end)]="this.pagination.end"
        ></app-la-pagination>
    `
})
export class PhonesListArchiveComponent implements OnInit {
    phonesList: PhoneModel[];

    phonesArchiveFieldDirectory = PhonesArchiveFieldsDirectory;

    // setting property which searcher must be using
    searcherPattern: SearcherPatternModel = {
        sorting: true,
        filterNewUsed: false,
        filterPoints: false
    };

    pagination = {
        pageSize: 10,
        start: 0,
        end: 10,
        arrLength: 0
    };

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPhones();
    }

    // to do
    searchNameFilter(searchName: string): void {

    }

    // to do
    sorting(sort: SortingVectorModel): void {
        this.getPhones(sort);
    }

    private getPhones(sorted: SortingVectorModel = null): void {
        this.phoneService.getArchivList().subscribe(
            res => {
                this.pagination.arrLength = res.length;

                // default sorting is for producer,and is alphabetic
                this.phonesList = SortingPhonesClass.sortingPhonesFunc(res, sorted);
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
