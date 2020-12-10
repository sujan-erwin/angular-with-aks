import { UtilityService } from './../../core/helpers/utility.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BroadcastService } from '@azure/msal-angular';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Languages } from 'src/app/app.configuration';
import { LocalStorageService } from 'src/app/core/services/storage/local-storage/local-storage.service';
import { Subscription } from 'rxjs';
import { Authenticators } from 'src/app/core/models/Authenticators.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  public user: User;
  public Languages = Languages;
  private loginFailureSubscription: Subscription;
  private loginSuccessSubscription: Subscription;
  private acquireTokenSuccessSubscription: Subscription;
  private acquireTokenFailureSubscription: Subscription;
  private userDataUpdatedSubscription: Subscription;
  redirectURL = environment.REDIRECT_URL;

  constructor(
    private authService: AuthService,
    private broadcastService: BroadcastService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.authService.init();
    const user = this.localStorageService.getItem('user');
    if (!UtilityService.isBlank(user)) {
      this.user = user;
    }
    this.userDataUpdatedSubscription = this.broadcastService.subscribe('app:userDataUpdated', () => {
      this.user = this.localStorageService.getItem('user');
      if (this.user) {
        this.user.token = this.localStorageService.getItem('token', false);
      }
    });

    this.loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      console.log('msal:loginFailure', payload);
      // this.authService.login();
    });
    this.loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      console.log('msal:loginSuccess', payload);
      this.authService.checkoutAccount();
    });
    this.acquireTokenSuccessSubscription = this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log('msal:acquireTokenSuccess', payload);
      this.localStorageService.setItem('token', this.localStorageService.getItem('msal.idtoken', false), false);
      this.localStorageService.setItem('msal.sid', payload.account.sid, false);
      this.localStorageService.updateAuthProvider(Authenticators.MICROSOFT);
    });
    this.acquireTokenFailureSubscription = this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log('msal:acquireTokenFailure', payload);
    });
  }
  public logout(): void {
    this.authService.continueWithOtherMSALAccount();
  }
  public zetaLogin(): void {
    this.authService.logout();
    this.router.navigateByUrl('/zeta-login');
  }
  public getProfilePic(): any {
    return this.authService.getUserPhotoUrl() || '../../../assets/user.png';
  }

  ngOnDestroy() {
    // this.broadcastService.getMSALSubject().next(1);
    if (this.loginFailureSubscription) {
      this.loginFailureSubscription.unsubscribe();
    }
    if (this.loginSuccessSubscription) {
      this.loginSuccessSubscription.unsubscribe();
    }
    if (this.acquireTokenSuccessSubscription) {
      this.acquireTokenSuccessSubscription.unsubscribe();
    }
    if (this.acquireTokenFailureSubscription) {
      this.acquireTokenFailureSubscription.unsubscribe();
    }
    if (this.userDataUpdatedSubscription) {
      this.userDataUpdatedSubscription.unsubscribe();
    }
  }
}
