import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ParamsCreatorHelper } from 'src/app/shared/helpers/params-creator.helper';
import { SearcherModel } from 'src/app/shared/models/searcher.model';
import { PricesApiGetPagModel } from './_models-pagination/prices-api-get-pag.model';

@Injectable({providedIn: 'root'})
export class PricesService {
    apiUrl = environment.api;

    constructor(private http: HttpClient) {}

    // repairs-list component
    getPrices(searcher: SearcherModel): Observable<PricesApiGetPagModel> {
        const params = ParamsCreatorHelper(searcher);
        return this.http.get<PricesApiGetPagModel>(
            this.apiUrl + 'api/device/price-list', { params }
        );
    }
}
