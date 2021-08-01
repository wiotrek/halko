import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
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

    updatePhoneFunc(f: NgForm): void {
        console.log(f.value as PhoneModel);
    }
}
