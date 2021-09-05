import {Component, OnInit} from '@angular/core';
import { RepairsArchiveItemArray } from './repairs-archive.array';
import { RepairsModel } from '../../../shared/models/repairs.model';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { RepairsService } from '../repairs.service';
import { SearcherModel } from '../../../shared/models/searcher.model';

@Component({
    selector: 'app-repairs-archive',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            (searchNameFilter)="searchNameFilter($event)"
        ></app-searcher>

        <app-phone-in-list
            *ngFor="let phone of phonesRepairs | slice:pagination.start:pagination.end"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsArchiveItemArray"
        ></app-phone-in-list>

        <app-la-pagination
            [pageSize]="pagination.pageSize"
            [arrLength]="pagination.arrLength"
            [(start)]="pagination.start"
            [(end)]="pagination.end"
        ></app-la-pagination>
    `
})
export class RepairsArchiveComponent implements OnInit {
    repairsArchiveItemArray = RepairsArchiveItemArray;

    searcherPattern: SearcherPatternModel = {
        sorting: false,
        filterNewUsed: false,
        filterPoints: false
    };

    phonesRepairs: RepairsModel[] = [];

    // searcher property will for getting from api
    // searcher is using in every functions
    searcher: SearcherModel = {
        pointName: '',
        searchName: '',
        state: ''
    };

    pagination = {
        pageSize: 10,
        start: 0,
        end: 10,
        arrLength: 0
    };

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.getRepairsArchivePhones();
    }

    private getRepairsArchivePhones(
        searcher: SearcherModel = this.searcher
    ): void {
        this.repairsService.getRepairArchivePhone(searcher).subscribe(
            res => this.phonesRepairs = res
        );
    }

    searchNameFilter(searchName: string): void {
        this.searcher.searchName = searchName;
        this.getRepairsArchivePhones(this.searcher);
    }
}
