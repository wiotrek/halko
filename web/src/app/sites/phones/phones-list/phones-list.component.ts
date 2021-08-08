import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { SortingValues } from '../_dictionary/sorting-values.dictionary';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../_models/searcher.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher
            [defaultPoint]="pointName"
            (searchString)="searchElement($event)"
            (pointString)="selectForPoint($event)"
            (stateString)="selectStates($event)"
            (sortingDevice)="selectSortingDevice($event)"
        ></app-phones-seacher>
        <app-phones-item
            *ngFor="let phone of phonesList; index as i"
            [elInList]="phone"
            [ind]="i + 1"
            (refreshPhoneList)="this.getPhones()"
        ></app-phones-item>
    `
})
export class PhonesListComponent implements OnInit {
    phonesList: PhoneModel[];
    pointName: string;
    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: ''
    };

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPointName();
        this.getPhones(this.searcher);
    }

    searchElement(name: string): void {
        this.searcher.searchName = name;
        this.getPhones(this.searcher);
    }

    selectForPoint(pointString: string): void {
        this.searcher.pointName = pointString;
        this.getPhones(this.searcher);
    }

    selectStates(stateString: string): void {
        this.searcher.state = stateString;
        this.getPhones(this.searcher);
    }

    selectSortingDevice(val: {name: string, vector: string}): void {
        this.getPhones(this.searcher, val);
    }

    private getPhones(
        searcher: SearcherModel = this.searcher,
        sorted: {name: string, vector: string} = null
    ): void {
        this.phoneService.getPhones(searcher).subscribe(
            res => {
                if (sorted) {
                    switch (sorted) {

                        case SortingValues[0]:
                            this.phonesList = res.sort(
                                (a, b) => a.producer.localeCompare(b.producer)
                            );
                            break;

                        case SortingValues[1]:
                            this.phonesList = res.sort(
                                (a, b) => b.producer.localeCompare(a.producer)
                            );
                            break;

                        case SortingValues[2]:
                            this.phonesList = res.sort(
                                (a, b) => a.price - b.price
                            );
                            break;

                        case SortingValues[3]:
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

    private getPointName(): void {
        this.pointName = this.phoneService.pointName;
        this.searcher.pointName = this.pointName;
    }
}
