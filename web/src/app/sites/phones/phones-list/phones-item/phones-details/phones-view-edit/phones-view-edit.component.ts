import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhonesService } from 'src/app/sites/phones/phones.service';
import { PhoneStates } from 'src/app/sites/phones/_dictionary/phone-states.dictionary';
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
        private phoneService: PhonesService
    ) {}

    updatePhoneFunc(f: NgForm): void {
        const phoneRaw = f.value as PhoneModel;

        // assign all field to elInList
        Object.assign(this.elInList, phoneRaw);

        this.phoneService.updatePhone(this.elInList);
    }
}
