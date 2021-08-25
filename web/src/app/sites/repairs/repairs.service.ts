import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import {Employees} from '../../shared/models/employees.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RepairsService {

    constructor(
        private mainService: MainService
    ) {}

    getEmployees(): Observable<Employees[]> {
        return this.mainService.getEmployees();
    }
}
