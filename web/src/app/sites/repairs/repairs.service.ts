import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Employees } from '../../shared/models/employees.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RepairsAddApiPostModel } from './_models/repairs-add-api-post.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDictionary} from '../../shared/dictionary/response.dictionary';
import { SearcherModel } from '../../shared/models/searcher.model';
import { RepairsApiGetPagModel } from './_models/_models-pagination/repairs-api-get-pag.model';
import { ParamsCreatorHelper } from '../../shared/helpers/params-creator.helper';

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

    // repairs-list component
    getRepairsPhone(searcher: SearcherModel): Observable<RepairsApiGetPagModel> {
        // setting current point name
        searcher.pointName = this.getPointName();

        const params = ParamsCreatorHelper(searcher);
        return this.http.get<RepairsApiGetPagModel>(
            this.apiUrl + 'api/device/service/repairing', { params }
        );
    }

    // repairs-add component
    insertRepairPhone(repairPhone: RepairsAddApiPostModel): void {
        this.http.post(
            this.apiUrl + 'api/device/service', repairPhone
        ).subscribe(
            () => {
                this.router.navigate([`./serwis`], { relativeTo: this.route }).then(
                    () => this.toastr.success(ResponseDictionary.added)
                );
            },
            (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }

    // repairs-list component
    insertRepairArchivePhone(giveBackInfo: string, id: number): void {
        let params = new HttpParams();
        params = params.append('id', id.toString());

        const body = { giveBackInfo };

        this.http.put(
            this.apiUrl + 'api/device/service', body, { params }
        ).subscribe(
            () => {
                this.router.navigate([`./serwis/archiwum`], {relativeTo: this.route}).then(
                    () => this.toastr.success(ResponseDictionary.archive)
                );
            },
            (err: HttpErrorResponse) => this.toastr.error(err.error.message)
        );
    }

    // repairs-list archive
    getRepairArchivePhone(searcher: SearcherModel = null): Observable<RepairsApiGetPagModel> {

        // setting current point name
        searcher.pointName = this.getPointName();

        const params = ParamsCreatorHelper(searcher);

        return this.http.get<RepairsApiGetPagModel>(
            this.apiUrl + 'api/device/service/returned', { params }
        );
    }
}
