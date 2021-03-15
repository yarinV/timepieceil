import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/index.states';
import { featureManagerReducer } from './feature-manager.reducer';
import { testReducer } from './test.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
	test: testReducer,
  featureManager: featureManagerReducer
};
