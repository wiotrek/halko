import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { Point } from 'src/app/sites/phones/_models/point.model';

@Component({
    selector: 'app-phones-transfer',
    templateUrl: './phones-transfer.component.html',
    styleUrls: ['./phones-transfer.component.scss']
})
export class PhonesTransferComponent implements OnInit, OnDestroy {
    @Input() elInList: PhoneModel;

    show = true;

    points: Point[];

    subscription: Subscription;

    constructor(private phonesService: PhonesService) {}

    ngOnInit(): void {
        this.getListPoints();
    }

    transferPhoneFunc(f: NgForm): void {
        this.phonesService.movePhone(
            this.elInList.id, f.value.point
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
