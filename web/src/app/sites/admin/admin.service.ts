import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/_models/user.model';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ItemStructure} from '../main/_models/item-structure.model';
import {ErrorsDictionary} from '../../shared/dictionary/errors.dictionary';

@Injectable({ providedIn: 'root' })
export class AdminService {
    pointList: string[];

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private http: HttpClient,
    ) {
        this.getPointList();
    }

    getSoldsItem(): void {
        return;
    }

    private getPointList(): void {
        this.authService.user.subscribe(
            (user: User) => {
                this.pointList = user.pointList;
            },
            (err: HttpErrorResponse) => {
                this.toastr.error(err.error.message);
                this.pointList = ['Karuzela Września'];
            }
        );
    }

    // get sold items and expenses item
    private getAllItemsInitialFunc(): void {
        //
        // let params = new HttpParams();
        // params = params.set('date', this.todayDate);
        // params = params.append('pointName', this.pointName);
        //
        // this.http.get(
        //     this.apiUrl + 'api/transaction',
        //     { params }
        // ).subscribe(
        //     (res: ItemStructure[]) => {
        //         this.soldsItems = res.filter(x => x.type === 'Sprzedaż').reverse();
        //         this.soldsItemsChanged.next(this.soldsItems);
        //
        //         this.expensesItems = res.filter(x => x.type === 'Zakup').reverse();
        //         this.expensesItemsChanged.next(this.expensesItems);
        //     },
        //     () => this.toastr.error(ErrorsDictionary.server)
        // );
    }
}
