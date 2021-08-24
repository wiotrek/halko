import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';
import { RepairsAddFieldsDirectory } from './repairs-add-fields.directory';

@Component({
    selector: 'app-repairs-add',
    template: `
        <app-adder-phone
            [fields]="fields"
            (outputElement)="addRepairPhone($event)"
        ><app-adder-phone>
    `
})
export class RepairsAddComponent implements OnInit {
    fields = RepairsAddFieldsDirectory;

    ngOnInit(): void {
        const employer: PhoneFieldsModel = {
            category: 'employer',
            polishName: 'Pracownik',
            isNumber: false,
            required: true,
            special: true,
            forOptSelect: ['Kg']
        };

        this.fields.push(employer);

    }

    addRepairPhone(f: NgForm): void {
        console.log(f.value);
    }
}
