// pre-defined
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// user-defined
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: any = '';

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
     this.baseUrl = this.configService.getApiUrl();
   }

  public sendPostRequest<t>(path: string, data: any = null, url: string = this.baseUrl): Observable<any> {
    const options = this.getPostOptions();
    return this.http.post<t>(url + path, data, options);
  }

  public sendGetRequest<t>(path: string, params: any = null, url: string = this.baseUrl): Observable<t> {
    const httpParams = new HttpParams({
      fromObject: params
    });

    return this.http.get<t>(url + path, { params: httpParams });
  }

  private getPostOptions(): any {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return {
      headers: httpHeaders
    };
  }
}
