import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Angular 7 App</h1>
        <p class="lead">
          for accessing user profile and getting data from azure protected web
          api using msal-angular.
        </p>
      </div>
    </div>
  `,
  styles: [``]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
