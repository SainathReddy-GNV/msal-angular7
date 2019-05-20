import { Component, OnInit, OnDestroy } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Subscription } from "rxjs";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Msal Angular 7";
  public isIframe: boolean;
  loggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService
  ) {
    this.isIframe = window !== window.parent && !window.opener;
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  login() {
    this.authService.loginPopup([...env.graphAPIScopes, ...env.webAPIScopes]);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe(
      "msal:loginFailure",
      payload => {
        console.log("login failed" + JSON.stringify(payload));
        this.loggedIn = false;
      }
    );

    this.subscription = this.broadcastService.subscribe(
      "msal:loginSuccess",
      payload => {
        console.log("login failed" + JSON.stringify(payload));
        this.loggedIn = true;
      }
    );
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
