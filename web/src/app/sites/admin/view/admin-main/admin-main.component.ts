import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { ItemStructure } from 'src/app/sites/main/_models/item-structure.model';
import { AdminMainFields } from './admin-main-fields.array';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-admin',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss'],
    providers: [DatePipe]
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
    soldItems: ItemStructure[] = [];
    expenseItems: ItemStructure[] = [];

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
        this.adminService.soldItems(this.pointCurrent, this.choiceDay).pipe(
            map(res => res.map(item => {
                item.insertedDateTime = this.datePipe.transform(item.insertedDateTime, 'yyyy-MM-dd HH:mm');
                item.editedDateTime = this.datePipe.transform(item.editedDateTime, 'yyyy-MM-dd HH:mm');
                return item;
            }))
        ).subscribe(res => this.soldItems = res);

        // get expense items
        this.adminService.expenseItems(this.pointCurrent, this.choiceDay).pipe(
            map(res => res.map(item => {
                item.insertedDateTime = this.datePipe.transform(item.insertedDateTime, 'yyyy-MM-dd HH:mm');
                item.editedDateTime = this.datePipe.transform(item.editedDateTime, 'yyyy-MM-dd HH:mm');
                return item;
            }))
        ).subscribe(res => this.expenseItems = res);
    }

    sumPrice = (arr: ItemStructure[]): number =>
        arr.reduce((acc: number, curr: ItemStructure) => acc + curr.price, 0)
}
