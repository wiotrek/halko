import { Component } from '@angular/core';
import { AdminAddFieldsArray } from './admin-add-fields.array';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
    selector: 'app-admin-add',
    template: `
        <app-adder-phone
            [fields]="adminAddFieldsArray"
            (outputElement)="addAdmin($event)"
        ></app-adder-phone>
    `
})
export class AdminAddComponent {
    creatorMod = false;

    adminAddFieldsArray = AdminAddFieldsArray;

    constructor(private adminService: AdminService) {}

    addAdmin(admin: NgForm): void {
        this.adminService.addAdmin(admin.value);
    }
}
