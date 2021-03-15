import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { UpdateTest } from '../store/actions/test.actions';
import { ConfigService } from './config.service';

@Injectable()
export class ApiService {
  configService;
  constructor(private httpClient: HttpClient, private store: Store, configService: ConfigService)  {}


  initApp(){
    let config = this.configService.getConfig();
    return this.httpClient.get(`${config.API_ACTION_URL}init/`, {}).toPromise().then(res=>{
      this.store.dispatch( UpdateTest({ test: res['test'] }) );
    });
  }
}
