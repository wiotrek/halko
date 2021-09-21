import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ItemStructure } from '../../shared/models/item-structure.model';
import { environment } from 'environments/environment';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemOperationEnum } from './_enums/item-operation.enum';
import { ResponseDictionary } from '../../shared/dictionary/response.dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { Point } from '../../shared/models/point.model';
import {Employees} from '../../shared/models/employees.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
    apiUrl = environment.api;

    itemsListCache = new Map();
    itemsDeletedListCache = new Map();

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    getPointList(): Observable<string[]> {
        return this.http.get<Point[]>(
            this.apiUrl + 'api/point'
        ).pipe(map((res: Point[]) => res.map(x => x.name)));
    }

    // display items, and delete items
    // 1 step get two subscribers
    // 2 step connect two arrays
    // 3 step get only sold items
    // 4 step sort array for insert time
    getItems(pointName: string, date: string, operation: ItemOperationEnum): Observable<ItemStructure[]> {
        return combineLatest([
            this.getItemsList(pointName, date),
            this.getDeleteItems(pointName, date)
        ]).pipe(
            map(res => res[0].concat(res[1])),
            map((res: ItemStructure[]) => res.filter(x => x.type === operation)),
            map(res => res.sort((a: ItemStructure, b: ItemStructure) => b.insertedDateTime.localeCompare(a.insertedDateTime)))
        );
    }

    getParticipantsList(pointName: string): Observable<Employees[]> {
        const params = new HttpParams().set('pointName', pointName);
        return this.http.get<Employees[]>(
            this.apiUrl + 'api/participant', { params }
        );
    }

    addNewPoint(point: { login: string, password: string, pointName: string }): void {
        this.http.post(
            this.apiUrl + 'api/auth/register-point', point
        ).subscribe(
            () => {
                this.router.navigate([`./admin`], { relativeTo: this.route }).then(
                    () => {
                        this.toastr.success(ResponseDictionary.added);
                        this.getPointList();
                    }
                );
            },
            (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }

    private getDeleteItems(pointName: string, date: string): Observable<ItemStructure[]> {
        // check in cache
        const keyInMap = `${pointName} ${date}`;
        const response = this.itemsDeletedListCache.get(Object.values(keyInMap).join('-'));
        if (response) { return of (response); }

        // if dont have in cache then search in backend
        let params = new HttpParams();
        params = params.set('insertedDate', date);
        params = params.append('pointName', pointName);

        return this.http.get<ItemStructure[]>(
            this.apiUrl + 'api/transaction/deleted', { params }
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
}
