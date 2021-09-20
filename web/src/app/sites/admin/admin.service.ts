import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/_models/user.model';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { ItemStructure } from '../../shared/models/item-structure.model';
import { environment } from 'environments/environment';
import {combineLatest, Observable, of} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ItemOperationEnum } from './_enums/item-operation.enum';
import {ResponseDictionary} from '../../shared/dictionary/response.dictionary';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminService {
    apiUrl = environment.api;

    pointList: string[];

    itemsListCache = new Map();
    itemsDeletedListCache = new Map();

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.getPointList();
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

    addNewPoint(point: { login: string, password: string, pointName: string }): void {
        this.http.post<ItemStructure[]>(
            this.apiUrl + 'api/auth/register-point', point
        ).subscribe(
            () => {
                this.router.navigate([`./ustawienia/punkty`], { relativeTo: this.route }).then(
                    () => this.toastr.success(ResponseDictionary.archive)
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

    private getPointList(): void {
        this.authService.user.pipe(take(1)).subscribe(
            (res: User) => this.pointList = res.pointList
        );
    }
}
