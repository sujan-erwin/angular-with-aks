import { BroadcastService } from '@azure/msal-angular';
import { LocalStorageService } from 'src/app/core/services/storage/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/app.configuration';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Constants } from '../../../core/models/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public Languages = Languages;
  user: any;
  constructor(
    private broadcastService: BroadcastService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.localStorageService.getItem('user');
    this.broadcastService.subscribe('app:userDataUpdated', () => {
      this.user = this.localStorageService.getItem(Constants.USER);
    });
  }

  navigateToHome() {
    this.localStorageService.clear();
    this.router.navigate(['']);
  }

}
