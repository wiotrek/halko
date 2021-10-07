import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { PointsMgmtFieldsAdderArray } from './_arrrays/points-mgmt-fields-adder.array';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-points-mgmt',
  templateUrl: './points-mgmt.component.html',
  styleUrls: [ '../_style/mgmt.scss' ]
})
export class PointsMgmtComponent implements OnInit {
  creatorMod = false;
  pointsList: string[];

  // fields to adder
  pointsMgmtFieldsAdderArray = PointsMgmtFieldsAdderArray;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPointList().subscribe(
      (res: string[]) => this.pointsList = res
    );
  }

  addNewPoint(point: NgForm): void {
    this.adminService.addNewPoint(point.value);
  }
}
