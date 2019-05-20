import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "src/environments/environment";
import { User } from "msal";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class UserService {
  private graphAPIUrl = env.graphAPIUrl;
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return this.http
      .get<User>(this.graphAPIUrl)
      .pipe(catchError(this.handleError<User>("getUserProfile")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
