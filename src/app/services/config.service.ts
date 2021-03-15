import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  config: IDashboardConfig;

  constructor(private _http: HttpClient) {}

  public loadConfig() {
    return this._http
      .get('./environment.json')
      .toPromise()
      .then((config: IDashboardConfig) => {
        this.config = config;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  public getConfig():IDashboardConfig {
    return this.config;
  }
}

export interface IDashboardConfig{
  enableProductionMode:boolean;
  showLogs:boolean;
  production:boolean;
  apiBaseUrl:string;
  gooleApiKey:string;
  gtmId:string
}
