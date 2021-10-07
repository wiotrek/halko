import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepairsService } from '../repairs.service';
import { RepairsAddFieldsArray } from './repairs-add-fields.array';
import { RepairsMapper } from '../repairs.mapper';

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
  point: string;
  fields = RepairsAddFieldsArray;

  constructor(private repairsService: RepairsService) {}

  ngOnInit(): void {
    this.setEmployerField();
    this.getPoint();
  }

  addRepairPhone(f: NgForm): void {
    const newRepairPhone = RepairsMapper.repairAddFormToApi(f, this.point);
    this.repairsService.insertRepairPhone(newRepairPhone);
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

  private getPoint(): void {
    this.point = this.repairsService.getPointName();
  }
}
