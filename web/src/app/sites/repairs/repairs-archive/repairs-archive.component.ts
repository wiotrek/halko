import {Component, OnInit} from '@angular/core';
import { RepairsArchiveItemArray } from './repairs-archive.array';
import { RepairsModel } from '../../../shared/models/repairs.model';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { RepairsService } from '../repairs.service';

@Component({
    selector: 'app-repairs-archive',
    template: `
        <app-searcher
            [searcherPattern]="searcherPattern"
            (searchNameFilter)="searchNameFilter($event)"
        ></app-searcher>

        <app-phone-in-list
            *ngFor="let phone of phonesRepairs"
            [ind]="phonesRepairs.indexOf(phone) + 1"
            [elInList]="phone"
            [deviceFields]="repairsArchiveItemArray"
        ></app-phone-in-list>
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

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.repairsService.phonesRepairs$.subscribe(
            res => this.phonesRepairs = res
        );
    }

    searchNameFilter(searchName: string): void {
        return;
    }
}
