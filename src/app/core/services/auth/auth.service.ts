import { environment } from 'src/environments/environment';
import { UtilityService } from './../../helpers/utility.service';
import { UserDetails } from 'src/app/core/models/user-details';
import { RegisterService } from 'src/app/core/services/register/register.service';
import { Constants } from './../../models/constants';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
import { AuthenticationParameters, AuthResponse } from 'msal';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// user-defined
import { consents } from 'src/app/core/handlers/msal';
import { User } from '../../models/User';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Authenticators } from '../../models/Authenticators.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isIframe = false;
  loggedIn = false;
  image: any;
  constructor(
    private broadcastService: BroadcastService,
    private msalService: MsalService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private localStorageService: LocalStorageService,
    private registerService: RegisterService,
    private utility: UtilityService,
  ) {
    this.handleWindowCallback();
  }

  public isAuthenticated(): boolean {
    // this.loggedIn = !!this.msalService.getAccount();
    this.checkoutAccount();
    return this.loggedIn;
  }
  private getAuthProvider(): any {
    return this.localStorageService.getAuthProvider() || Authenticators.MICROSOFT;
  }

  public init(): void {
    const authProvider: Authenticators = this.getAuthProvider();

    if (authProvider === Authenticators.MICROSOFT) {
      this.initMSALAuth();
    } else if (authProvider === Authenticators.MASTER_APP) {
    } else {
      // this.initMSALAuth();
    }
  }
  public initMSALAuth(): void {
    this.isIframe = window !== window.parent && !window.opener;
    if (!!this.msalService.getAccount()) {
      this.aquireMSALTokenSilently();
    } else {
      this.login();
    }
    // this.handleWindowCallback();
  }

  public handleWindowCallback() {
    this.msalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        if (authError.errorCode === 'consent_required'
          || authError.errorCode === 'interaction_required'
          || authError.errorCode === 'login_required') {
          this.msalService.acquireTokenPopup({ scopes: consents }).then(res => {
            //  this.init();
          }).catch(error => {
            console.log(error);
          });
        }
        return;
      }
      // console.log('Redirect Success: ', response);
    });
  }

  getProfile(status: boolean): void {
    this.http.get(Constants.GRAPH_ENDPOINT)
      .toPromise().then((profile: any) => {
        this.storeUserProfile(profile, status);
      }).catch(error => {
        this.handleAuthError(error);
      });

    this.getUserPhoto().finally(() => {
      this.broadcastService.broadcast('app:userDataUpdated', '');
    });
  }

  getUserPhoto(): Promise<SafeUrl> {
    return this.http.get(Constants.GRAPH_ENDPOINT + 'photo/$value', { responseType: 'blob' })
      .toPromise().then((profile: any) => {
        const url = window.URL;
        const img = this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(profile));
        this.image = img;
        return img;
      }).catch(e => {
        this.image = null;
        return null;
      });
  }

  getUserPhotoUrl(): any {
    return this.image;
  }

  storeUserProfile(profile: any, updateDatabase: boolean): void {
    this.localStorageService.removeItem('user');
    const user = new User();
    user.fullName = profile.displayName;
    user.firstName = profile.givenName;
    user.lastName = profile.surname || profile.lastName;
    user.email = profile.mail;
    this.localStorageService.setItem('user', user);
    if (updateDatabase) {
      this.pushUserToDataBase();
    }
    this.broadcastService.broadcast('app:userDataUpdated', '');
  }

  storeUserProfilePic(profile: any): void {
    let user = new User();
    user = this.localStorageService.getItem('user');
    user.profile = profile;
    this.localStorageService.setItem('user', user);
    this.broadcastService.broadcast('app:userDataUpdated', '');
  }

  handleAuthError(error): void {

    console.log(error.errorCode);

    if (error.errorCode === 'consent_required'
      || error.errorCode === 'interaction_required'
      || error.errorCode === 'login_required'
      || error.errorCode === 'token_renewal_error'
    ) {
      this.msalService.acquireTokenPopup({ scopes: consents }).then(response => {
        // call API
        this.getProfile(true);
      }).catch(error1 => {
        console.log(error);
      });
    }
  }

  checkoutAccount(status = true): void {
    const authProvider = this.getAuthProvider();
    if (authProvider === Authenticators.MICROSOFT) {
      this.loggedIn = !!this.msalService.getAccount();
      if (this.loggedIn) {
        this.getProfile(status);
      }
    } else if (authProvider === Authenticators.MASTER_APP) {
      const user = this.localStorageService.getItem('user');
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    } else {
      this.loggedIn = false;
    }

  }

  login(): void {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    if (isIE) {
      this.msalService.loginRedirect({
        prompt: 'login'
      });
    } else {
      this.msalService.loginPopup({
        prompt: 'login'
      });
    }
  }

  logout(): void {

    const msalSessionId = 'msal.sid';
    const sid = this.localStorageService.getItem(msalSessionId, false);
    this.localStorageService.clear();
    if (sid) { this.localStorageService.setItem(msalSessionId, sid, false); }
  }

  continueWithOtherMSALAccount() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    if (isIE) {
      this.msalService.loginRedirect({
        prompt: 'select_account',
      });
    } else {
      this.msalService.loginPopup({
        prompt: 'select_account'
      });
    }
  }

  public aquireMSALTokenSilently() {
    const request: AuthenticationParameters = {
      scopes: consents,
      loginHint: this.localStorageService.getItem('msal.sid', false),
      extraQueryParameters: { domain_hint: 'organizations' }
    };
    // debugger
    if (request.loginHint != null) {
      from(this.msalService.acquireTokenSilent(request)).pipe(map((res: AuthResponse) => {
        this.localStorageService.setItem('token', res.accessToken, false);
        this.localStorageService.setItem('msal.sid', res.account.sid, false);
        this.localStorageService.updateAuthProvider(Authenticators.MICROSOFT);
        this.checkoutAccount(false);
      }), catchError(error => {
        // this.login();
        throw error;
      }));
    } else {
      this.login();
    }
  }
  pushUserToDataBase() {
    const user = this.localStorageService.getItem('user');
    const userDetails = new UserDetails();
    Object.assign(userDetails, user);
    userDetails.password = this.utility.getRandomString(20);
    this.registerService.register(userDetails).subscribe(data => {
      console.log(data);
    }, error1 => {
      console.log(error1);
    });
  }

  redirect() {
    window.location.href = environment.REDIRECT_URL;
  }
  getConsents(): string[] {
    throw consents;
  }
}
