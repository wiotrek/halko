import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Validation from 'src/app/shared/classes/validation.class';

@Component({
    selector: 'app-points-mgmt',
    templateUrl: './points-mgmt.component.html',
    styleUrls: ['./points-mgmt.component.scss']
})
export class PointsMgmtComponent {
    pointCreatorMod = false;
    pointsList: string[];

    pointForm: FormGroup;

    constructor(
        private adminService: AdminService,
        private fb: FormBuilder
    ) {
        this.pointsList = this.adminService.pointList;

        this.pointForm = fb.group({
            login: ['', [Validators.required]],
            pointName: ['', [Validators.required]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    }

    addNewPoint(): void {
        this.adminService.addNewPoint(this.pointForm.value);
    }
}
