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
export class QuestionService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(AppSettings.API_URL + 'getCategories', httpOptions);
  }

  getQuestions(id = null, searchParam = null): Observable<any> {
    var url = AppSettings.API_URL + 'getQuestions';
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

  saveQuestion(formData): Observable<any> {
    return this.http.post(AppSettings.API_URL + 'saveQuestion', formData, httpOptions);
  }

  updateQuestion(formData, id): Observable<any> {
    return this.http.put(AppSettings.API_URL + `updateQuestion/${id}`, formData, httpOptions);
  }

  deleteQuestion(id): Observable<any> {
    return this.http.delete(AppSettings.API_URL + `deleteQuestion/${id}`, httpOptions);
  }

  getQuizQuestion(): Observable<any> {
    return this.http.get(AppSettings.API_URL + 'getQuizQuestion', httpOptions);
  }
}
