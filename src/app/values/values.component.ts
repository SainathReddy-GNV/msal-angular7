import { Component, OnInit, OnDestroy } from "@angular/core";
import { ValuesService } from "../services/values.service";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Subscription } from "rxjs";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-values",
  templateUrl: "./values.component.html",
  styleUrls: ["./values.component.css"],
  providers: [ValuesService]
})
export class ValuesComponent implements OnInit, OnDestroy {
  values: any;
  private subscription: Subscription;
  constructor(
    private broadcastService: BroadcastService,
    private valuesService: ValuesService,
    private authService: MsalService
  ) {}

  ngOnInit() {
    this.getValues();

    this.subscription = this.broadcastService.subscribe(
      "msal:acquireTokenSuccess",
      payload => console.log("acquire token success " + JSON.stringify(payload))
    );

    this.subscription = this.broadcastService.subscribe(
      "msal:acquireTokenFailure",
      payload => {
        if (
          payload.indexOf("consent_required") !== -1 ||
          payload.indexOf("interaction_required") !== -1
        ) {
          this.authService.acquireTokenPopup(env.webAPIScopes).then(
            token => {
              this.getValues();
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getValues() {
    this.valuesService.getValues().subscribe(
      data => {
        this.values = data;
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
