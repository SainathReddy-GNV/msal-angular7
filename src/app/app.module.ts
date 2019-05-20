import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MsalModule, MsalConfig, MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { UserInfoComponent } from "./user-info/user-info.component";
import { HomeComponent } from "./home/home.component";
import { ValuesComponent } from "./values/values.component";
import { environment as env } from "src/environments/environment";
import { UserService } from "./services/user.service";
import { ValuesService } from "./services/values.service";

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

const msalConfig: MsalConfig = {
  clientID: env.clientID,
  authority: env.authority,
  validateAuthority: true,
  redirectUri: "http://localhost:4200/",
  cacheLocation: "localStorage",
  postLogoutRedirectUri: "http://localhost:4200/",
  navigateToLoginRequestUrl: true,
  popUp: false,
  consentScopes: [...env.graphAPIScopes, ...env.webAPIScopes],
  unprotectedResources: ["https://www.microsoft.com/en-us/"],
  protectedResourceMap: [
    [env.webAPIUrl, env.webAPIScopes],
    [env.graphAPIUrl, env.graphAPIScopes]
  ],
  logger: loggerCallback,
  correlationId: "1234",
  level: LogLevel.Info,
  piiLoggingEnabled: true
};

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    HomeComponent,
    ValuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(msalConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    UserService,
    ValuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
