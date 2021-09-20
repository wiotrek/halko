import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-points-mgmt',
    templateUrl: './points-mgmt.component.html',
    styleUrls: ['./points-mgmt.component.scss']
})
export class PointsMgmtComponent {
    pointCreatorMod = false;
    pointsList: string[];

    constructor(private adminService: AdminService) {
        this.pointsList = this.adminService.pointList;
    }

    addNewPoint(f: NgForm): void {
        this.adminService.addNewPoint(f.value);
    }
}
