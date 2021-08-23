import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorsDictionary } from 'src/app/shared/dictionary/errors.dictionary';
import { ResponseDictionary } from 'src/app/shared/dictionary/response.dictionary';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneStatesDirectory } from 'src/app/sites/phones/_directory/phone-states.directory';
import { PhoneEditModel } from 'src/app/sites/phones/_models/phone-edit.model';
import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { PhonesViewEditFieldDirectory } from './phones-view-edit-field.directory';

@Component({
    selector: 'app-phones-view-edit',
    templateUrl: './phones-view-edit.component.html',
    styleUrls: ['./phones-view-edit.component.scss']
})
export class PhonesViewEditComponent {
    @Input() elInList: PhoneModel;
    @Input() editMode: boolean;

    @Output() doneAction: EventEmitter<string> = new EventEmitter();

    phonesItemField = PhonesViewEditFieldDirectory;
    phoneStates = PhoneStatesDirectory;

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
                this.doneAction.emit();
            },
            () => this.toastr.error(ErrorsDictionary.bad)
        );
    }
}
