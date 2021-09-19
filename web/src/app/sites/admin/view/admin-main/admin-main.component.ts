import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';
import {DatePipe} from '@angular/common';
import {ItemStructure} from 'src/app/shared/models/item-structure.model';
import {AdminMainFields} from './_arrays/admin-main-fields.array';
import {map} from 'rxjs/operators';
import {ItemOperationEnum} from '../../_enums/item-operation.enum';
import {Observable} from 'rxjs';

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
        this.getItemsFromService(ItemOperationEnum.sold).subscribe(
            res => this.soldItems = res
        );

        this.getItemsFromService(ItemOperationEnum.expense).subscribe(
            res => this.expenseItems = res
        );
    }

    private getItemsFromService(operation: ItemOperationEnum): Observable<ItemStructure[]> {
        return this.adminService.getItems(this.pointCurrent, this.choiceDay, operation)
            .pipe(
                map(res => res.map(item => {
                    item.insertedDateTime = this.datePipe.transform(item.insertedDateTime, 'yyyy-MM-dd HH:mm');
                    item.editedDateTime = this.datePipe.transform(item.editedDateTime, 'yyyy-MM-dd HH:mm');
                    item.deletedDateTime = this.datePipe.transform(item.deletedDateTime, 'yyyy-MM-dd HH:mm');
                    return item;
                }))
            );
    }

    // count sum price without deleted items
    sumPrice = (arr: ItemStructure[]): number =>
        arr.filter(x => x.deletedDateTime ? false : x)
            .reduce((acc: number, curr: ItemStructure) => acc + curr.price, 0)

}
