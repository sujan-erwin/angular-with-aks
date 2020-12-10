import { SafePipe } from './../core/pipes/safePipe';
// pre-defined
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

// user defined
import { AccountCreationPageComponent } from './components/account-creation-page/account-creation-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';
import { RadioComponent } from './components/radio/radio.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AccountCreationPageComponent,
    NavigationComponent,
    TogglerComponent,
    TextareaComponent,
    SelectComponent,
    RadioComponent,
    DropdownComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  exports: [
    // components
    AccountCreationPageComponent,
    NavigationComponent,
    TogglerComponent,
    TextareaComponent,
    SelectComponent,
    RadioComponent,
    DropdownComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    SafePipe,

    // modules
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class SharedModule { }
