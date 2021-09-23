import { Component, OnInit } from '@angular/core';
import { ParticipantsMgmtListFieldsArray } from './participants-mgmt-list-fields.array';
import { Employees } from 'src/app/shared/models/employees.model';
import { AdminService } from '../../../admin.service';
import { ChangeUserPswdFieldsArray } from './change-user-pswd-fields.array';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-participants-list',
    template: `
        <button
            class="creator-btn"
            (click)="listEmployessMod = !listEmployessMod"
        >
            {{!listEmployessMod ? 'Cofnij' : 'Zmień haslo użytkownika'}}
        </button>

        <ng-container *ngIf="listEmployessMod; else changePswdMod">

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

        </ng-container>

        <ng-template #changePswdMod>

            <p>login punktu jest traktowany jako uzytkownik</p>

            <app-adder-phone
                [fields]="changeUserPswdFieldsArray"
                (outputElement)="changeUserPswd($event)"
            ></app-adder-phone>

        </ng-template>
    `,
    styleUrls: ['../../_style/mgmt.scss']
})
export class ParticipantsListComponent implements OnInit {
    // fields to list
    participantsMgmtListFieldsArray = ParticipantsMgmtListFieldsArray;

    // fields to edit password
    changeUserPswdFieldsArray = ChangeUserPswdFieldsArray;

    listEmployessMod = true;

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

    changeUserPswd(dateToChange: NgForm): void {
        this.adminService.changeUserPassword(dateToChange.value);
    }
}
