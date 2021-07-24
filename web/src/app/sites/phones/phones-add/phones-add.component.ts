import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhoneFields } from '../_dictionary/phone-fields.dictionary';
import { PhoneStates } from '../_dictionary/phone-states.dictionary';

@Component({
    selector: 'app-phones-add',
    templateUrl: './phones-add.component.html',
    styleUrls: ['./phones-add.component.scss']
})
export class PhonesAddComponent {
    fields = PhoneFields;
    phoneStates = PhoneStates;

    addNewPhone(f: NgForm): void {
        console.log(f.value);
    }
}
