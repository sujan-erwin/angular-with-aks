import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Constants } from '../../../app/core/models/constants';
import { LocalStorageService } from 'src/app/core/services/storage/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  authProvider: any;
  public user: User;
  redirectURL = environment.REDIRECT_URL;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.user = this.localStorageService.getItem('user');
    this.user.token = this.localStorageService.getItem('token', false);
    this.cookieService.set('user', JSON.stringify(this.user));
    this.cookieService.set('token', this.user.token);
    this.authService.redirect();
  }

}
