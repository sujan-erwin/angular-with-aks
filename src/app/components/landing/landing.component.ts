import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/app.configuration';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public Languages = Languages;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  /**
   * login
   */
  public login(): void {
    // this.auth.init();
  }

}
