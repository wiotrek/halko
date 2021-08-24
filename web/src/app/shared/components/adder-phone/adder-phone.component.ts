import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhoneFieldsModel } from '../../models/phone-fields.model';

@Component({
    selector: 'app-adder-phone',
    templateUrl: 'adder-phone.component.html',
    styleUrls: ['adder-phone.component.scss']
})
export class AdderPhoneComponent {
    @Input() fields: PhoneFieldsModel[];
    @Output() outputElement: EventEmitter<NgForm> = new EventEmitter();

    add(f: NgForm): void {
        this.outputElement.emit(f);
    }
}
