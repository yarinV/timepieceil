import { Injectable } from '@angular/core';
import { LDClient } from 'launchdarkly-js-client-sdk';
import * as LDClientModule from 'launchdarkly-js-client-sdk';
import { v4 as uuidv4 } from 'uuid';
import { IAppState } from '../store/states/index.states';
import { Store } from '@ngrx/store';
import { UpdateFeatureManager } from '../store/actions/feature-manager.actions';

@Injectable({
  providedIn: 'root'
})
export class FeatureManagerService {

  private userKey: string;
  private ldClient: LDClient;
  private ruleValues;

  constructor(private store: Store<IAppState>) {
    const clientKey = 'aa0ceb';
    this.userKey = uuidv4();
    this.ldClient = LDClientModule.initialize(clientKey, {
      key: this.userKey,
      anonymous: true,
    });

  }

  init(){
    this.getRules();
  }

  async getRules(){
    let data = {
      name:"test"
    }
    const flags = await this.ldClient.identify({
      key: this.userKey,
      custom: data,
    });
    this.store.dispatch(UpdateFeatureManager({ featureManager: this.ruleValues}));
  }
}
