import { map } from 'rxjs/operators';
import { DataGatewayService } from './../data-gateway/data-gateway.service';
import { UserInfo, UserInfoDetails } from './../../models/user-info';
import { UserDetails } from 'src/app/core/models/user-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private dataGatewayService: DataGatewayService) { }

  login(userDetails: UserDetails): Observable<UserInfoDetails> {
    return this.dataGatewayService.login(userDetails).pipe(
      map((userInfo: UserInfoDetails) => {
        return userInfo;
      })
    );
  }
}
