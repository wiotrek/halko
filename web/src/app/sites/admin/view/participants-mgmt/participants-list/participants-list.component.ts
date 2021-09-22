import { Component, OnInit } from '@angular/core';
import { ParticipantsMgmtListFieldsArray } from './participants-mgmt-list-fields.array';
import { Employees } from 'src/app/shared/models/employees.model';
import { AdminService } from '../../../admin.service';

@Component({
    selector: 'app-participants-list',
    template: `
        <select
            class="changer"
            [(ngModel)]="currentPoint"
            (change)="getParticipantsList()"
        >

            <option
                *ngFor="let point of pointList"
                [value]="point"
            >
                {{point}}
            </option>

        </select>

        <app-phone-in-list
            *ngFor="let employer of employees"
            [elInList]="employer"
            [deviceFields]="participantsMgmtListFieldsArray"
        ></app-phone-in-list>
    `,
    styleUrls: ['../../_style/mgmt.scss']
})
export class ParticipantsListComponent implements OnInit {
    // fields to list
    participantsMgmtListFieldsArray = ParticipantsMgmtListFieldsArray;

    employees: Employees[] = [];
    pointList: string[] = [];
    currentPoint = 'Karuzela Września';

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.adminService.getPointList().subscribe(
            points => {
                this.pointList = points;
                this.currentPoint = points[0];
                this.getParticipantsList();
            }
        );
    }

    getParticipantsList(): void {
        this.adminService.getParticipantsList(this.currentPoint).subscribe(
            res => this.employees = res
        );
    }
}
