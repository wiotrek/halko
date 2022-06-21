import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamsCreatorHelper } from 'src/app/shared/helpers/params-creator.helper';
import { SearcherModel } from 'src/app/shared/models/searcher.model';
import { PricesApiGetPagModel } from './_models-pagination/prices-api-get-pag.model';
import { PricesModel } from 'src/app/shared/models/prices.model';
import { ResponseDictionary } from 'src/app/shared/dictionary/response.dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorsDictionary } from 'src/app/shared/dictionary/errors.dictionary';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({providedIn: 'root'})
export class PricesService {
  apiUrl = environment.api;

  isLoggedAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe(
      a => this.isLoggedAdmin = a.showRole === 'Admin'
    );
  }

  // repairs-list component
  getPrices(searcher: SearcherModel): Observable<PricesApiGetPagModel> {
    const params = ParamsCreatorHelper(searcher);
    return this.http.get<PricesApiGetPagModel>(
      this.apiUrl + 'api/device/price-list', {params}
    );
  }

  insertNewPrice(price: PricesModel): void {
    this.http.post(
      this.apiUrl + 'api/device/price-list', price
    ).subscribe(
      () => {
        this.router.navigate([ `/admin/cennik` ], {relativeTo: this.route}).then();
        this.toastr.success(ResponseDictionary.added);
      },
      (err: HttpErrorResponse) =>
        this.toastr.error(err.error.message)
    );
  }

  editPrice(price: PricesModel, id: number): void {
    const params = new HttpParams().append('id', id.toString());

    this.http.put(
      this.apiUrl + 'api/device/price-list', price, {params}
    ).subscribe(
      () => {
        this.router.navigate([ `./cennik` ], {relativeTo: this.route}).then();
        this.toastr.success(ResponseDictionary.change);
      },
      () => this.toastr.error(ErrorsDictionary.operation)
    );
  }
}
