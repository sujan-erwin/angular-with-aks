import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDetails } from 'src/app/components/log-in/log-in.component';
import { LogInRequest } from '../../models/log-in-request';
import { UserDetails } from '../../models/user-details';
import { UserInfo } from '../../models/user-info';
import { DataGatewayService } from '../data-gateway/data-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private dataGatewayService: DataGatewayService
  ) { }

  register(userDetails: UserDetails): Observable<UserInfo> {
    return this.dataGatewayService.register(userDetails).pipe(
      map((userInfo: UserInfo) => {
        return userInfo;
      })
    );
  }

  login(loginDetails: LogInRequest): Observable<any> {
    return this.dataGatewayService.login(loginDetails).pipe(
      map((logInResponse: any) => {
        return logInResponse;
      })
    );

  }
}
