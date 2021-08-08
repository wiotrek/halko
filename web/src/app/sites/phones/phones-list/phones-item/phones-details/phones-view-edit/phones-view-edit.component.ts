import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorsDictionary } from 'src/app/shared/directory/errors.directory';
import { ResponseDictionary } from 'src/app/shared/directory/response.directory';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneStates } from 'src/app/sites/phones/_dictionary/phone-states.dictionary';
import { PhoneEditModel } from 'src/app/sites/phones/_models/phone-edit.model';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';

@Component({
    selector: 'app-phones-view-edit',
    templateUrl: './phones-view-edit.component.html',
    styleUrls: ['./phones-view-edit.component.scss']
})
export class PhonesViewEditComponent {
    @Input() elInList: PhoneModel;
    @Input() editMode: boolean;

    phoneStates = PhoneStates;

    constructor(
        private phoneService: PhonesService,
        private toastr: ToastrService
    ) {}

    updatePhoneFunc(f: NgForm): void {

        const phone: PhoneEditModel = {
            producer: f.value.producer,
            model: f.value.model,
            color: f.value.color,
            comment: f.value.comment,
            priceBuyed: f.value.priceBuyed,
            price: f.value.price,
            deviceState: {
                state: f.value.state
            }
        };

        this.phoneService.editPhone(
            phone, this.elInList.id.toString()
        ).subscribe(
            () => {
                this.toastr.success(ResponseDictionary.change);
                Object.assign(this.elInList, f.value as PhoneModel);
            },
            () => this.toastr.error(ErrorsDictionary.bad)
        );
    }
}
