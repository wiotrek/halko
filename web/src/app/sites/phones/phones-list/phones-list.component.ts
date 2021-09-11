import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhonesService } from '../phones.service';
import { PhoneModel } from '../../../shared/models/phone.model';
import { SearcherModel } from 'src/app/shared/models/searcher.model';
import { SearcherPatternModel } from 'src/app/shared/components/searcher/_models/searcher-pattern.model';
import { Point } from 'src/app/shared/models/point.model';
import { SortingVectorModel } from 'src/app/shared/components/searcher/_models/sorting-vector.model';
import { PhoneFieldsArray } from './phones-fields.array';
import { PhoneInListDetailsCptsArray } from 'src/app/shared/array/phone-in-list-details-cpts.array';
import { PhonesExtendResultsModel } from 'src/app/shared/components-specific/phones-extend/_models/phones-extend-results.model';
import { OperationsNameEnum } from 'src/app/shared/components-specific/phones-extend/_enums/operations-name.enum';
import { ResponseDictionary } from 'src/app/shared/dictionary/response.dictionary';
import { ErrorsDictionary } from 'src/app/shared/dictionary/errors.dictionary';
import { NgForm } from '@angular/forms';
import { PhoneInListType } from 'src/app/shared/models-union/phone-in-list.type';
import { PhoneEditModel } from '../_models/phone-edit.model';

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

        <app-phone-in-list
            *ngFor="let phone of phonesList"
            [ind]="countIndex(phone)"
            [elInList]="phone"
            [deviceFields]="fields"
            [isExistEditMode]="true"
            [additionally]="pointListMapPointListString(this.pointsList)"
            [componentWillUsing]="componentWillUsing"
            (componentBeingUsingOutput)="phoneBeingSoldOrSend($event)"
            (updateDetails)="updatePhone($event)"

        ></app-phone-in-list>

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

    // list of fields will be using to generate component
    fields = PhoneFieldsArray;

    // information about amount getting from api
    phonesAmount: number;

    // component using in phone in list details to display options
    // like sell or send phone
    componentWillUsing = PhoneInListDetailsCptsArray.PhonesExtendComponent;

    // for points
    pointName: string;
    pointsList: Point[];

    // setting property which searcher must be using
    searcherPattern: SearcherPatternModel = {
        sorting: false,
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


    // for pagination
    countIndex(phone: PhoneModel): number {
        return (
            this.phonesList.indexOf(phone) + 1
        ) + this.searcher.pageSize * (this.searcher.pageIndex - 1);
    }

    changeSite(pageIndex: number): void {
        this.searcher.pageIndex = pageIndex;
        this.getPhones(this.searcher);
    }


    // for filter and sorting
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


    // for phone in list component
    updatePhone(
        response: { update: NgForm, elInList: PhoneInListType }
    ): void {
        const editPhone: PhoneEditModel = {
            producer: response.update.value.producer,
            model: response.update.value.model,
            color: response.update.value.model,
            comment: response.update.value.comment,
            priceBuyed: response.update.value.priceBuyed,
            price: response.update.value.price,
            deviceState: {
                state: response.update.value.state
            }
        };

        const oldPhone = response.elInList as PhoneModel;

        this.phoneService.editPhone(editPhone, oldPhone.id).subscribe(
            () => {
                this.getPhones(this.searcher);
                this.toastr.success(ResponseDictionary.change);
            },
            (err: HttpErrorResponse) => err
                ? this.toastr.error(err.error.message)
                : this.toastr.error(ErrorsDictionary.bad)
        );
    }

    // operations from phones extend
    // may sell phones or move to another point
    phoneBeingSoldOrSend(result: PhonesExtendResultsModel): void {

        // operation sell phone
        if (result.operationName === OperationsNameEnum.sellPhone) {
            this.phoneService.sellPhone(
                result.phoneId, result.priceSold
            ).subscribe(
                () => {
                    this.getPhones(this.searcher);
                    this.toastr.success(ResponseDictionary.archive);
                },
                (err: HttpErrorResponse) => err
                    ? this.toastr.error(err.error.message)
                    : this.toastr.error(ErrorsDictionary.bad)
            );
        }

        // operation move phone to another point
        else if (result.operationName === OperationsNameEnum.movePhone) {
            this.phoneService.movePhone(
                result.phoneId, result.pointName
            ).subscribe(
                () => {
                    this.getPhones(this.searcher);
                    this.toastr.success(ResponseDictionary.move);
                },
                (err: HttpErrorResponse) => err
                    ? this.toastr.error(err.error.message)
                    : this.toastr.error(ErrorsDictionary.bad)
            );
        }
    }

    // this function is using only in phones extend
    pointListMapPointListString(pointList: Point[]): string[] {
        return pointList.filter(
                x => x.id > 0 && x.name !== this.pointName
        ).map(x => x.name);
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
