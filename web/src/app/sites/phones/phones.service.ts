import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { PhoneAddModel } from './_models/phone-add.model';
import { PhoneModel } from './_models/phone.model';
import { Point } from './_models/point.model';

@Injectable({providedIn: 'root'})
export class PhonesService {
    pointName: string;
    apiUrl = environment.api;

    points: Point[] = [];

    phoneList: PhoneModel[] = [];
    private phoneListChanged = new BehaviorSubject<PhoneModel[]>(this.phoneList);
    public phoneList$ = this.phoneListChanged.asObservable();

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

        this.getPhones();
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

    insertNewPhone(phone: PhoneAddModel): void {
        let params = new HttpParams();
        params = params.set('point', this.pointName);

        phone.point.name = this.pointName;

        this.http.post(
            this.apiUrl + 'api/device',
            phone, { params }
        ).subscribe(
            (res: PhoneModel) => {
                this.phoneList.push(res);
                this.phoneListChanged.next(this.phoneList);
                this.router.navigate([`./telefony`], { relativeTo: this.route });
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }

    private getPhones(): void {
        let params = new HttpParams();
        params = params.set('point', this.pointName);

        this.http.get(
            this.apiUrl + 'api/device', { params }
        ).subscribe(
            (res: PhoneModel[]) => {
                this.phoneList = res;
                this.phoneListChanged.next(this.phoneList);
            },
            (err: HttpErrorResponse) =>
                this.toastr.error(err.error.message)
        );
    }
}
