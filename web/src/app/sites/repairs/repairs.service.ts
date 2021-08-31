import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import {Employees} from '../../shared/models/employees.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {RepairsModel} from '../../shared/models/repairs.model';

@Injectable({providedIn: 'root'})
export class RepairsService {

    private phonesRepairs: RepairsModel[] = [
        {
            phoneName: 'apple iphone 8',
            imei: '12313212322',
            owner: 'Michał Nowak',
            ownerPhoneNumber: '123123123',
            description: 'chyba zrobiony',
            pickUpDate: '10.10.2021',
            employer: 'Jurek',
            pointName: 'Karuzela Września',
            isReturn: true,
            returnDate: '17.10.2021',
            isSuccess: true
        }
    ];

    private pricesListChanged = new BehaviorSubject<RepairsModel[]>(this.phonesRepairs);
    public phonesRepairs$ = this.pricesListChanged.asObservable();

    constructor(
        private mainService: MainService
    ) {}

    getEmployees(): Observable<Employees[]> {
        return this.mainService.getEmployees();
    }
}
