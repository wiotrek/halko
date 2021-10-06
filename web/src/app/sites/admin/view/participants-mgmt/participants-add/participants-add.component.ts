import { Component, OnInit } from '@angular/core';
import { ParticipantsMgmtFieldsArray } from './participants-mgmt-fields.array';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-participants-add',
  template: `
        <app-adder-phone
            [fields]="participantsMgmtFieldsArray"
            (outputElement)="addParticipants($event)"
        ></app-adder-phone>
    `
})
export class ParticipantsAddComponent implements OnInit {
  // fields to adder
  participantsMgmtFieldsArray = ParticipantsMgmtFieldsArray;

  pointList: string[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPointList().subscribe(
      points => {
        this.participantsMgmtFieldsArray.find(
          x => x.category === 'pointName'
        ).forOptSelect = points;
        this.pointList = points;
      }
    );
  }

  addParticipants(f: NgForm): void {
    this.adminService.addParticipant(f.value);
  }
}
