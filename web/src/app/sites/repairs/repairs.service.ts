import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Employees } from '../../shared/models/employees.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RepairsRawModel } from './_models/repairs-raw.model';
import { map } from 'rxjs/operators';
import { RepairsModel } from '../../shared/models/repairs.model';
import { RepairsMapper } from './repairs.mapper';

@Injectable({providedIn: 'root'})
export class RepairsService {
    apiUrl = environment.api;

    constructor(
        private mainService: MainService,
        private http: HttpClient,
    ) {}

    getEmployees(): Observable<Employees[]> {
        return this.mainService.getEmployees();
    }

    getRepairsPhone(): Observable<RepairsModel[]> {
        return this.http.get<RepairsRawModel[]>(
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
}
