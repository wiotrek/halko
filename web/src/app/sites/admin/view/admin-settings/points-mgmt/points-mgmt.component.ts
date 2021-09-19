import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-points-mgmt',
    templateUrl: './points-mgmt.component.html',
    styleUrls: ['./points-mgmt.component.scss']
})
export class PointsMgmtComponent {
    pointCreatorMod = false;
    pointsList: string[];

    credentials: FormGroup;

    constructor(private adminService: AdminService) {
        this.pointsList = this.adminService.pointList;

        this.credentials = new FormGroup({});
        this.credentials.addControl('password', new FormControl('', [Validators.required]));
        this.credentials.addControl('passwordConfirm', new FormControl(
            '', [Validators.compose(
                [Validators.required, this.validateAreEqual.bind(this)]
            )]
        ));
    }

    addNewPoint(f: NgForm): void {
        console.log(this.credentials);
    }

    private validateAreEqual(fieldControl: FormControl): any {
        return fieldControl.value === this.credentials.get('password').value ? null : {
            NotEqual: true
        };
    }
}
