import { environment } from 'src/environments/environment';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'casewide-webmodeler-teams-ui';
  // isIframe = false;
  // loggedIn = false;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService
  ) {
    console.log(`Using Auth Server: ${environment.API}`);
    console.log(`Using Auth Server: ${environment.API}`);

  }

  ngOnInit(): void {

  }

}
