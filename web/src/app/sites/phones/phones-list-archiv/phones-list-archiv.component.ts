import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';
import { SearcherModel } from '../_models/searcher.model';

@Component({
    selector: 'app-phones-list-archiv',
    template: `
        <app-phones-seacher></app-phones-seacher>

        <app-phones-archiv
            *ngFor="let phone of phonesList | slice:this.pagination.start:this.pagination.end"
            [elInList]="phone"
            [ind]="phonesList.indexOf(phone) + 1"
        ></app-phones-archiv>

        <app-la-pagination
            [pageSize]="this.pagination.pageSize"
            [arrLength]="this.pagination.arrLength"
            [(start)]="this.pagination.start"
            [(end)]="this.pagination.end"
        ><app-la-pagination>
    `
})
export class PhonesListArchivComponent implements OnInit {
    phonesList: PhoneModel[];

    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: ''
    };

    pointName = '';

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
        this.getPointName();
        this.getPhones();
    }

    private getPhones(): void {
        this.phoneService.getArchivList().subscribe(
            res => {
                this.pagination.arrLength = res.length;
                this.phonesList = res;
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
