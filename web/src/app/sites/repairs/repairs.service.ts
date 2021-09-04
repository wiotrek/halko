import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Employees } from '../../shared/models/employees.model';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RepairsApiGetModel } from './_models/repairs-api-get.model';
import { map } from 'rxjs/operators';
import { RepairsModel } from '../../shared/models/repairs.model';
import { RepairsMapper } from './repairs.mapper';
import { RepairsAddApiPostModel } from './_models/repairs-add-api-post.model';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseDictionary} from '../../shared/dictionary/response.dictionary';

@Injectable({providedIn: 'root'})
export class RepairsService {
    apiUrl = environment.api;

    constructor(
        private mainService: MainService,
        private http: HttpClient,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    getEmployees(): Observable<Employees[]> {
        return this.mainService.getEmployees();
    }

    getPointName(): string {
        return this.mainService.pointName;
    }

    getRepairsPhone(): Observable<RepairsModel[]> {
        return this.http.get<RepairsApiGetModel[]>(
            this.apiUrl + 'api/device/service/repairing'
        ).pipe(
            map(
        (res) =>
                    res.map(
                        repairPhoneRaw => RepairsMapper.repairRawModelToRepairModel(repairPhoneRaw)
                    )
            )
        );
    }

    insertRepairPhone(repairPhone: RepairsAddApiPostModel): void {
        this.http.post(
            this.apiUrl + 'api/device/service', repairPhone
        ).subscribe(
            () => {
                this.router.navigate([`./serwis`], { relativeTo: this.route });
                this.toastr.success(ResponseDictionary.added);
            },
            (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }

    insertRepairArchivePhone(): void {
        return;
    }
}
