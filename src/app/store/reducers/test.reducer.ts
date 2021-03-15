import { createReducer, on } from '@ngrx/store';
import { UpdateTest } from '../actions/test.actions';
import { initialTest } from '../states/test.state';

const reducer = createReducer(
	initialTest,
	on(UpdateTest, (state, { test }) => ({ ...state, test }))
);

export function testReducer(state, action) {
	return reducer(state, action);
}
