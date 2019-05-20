import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { ValuesComponent } from "./values/values.component";
import { MsalGuard } from "@azure/msal-angular";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "userProfile",
    component: UserInfoComponent,
    canActivate: [MsalGuard]
  },
  { path: "webAPI", component: ValuesComponent, canActivate: [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
