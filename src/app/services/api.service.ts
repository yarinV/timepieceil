import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import { UpdateTest } from "../store/actions/test.actions";

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  initApp() {
    // return this.httpClient
    //   .get(`${environment.apiBaseUrl}init/`, {})
    //   .toPromise()
    //   .then(res => {
    //     this.store.dispatch(UpdateTest({ test: res["test"] }));
    //   });
  }
}
