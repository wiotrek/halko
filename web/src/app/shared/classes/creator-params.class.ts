import { HttpParams } from '@angular/common/http';
import { SearcherModel } from '../models/searcher.model';

export class CreatorParamsClass {
    public static createNewParam(searcher: SearcherModel): HttpParams {
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
        return params;
    }
}
