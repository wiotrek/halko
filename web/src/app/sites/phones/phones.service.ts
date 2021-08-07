import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { ErrorsDictionary } from 'src/app/shared/directory/errors.directory';
import { PhoneAddModel } from './_models/phone-add.model';
import { PhoneModel } from './_models/phone.model';
import { Point } from './_models/point.model';
import { SearcherModel } from './_models/searcher.model';

@Injectable({providedIn: 'root'})
export class PhonesService {
    pointName: string;
    apiUrl = environment.api;

    errorsDictionary = ErrorsDictionary;

    points: Point[] = [];

    phoneList: PhoneModel[] = [];

    archivPhoneList: PhoneModel[] = [];

    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.authService.user.subscribe(
            (user: User) => user
                ? this.pointName = user.pointName
                : this.pointName = 'Punkt'
        );
    }

    getListPoints(): Observable<Point[]> {

        if (this.points.length >  0) {
            return of(this.points);
        }

        return this.http.get<Point[]>(
            this.apiUrl + 'api/point'
        ).pipe(
            map(
                (res: Point[]) => {
                    this.points = res;
                    return res;
                }
            )
        );
    }

    getPhones(searcher: SearcherModel = null): Observable<PhoneModel[]> {

        let params = new HttpParams();

        if (searcher) {
            if (searcher.pointName.length) {
                params = params.append('point', searcher.pointName);
            }

            if (searcher.searchName.length) {
                params = params.append('search', searcher.searchName);
            }

            if (searcher.state.length) {
                params = params.append('deviceState', searcher.state);
            }
        }

        // if exist some parametr, then append these to params
        return this.http.get<PhoneModel[]>(
            this.apiUrl + 'api/device', { params }
        );
    }

    insertNewPhone(phone: PhoneAddModel): void {
        // let params = new HttpParams();
        // params = params.set('point', this.pointName);

        // phone.point.name = this.pointName;

        // this.http.post(
        //     this.apiUrl + 'api/device',
        //     phone, { params }
        // ).subscribe(
        //     () => {
        //         this.getPhones();
        //         this.router.navigate([`./telefony`], { relativeTo: this.route });
        //     },
        //     (err: HttpErrorResponse) =>
        //         this.toastr.error(err.error.message)
        // );
    }

    editPhone(phone: PhoneModel): void {
        // this.http.put(
        //     this.apiUrl + 'api/device/edit', phone
        // ).subscribe(
        //     () => {
        //         this.getPhones();
        //         this.toastr.success('Telefon został zedytowany');
        //         this.router.navigate([`./telefony`], { relativeTo: this.route });
        //     },
        //     (err: HttpErrorResponse) => {
        //         err
        //         ? this.toastr.error(err.error.message)
        //         : this.toastr.error(this.errorsDictionary.bad);
        //     }
        // );
    }

    // this fuction agree transfer phone to another point.
    // if point is same as loged point then return toastr error
    movePhone(phoneId: string, pointToTransfer: string): void {

        if (this.pointName === pointToTransfer) {
            this.toastr.error(this.errorsDictionary.operation);
            return;
        }

        let params = new HttpParams();
        params = params.set('id', phoneId);
        params = params.append('point', pointToTransfer);

        this.http.put(
            this.apiUrl + 'api/device/move', {}, { params }
        ).subscribe(
            () => {
                this.getPhones();
                this.toastr.success('Telefon został wysłany');
                this.router.navigate([`./telefony`], { relativeTo: this.route });
            },
            (err: HttpErrorResponse) => err
                ? this.toastr.error(err.error.message)
                : this.toastr.error(this.errorsDictionary.bad)
        );
    }

    sellPhone(phoneId: string, price: number): void {
        let params = new HttpParams();
        params = params.set('id', phoneId);
        params = params.append('price', price.toString());

        this.http.put(
            this.apiUrl + 'api/device/sell', {}, { params }
        ).subscribe(
            (res: HttpErrorResponse) => {
                this.getPhones();
                this.toastr.success(res.message);
                this.router.navigate([`./telefony`], { relativeTo: this.route });
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }

    getArchivList(): Observable<PhoneModel[]> {
        let params = new HttpParams();
        params = params.set('point', this.pointName);

        return this.http.get<PhoneModel[]>(
            this.apiUrl + 'api/device/sold', { params }
        ).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    this.toastr.error(err.error.message);
                    return throwError(err.error.message);
                }
            )
        );
    }
}
