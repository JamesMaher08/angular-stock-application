import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  URL = "http://127.0.0.1:8080/company";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCompanyProfile(company:string): Observable<any> {
    let QUERY_PARAM = `?company=${company}`;
    return this.http.get(this.URL+QUERY_PARAM);
  }
}
