import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepairsService } from '../repairs.service';
import { RepairsAddFieldsDirectory } from './repairs-add-fields.directory';

@Component({
    selector: 'app-repairs-add',
    template: `
        <app-adder-phone
            [fields]="fields"
            (outputElement)="addRepairPhone($event)"
        ></app-adder-phone>
    `
})
export class RepairsAddComponent implements OnInit {
    fields = RepairsAddFieldsDirectory;

    constructor(private repairsService: RepairsService) {}

    ngOnInit(): void {
        this.setEmployerField();
    }

    addRepairPhone(f: NgForm): void {
        console.log(f.value);
    }

    private setEmployerField(): void {
        this.repairsService.getEmployees().subscribe(
            res => {
                this.fields.find(
                    x => x.category === 'employer'
                ).forOptSelect = res.map(({initial}) => initial);
            }
        );
    }
}
