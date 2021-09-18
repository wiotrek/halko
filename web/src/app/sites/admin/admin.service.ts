import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/_models/user.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ItemStructure } from '../main/_models/item-structure.model';
import { ErrorsDictionary } from '../../shared/dictionary/errors.dictionary';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
    apiUrl = environment.api;

    pointList: string[];

    itemsListCache = new Map();

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private http: HttpClient,
    ) {
        this.getPointList();
    }

    soldItems(pointName: string, date: string): Observable<ItemStructure[]> {
        return this.getItemsList(pointName, date).pipe(
            map(
                (res: ItemStructure[]) => res.filter(x => x.type === 'Sprzedaż').reverse()
            )
        );
    }

    expenseItems(pointName: string, date: string): Observable<ItemStructure[]> {
        return this.getItemsList(pointName, date).pipe(
            map(
                (res: ItemStructure[]) => res.filter(x => x.type === 'Zakup').reverse()
            )
        );
    }

    private getItemsList(pointName: string, date: string): Observable<ItemStructure[]> {
        // check in cache
        const keyInMap = `${pointName} ${date}`;
        const response = this.itemsListCache.get(Object.values(keyInMap).join('-'));
        if (response) { return of (response); }

        // if dont have in cache then search in backend
        let params = new HttpParams();
        params = params.set('date', date);
        params = params.append('pointName', pointName);

        return this.http.get<ItemStructure[]>(
            this.apiUrl + 'api/transaction', { params }
        );
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
}
