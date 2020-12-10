import { environment } from 'src/environments/environment';
// pre-defined modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// user-defined
import { Languages } from 'src/app/app.configuration';
import { IInputChanges } from 'src/app/core/models/input-changes';
import { UserDetails } from 'src/app/core/models/user-details';
import { RegisterService } from 'src/app/core/services/register/register.service';

@Component({
  selector: 'app-account-creation-page',
  templateUrl: './account-creation-page.component.html',
  styleUrls: ['./account-creation-page.component.scss']
})
export class AccountCreationPageComponent implements OnInit {

  public Languages = Languages;
  public signUpForm: FormGroup;
  public signUpDetails = SignUpDetails;
  public recaptchaKey = environment.RECAPTCHA_KEY;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      workEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess(e) {
    console.log('ReCaptcha', e);
  }


  updateSignUpDetails(event: IInputChanges, type: SignUpDetails) {
    if (type === SignUpDetails.FirstName) {
      this.signUpForm.controls.firstName.setValue(event.inputValue);
    } else if (type === SignUpDetails.LastName) {
      this.signUpForm.controls.lastName.setValue(event.inputValue);
    } else if (type === SignUpDetails.WorkEmail) {
      this.signUpForm.controls.workEmail.setValue(event.inputValue);
    } else if (type === SignUpDetails.Password) {
      this.signUpForm.controls.password.setValue(event.inputValue);
    }
  }

  createAccount() {
    const userDetails = new UserDetails();
    userDetails.firstName = this.signUpForm.controls.firstName.value;
    userDetails.lastName = this.signUpForm.controls.lastName.value;
    userDetails.email = this.signUpForm.controls.workEmail.value;
    userDetails.password = this.signUpForm.controls.password.value;

    this.registerService.register(userDetails).subscribe(userInfo => {
      this.toastrService.success('Account created Successfully.');
      this.router.navigate(['/zeta-login']);
    }, error => {
      if (error && error.error && error.error.message) {
        this.toastrService.error(error.error.message);
      }
    });

  }

  navigateToLoginPage() {
    this.router.navigate(['/sign-in']);
  }

}

export enum SignUpDetails {
  WorkEmail = 'work email',
  Password = 'password',
  Recaptcha = 'recaptcha',
  FirstName = 'first name',
  LastName = 'last name'
}
