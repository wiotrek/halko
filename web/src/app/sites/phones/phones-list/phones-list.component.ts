import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../_models/phone.model';

@Component({
    selector: 'app-phones-list',
    template: `
        <app-phones-seacher
            (searchString)="searchElement($event)"
            (pointString)="selectForPoint($event)"
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

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getPhones();
    }

    searchElement(name: string): void {
        // this.phoneService.phoneList$.subscribe(
        //     (res: PhoneModel[]) => {
        //         this.phonesList = res.filter(
        //             x => x.producer.toLowerCase().includes(name.toLowerCase())
        //             || x.model.toLowerCase().includes(name.toLowerCase())
        //         );
        //     }
        // );
    }

    selectForPoint(pointString: string): void {
        // console.log(pointString);
        // this.phoneService.phoneList$.subscribe(
        //     (res: PhoneModel[]) => {
        //         this.phonesList = res.filter(
        //             x => x.name === pointString
        //         );
        //     }
        // );
    }

    private getPhones(): void {
        this.phoneService.getPhones().subscribe(
            res => this.phonesList = res,
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
