import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { Point } from 'src/app/sites/phones/_models/point.model';

@Component({
    selector: 'app-phones-transfer',
    templateUrl: './phones-transfer.component.html',
    styleUrls: ['./phones-transfer.component.scss']
})
export class PhonesTransferComponent implements OnInit {
    @Input() elInList: PhoneModel;

    points: Point[];

    constructor(private phonesService: PhonesService) {}

    ngOnInit(): void {
        this.getListPoints();
    }

    transferPhoneFunc(f: NgForm): void {
        console.log(f.value);
    }

    private getListPoints(): void {
        this.phonesService.getListPoints().subscribe(
            (res: Point[]) => this.points = res
        );
    }
}
