import { UserInfoDetails } from './../../models/user-info';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogInRequest } from '../../models/log-in-request';

import { Routes } from '../../models/routes';
import { UserDetails } from '../../models/user-details';
import { UserInfo } from '../../models/user-info';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataGatewayService {

  constructor(
    public apiService: ApiService
  ) { }

  register(userDetails: UserDetails): Observable<UserInfo> {
    return this.apiService.sendPostRequest<UserInfo>(`${Routes.authRegister}`, userDetails).pipe(
      map((userInfo: UserInfo) => {
        return userInfo;
      })
    );
  }

  login(userDetails: UserDetails): Observable<UserInfoDetails> {
    return this.apiService.sendPostRequest<UserInfoDetails>(`${Routes.authLogin}`, userDetails).pipe(
      map((userInfoDetails: UserInfoDetails) => {
        return userInfoDetails;
      })
    );
  }

  // register(userDetails: UserDetails): Observable<UserInfo> {
  //   return this.apiService.sendPostRequest<UserInfo>(`${Routes.authRegister}`, userDetails).pipe(
  //     map((userInfo: UserInfo) => {
  //       return userInfo;
  //     })
  //   );
  // }
}
