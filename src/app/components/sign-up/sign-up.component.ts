import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Languages } from 'src/app/app.configuration';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  faCheck = faCheck;
  plans = [
    {
      name: '',
      id: 0,
      pricePerMonth: 'Price Per Month',
      editableDocuments: 'Editable Documents',
      personalTemplate: 'Personal Template',
      collaboration: 'Collaboration',
      integrations: 'Integrations',
      security: 'Security',
      dataAndAutomation: 'Data And Automation',
      easyAdminControls: 'Easy Admin Controls',
      sso: 'SSO',
    },
    {
      name: 'Free',
      id: 1,
      pricePerMonth: 0,
      editableDocuments: 3,
      personalTemplate: 100,
      collaboration: 'Basic',
      integrations: 'Basic',
      security: true,
      dataAndAutomation: null,
      easyAdminControls: null,
      sso: null,
    },
    {
      name: 'Individual',
      id: 2,
      pricePerMonth: 0,
      editableDocuments: 3,
      personalTemplate: 100,
      collaboration: 'Basic',
      integrations: 'Basic',
      security: true,
      dataAndAutomation: null,
      easyAdminControls: null,
      sso: null,
    },
    {
      name: 'Team',
      id: 3,
      pricePerMonth: 0,
      editableDocuments: 3,
      personalTemplate: 100,
      collaboration: 'Basic',
      integrations: 'Basic',
      security: true,
      dataAndAutomation: null,
      easyAdminControls: null,
      sso: null,
    },
    {
      name: 'Enterprise',
      id: 4,
      pricePerMonth: 0,
      editableDocuments: 3,
      personalTemplate: 100,
      collaboration: 'Basic',
      integrations: 'Basic',
      security: true,
      dataAndAutomation: null,
      easyAdminControls: null,
      sso: null,
    },
  ];
  selectedPlan = this.plans[1];
  public Languages = Languages;
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  navigateToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
