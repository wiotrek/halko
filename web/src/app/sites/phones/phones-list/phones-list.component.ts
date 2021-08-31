import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../../../shared/models/searcher.model';
import { SearcherPatternModel } from '../../../shared/components/searcher/_models/searcher-pattern.model';
import { Point } from '../../../shared/models/point.model';
import { SortingVectorModel } from '../../../shared/components/searcher/_models/sorting-vector.model';
import { SortingValueConst } from '../../../shared/components/searcher/_consts/sorting-value.const';

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
            *ngFor="let phone of phonesList | slice:start:end"
            [elInList]="phone"
            [ind]="phonesList.indexOf(phone) + 1"
            (refreshPhoneList)="this.getPhones()"
        ></app-phones-item>

        <app-la-pagination
            [pageSize]="pageSize"
            [arrLength]="arrLength"
            [(start)]="start"
            [(end)]="end"
        ></app-la-pagination>
    `
})
export class PhonesListComponent implements OnInit {

    // main list
    phonesList: PhoneModel[];

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
        state: ''
    };

    // pagination
    readonly pageSize = 10;
    start = 0;
    end = 10;
    arrLength = 0;

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPoints();
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
                this.arrLength = res.length;

                if (sorted) {
                    switch (sorted) {

                        case SortingValueConst[0]:
                            this.phonesList = res.sort(
                                (a, b) => a.producer.localeCompare(b.producer)
                            );
                            break;

                        case SortingValueConst[1]:
                            this.phonesList = res.sort(
                                (a, b) => b.producer.localeCompare(a.producer)
                            );
                            break;

                        case SortingValueConst[2]:
                            this.phonesList = res.sort(
                                (a, b) => a.price - b.price
                            );
                            break;

                        case SortingValueConst[3]:
                            this.phonesList = res.sort(
                                (a, b) => b.price - a.price
                            );
                            break;
                    }
                } else {
                    // default is sorting on producer up
                    this.phonesList = res.
                        sort((a, b) => a.producer.localeCompare(b.producer));
                }
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
