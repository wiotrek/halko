import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-phones-sold',
    templateUrl: './phones-sold.component.html',
    styleUrls: ['./phones-sold.component.scss']
})
export class PhonesSoldComponent {
    @Input() elInList: PhoneModel;
    @Output() doneAction: EventEmitter<any> = new EventEmitter();

    faMobileAlt = faMobileAlt;

    constructor(
        private phonesService: PhonesService,
        private toastr: ToastrService
    ) {}

    soldPhoneFunc(f: NgForm): void {
        this.phonesService.sellPhone(
            this.elInList.id, f.value.price
        ).subscribe(
            (res: HttpErrorResponse) => {
                this.toastr.success(res.message);
                this.doneAction.emit();
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
