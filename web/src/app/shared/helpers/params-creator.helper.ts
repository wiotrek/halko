import { SearcherModel } from '../models/searcher.model';
import { HttpParams } from '@angular/common/http';

export function ParamsCreatorHelper(searcher: SearcherModel): HttpParams {
  if (!searcher) {
    return;
  }

  let params = new HttpParams();

  if (searcher.searchName.length) {
    params = params.append('search', searcher.searchName);
  }

  if (searcher.pointName.length) {
    params = params.append('point', searcher.pointName);
  }

  if (searcher.state.length) {
    params = params.append('deviceState', searcher.state);
  }

  if (searcher.pageIndex) {
    params = params.append('pageIndex', searcher.pageIndex.toString());
  }

  if (searcher.pageSize) {
    params = params.append('pageSize', searcher.pageSize.toString());
  }
  return params;
}
