import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../_models/searcher.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher
            (searchString)="searchElement($event)"
            (pointString)="selectForPoint($event)"
            (stateString)="selectStates($event)"
        ></app-phones-seacher>
        <app-phones-item
            *ngFor="let phone of phonesList; index as i"
            [elInList]="phone"
            [ind]="i + 1"
        ></app-phones-item>
    `
})
export class PhonesListComponent implements OnInit {
    phonesList: PhoneModel[];

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
        this.getPhones();
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

    private getPhones(searcher: SearcherModel = this.searcher): void {
        this.phoneService.getPhones(searcher).subscribe(
            res => this.phonesList = res,
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
