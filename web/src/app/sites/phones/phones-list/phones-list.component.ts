import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../../../shared/models/searcher.model';
import { SearcherPatternModel } from '../../../shared/components/searcher/_models/searcher-pattern.model';
import { Point } from '../../../shared/models/point.model';
import { SortingVectorModel } from '../../../shared/components/searcher/_models/sorting-vector.model';
import { SortingPhonesClass } from '../../../shared/classes/sorting-phones.class';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            [points]="pointsList"
            [defaultPoint]="pointName"
            (searchNameFilter)="searchNameFilter($event)"
            (pointFilter)="pointFilter($event)"
            (stateFilter)="stateFilter($event)"
            (sorting)="sorting($event)"
        ></app-searcher>

        <app-phones-item
            *ngFor="let phone of phonesList"
            [elInList]="phone"
            [ind]="countIndex(phone)"
            (refreshPhoneList)="this.getPhones()"
        ></app-phones-item>

        <app-la-pagination
            [pageSize]="searcher.pageSize"
            [pageIndex]="searcher.pageIndex"
            [elementsAmount]="phonesAmount"
            (pageIndexChange)="changeSite($event)"
        ></app-la-pagination>
    `
})
export class PhonesListComponent implements OnInit {

    // main list
    phonesList: PhoneModel[];

    // information about amount getting from api
    phonesAmount: number;

    // for points
    pointName: string;
    pointsList: Point[];

    // setting property which searcher must be using
    searcherPattern: SearcherPatternModel = {
        sorting: true,
        filterNewUsed: true,
        filterPoints: true
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
        this.getPoints();
        this.getPhones(this.searcher);
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

    searchNameFilter(name: string): void {
        this.searcher.searchName = name;
        this.getPhones(this.searcher);
    }

    pointFilter(pointString: string): void {
        this.searcher.pointName = pointString;
        this.getPhones(this.searcher);
    }

    stateFilter(stateString: string): void {
        this.searcher.state = stateString;
        this.getPhones(this.searcher);
    }

    sorting(val: SortingVectorModel): void {
        this.getPhones(this.searcher, val);
    }

    private getPhones(
        searcher: SearcherModel = this.searcher,
        sorted: SortingVectorModel = null
    ): void {
        this.phoneService.getPhones(searcher).subscribe(
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

    private getPoints(): void {
        // set current point name
        this.pointName = this.phoneService.pointName;
        this.searcher.pointName = this.pointName;

        // set points list
        this.phoneService.getListPoints().subscribe(
            res => this.pointsList = res
        );
    }
}
