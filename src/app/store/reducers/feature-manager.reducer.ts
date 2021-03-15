import { createReducer, on } from '@ngrx/store';
import { UpdateFeatureManager } from '../actions/feature-manager.actions';
import { UpdateTest } from '../actions/test.actions';
import { initialTest } from '../states/test.state';

const reducer = createReducer(
	initialTest,
	on(UpdateFeatureManager, (state, { featureManager }) => ({ ...state, featureManager }))
);

export function featureManagerReducer(state, action) {
	return reducer(state, action);
}
