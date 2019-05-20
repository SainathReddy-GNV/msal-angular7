import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { UserService } from "../services/user.service";
import { environment as env } from "src/environments/environment";
import { User } from "msal";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"],
  providers: [UserService]
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  userInfo: User;

  constructor(
    private brodcastService: BroadcastService,
    private authService: MsalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserProfile();

    this.subscription = this.brodcastService.subscribe(
      "msal:acquireTokenSuccess",
      payload => console.log("acquire token success " + JSON.stringify(payload))
    );
    this.subscription = this.brodcastService.subscribe(
      "msal:acquireTokenFailure",
      payload => {
        if (
          payload.indexOf("consent_required") !== -1 ||
          payload.indexOf("interaction_required") !== -1
        ) {
          this.authService.acquireTokenPopup(env.graphAPIScopes).then(
            token => {
              this.getUserProfile();
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: User) => {
        this.userInfo = data;
        // console.log(data);
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.brodcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
