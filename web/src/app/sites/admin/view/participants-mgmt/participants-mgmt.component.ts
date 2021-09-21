import {Component, OnInit} from '@angular/core';
import { ParticipantsMgmtFieldsArray } from './_arrays/participants-mgmt-fields.array';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Employees } from 'src/app/shared/models/employees.model';
import { ParticipantsMgmtListFieldsArray } from './_arrays/participants-mgmt-list-fields.array';

@Component({
    selector: 'app-participants-mgmt',
    templateUrl: './participants-mgmt.component.html',
    styleUrls: ['../_style/mgmt.scss']
})
export class ParticipantsMgmtComponent implements OnInit {
    creatorMod = false;

    // fields to adder
    participantsMgmtFieldsArray = ParticipantsMgmtFieldsArray;

    // fields to list
    participantsMgmtListFieldsArray = ParticipantsMgmtListFieldsArray;

    employees: Employees[] = [];

    pointList: string[] = [];
    currentPoint = 'Karuzela Września';

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.adminService.getPointList().subscribe(
            points => {
                this.participantsMgmtFieldsArray.find(
                    x => x.category === 'pointName'
                ).forOptSelect = points;
                this.pointList = points;
                this.currentPoint = points[0];
            }
        );

        this.getParticipantsList();
    }

    getParticipantsList(): void {
        this.adminService.getParticipantsList(this.currentPoint).subscribe(
            res => this.employees = res
        );
    }

    addParticipants(f: NgForm): void {
        this.adminService.addParticipant(f.value);
        this.getParticipantsList();
    }
}
