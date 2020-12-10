import { BroadcastService } from '@azure/msal-angular';
import { LocalStorageService } from 'src/app/core/services/storage/local-storage/local-storage.service';
import { User } from './../../core/models/User';
import { Constants } from './../../core/models/constants';
import { Router } from '@angular/router';
import { LoginService } from './../../core/services/login/login.service';
import { UserDetails } from 'src/app/core/models/user-details';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Languages } from 'src/app/app.configuration';
import { IInputChanges } from 'src/app/core/models/input-changes';
import { Authenticators } from 'src/app/core/models/Authenticators.enum';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public Languages = Languages;
  public logInForm: FormGroup;
  public LoginDetails = LoginDetails;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private broadcastService: BroadcastService,
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  updateSignUpDetails(event: IInputChanges, type: LoginDetails) {
    if (type === LoginDetails.Email) {
      this.logInForm.controls.email.setValue(event.inputValue);
    } else if (type === LoginDetails.Password) {
      this.logInForm.controls.password.setValue(event.inputValue);
    }
  }

  zetaLogin() {
    const userDetails = new UserDetails();
    userDetails.email = this.logInForm.controls.email.value;
    userDetails.password = this.logInForm.controls.password.value;

    this.loginService.login(userDetails).subscribe(userInfo => {
      const user = new User();
      user.fullName = userInfo.firstName + ' ' + userInfo.lastName;
      user.firstName = userInfo.firstName;
      user.lastName = userInfo.lastName;
      user.email = userInfo.email;
      user.token = userInfo.token;
      this.localStorageService.setItem('token', userInfo.token, false);
      this.localStorageService.setItem('user', user);
      this.broadcastService.broadcast('app:userDataUpdated', user);
      this.toastrService.success('Login Success');
      this.localStorageService.updateAuthProvider(Authenticators.MASTER_APP);
      this.router.navigate(['/home']);

    }, error => {
      if (error && error.error && error.error.message) {
        this.toastrService.error(error.error.message);
      }
    });
  }

}

export enum LoginDetails {
  Email = 'email',
  Password = 'password'
}
