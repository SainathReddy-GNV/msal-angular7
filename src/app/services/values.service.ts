import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable()
export class ValuesService {
  private webAPIUrl = env.webAPIUrl;
  constructor(private http: HttpClient) {}

  getValues(): Observable<any> {
    return this.http
      .get<any>(this.webAPIUrl)
      .pipe(catchError(this.handleError<any>("getValues")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
