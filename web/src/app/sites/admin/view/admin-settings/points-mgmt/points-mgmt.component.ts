import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-points-mgmt',
    templateUrl: './points-mgmt.component.html',
    styleUrls: ['./points-mgmt.component.scss']
})
export class PointsMgmtComponent implements OnInit{
    pointCreatorMod = false;
    pointsList: string[];

    pointForm: FormGroup;

    constructor(
        private adminService: AdminService,
        private fb: FormBuilder
    ) {
        this.pointForm = fb.group({
            login: ['', [Validators.required]],
            pointName: ['', [Validators.required]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    }

    ngOnInit(): void {
        this.adminService.getPointList().subscribe(
            (res: string[]) => this.pointsList = res
        );
    }

    addNewPoint(): void {
        this.adminService.addNewPoint(this.pointForm.value);
    }
}
