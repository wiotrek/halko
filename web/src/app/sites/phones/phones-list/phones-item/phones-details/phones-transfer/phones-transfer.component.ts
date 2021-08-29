import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ResponseDictionary } from 'src/app/shared/dictionary/response.dictionary';
import { ErrorsDictionary } from 'src/app/shared/dictionary/errors.dictionary';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { Point } from 'src/app/shared/models/point.model';

@Component({
    selector: 'app-phones-transfer',
    templateUrl: './phones-transfer.component.html',
    styleUrls: ['./phones-transfer.component.scss']
})
export class PhonesTransferComponent implements OnInit, OnDestroy {
    @Input() elInList: PhoneModel;

    @Output() doneAction: EventEmitter<string> = new EventEmitter();


    show = true;

    points: Point[];

    subscription: Subscription;

    constructor(
        private phonesService: PhonesService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.getListPoints();
    }

    transferPhoneFunc(f: NgForm): void {

        this.phonesService.movePhone(
            this.elInList.id, f.value.point
        ).subscribe(
            () => {
                this.doneAction.emit();
                this.toastr.success(ResponseDictionary.move);
            },
            (err: HttpErrorResponse) => err
                ? this.toastr.error(err.error.message)
                : this.toastr.error(ErrorsDictionary.bad)
        );
    }

    private getListPoints(): void {
        const sub = this.phonesService.getListPoints().subscribe(
            (res: Point[]) => {
                this.points = res.filter(
                    x =>
                        x.name !== this.phonesService.pointName
                        && x.id !== -1
                );

                this.show = this.points.length > 0;
            },
            () => this.show = false
        );

        this.subscription = sub;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
