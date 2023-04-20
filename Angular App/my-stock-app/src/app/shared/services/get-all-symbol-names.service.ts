import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAllSymbolNamesService {

  URL = "https://api.iextrading.com/1.0/ref-data/symbols";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  getAllSymbolNames(): Observable<any> {
    return this.http.get(this.URL);
  }
}
