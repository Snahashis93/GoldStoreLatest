import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  baseurl = environment.baseUrl;

  login(body) {
    return this.http.post(this.baseurl + "login/authenticate", body);
  }

  // getTodos() {
  //   return this.http.get("...").pipe(map((r) => [JSON.stringify(r)]));
  // }

  // delete(id) {
  //   return this.http.delete("...").pipe(map((r) => JSON.stringify(r)));
  // }
}
