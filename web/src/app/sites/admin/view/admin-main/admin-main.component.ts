import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-admin',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
    // members for calendar
    today: Date;
    choiceDay: Date;

    pointCurrent = 'Karuzela Września';

    // main members to config
    pointList: string[];
    soldItems: any[];
    expenseItems: any[];

    constructor(
        private adminService: AdminService,
        private datePipe: DatePipe
    ) {
        this.pointList = this.adminService.pointList;
        this.pointCurrent = this.pointList[0];

        // set calendar
        this.today = new Date();
        this.choiceDay = new Date();
    }

    setCurrentlyPoint(): void {
        console.log(this.pointCurrent);
    }
}
