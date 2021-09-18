import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { ItemStructure } from 'src/app/sites/main/_models/item-structure.model';
import { AdminMainFields } from './admin-main-fields.array';

@Component({
    selector: 'app-admin',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
    // fields to generate template
    fields = AdminMainFields;

    // members for calendar
    today: Date;
    choiceDay: string;

    pointCurrent = 'Karuzela Września';

    // main members to config
    pointList: string[];
    soldItems: ItemStructure[];
    expenseItems: ItemStructure[];

    constructor(
        private adminService: AdminService,
        private datePipe: DatePipe
    ) {
        this.pointList = this.adminService.pointList;
        this.pointCurrent = this.pointList[0];

        // set calendar
        this.today = new Date();
        this.choiceDay = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    ngOnInit(): void {
        this.getItems();
    }

    getItems(): void {

        // get sold items
        this.adminService.soldItems(
            this.pointCurrent, this.choiceDay
        ).subscribe(
            (res: ItemStructure[]) => this.soldItems = res
        );

        // get expense items
        this.adminService.expenseItems(
            this.pointCurrent, this.choiceDay
        ).subscribe(
            (res: ItemStructure[]) => this.expenseItems = res
        );
    }
}
