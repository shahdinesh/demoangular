import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './appSettings';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getQuestions(id = null, searchParam = null): Observable<any> {
    var url = AppSettings.API_URL + 'getCustomers';
    if (id !== null)
      url += '/' + id;
    else if (searchParam !== null)
      url += '?' + (new HttpParams()
          .set('category_id', searchParam.category_id)
          .set('title', searchParam.title)
          .set('page', searchParam.pageno)
        ).toString();
    return this.http.get(url, httpOptions);
  }

  saveCustomer(formData, headers = null): Observable<any> {
    if (headers != null)
      httpOptions.headers = headers;

    return this.http.post(AppSettings.API_URL + 'saveCustomer', formData, httpOptions);
  }

  updateCustomer(formData, id): Observable<any> {
    return this.http.put(AppSettings.API_URL + `updateCustomer/${id}`, formData, httpOptions);
  }

  deleteCustomer(id): Observable<any> {
    return this.http.delete(AppSettings.API_URL + `deleteCustomer/${id}`, httpOptions);
  }
}
